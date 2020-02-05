package kr.co.doublecome.liveauction.handler;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import kr.co.doublecome.repository.mapper.AuctionDetailMapper;
import kr.co.doublecome.repository.vo.Auction;
@Component("LiveAuctionBidHandler")
public class LiveAuctionBidHandler extends TextWebSocketHandler{
	
	@Autowired
	Gson gson;
	
	
	@Autowired
	AuctionDetailMapper mapper;

	//전체 사용자 정보 관리하기
	private Map<Integer, Map<String, WebSocketSession>> channels = new HashMap<>();
	private Type type = new TypeToken<Map<String, String>>(){}.getType();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Map<String, Object> userData = session.getAttributes();
		
		int auctionNo = (int)userData.get("auctionNo");
		
		Map<String, WebSocketSession> users = channels.get(auctionNo);
		if(users == null) {
			users = new HashMap<String,WebSocketSession>();
			channels.put(auctionNo, users);
		}
		users.put(session.getId(), session);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		//접속자 정보 확인
		Map<String, Object> userData = session.getAttributes();
		
		int auctionNo = (int)userData.get("auctionNo");
		String userId = (String)userData.get("userId");
		
		//접속 채널 확인
		Map<String, WebSocketSession> users = channels.get(auctionNo);
		
		//비회원일 경우 거절
		if(userId == "비회원") {
			Map<String,Object> soloData = new HashMap<String, Object>();
			soloData.put("access","denied");
			soloData.put("code","1");
			sendDataSolo(soloData,session);
			return;
		}

		//클라이언트에서 받은 데이터 추출
		Map<String, String> bidData = gson.fromJson(message.getPayload(),type);
		
		//구매와 입찰에 관한 데이터 준비
		int price = Integer.parseInt(bidData.get("price"));
		Auction auction = new Auction();
		auction.setAuctionNo(auctionNo);
		auction.setBidPrice(price);
		
		
		//입찰일 경우 처리
		if(bidData.get("bidType").equals("bidding")) {
			int maxPrice = mapper.selectMaxBid(auctionNo);
			//개인 데이터맵
			Map<String,Object> soloData = new HashMap<String, Object>();
			if(price > maxPrice) {				
				auction.setUserEmail(userId);
				mapper.auctionBid(auction);
				userData.put("maxPrice", price);
				userData.put("bidType","bidding");
				soloData.put("access","admited");
				soloData.put("bidType","bidding");
				sendDataSolo(soloData,session);
				sendData(userData,users);
			} else {
				userData.put("maxPrice", price);
				soloData.put("access","denied");
				soloData.put("code","2");
				sendDataSolo(soloData,session);
			}
			
		} 
		//즉시구매일 경우 처리
		else if (bidData.get("bidType").equals("purchase")){
			Map<String,Object> soloData = new HashMap<String, Object>();
			System.out.println(price);
			System.out.println();
			if(price == Integer.parseInt(mapper.selectAuctionForLive(auctionNo).getAuctionBuyNow())) {				
				auction.setUserEmailBuyer(userId);
				mapper.callSPAddDeal(auction);
				userData.put("maxPrice", price);
				userData.put("bidType","purchase");
				soloData.put("access","admited");
				soloData.put("bidType","purchase");
				sendDataSolo(soloData,session);
				sendData(userData,users);
			} else {
				soloData.put("access","denied");
				soloData.put("code","3");
				sendDataSolo(soloData,session);
			}	
		}
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Map<String, Object> userData = session.getAttributes();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println();
		int auctionNo = (int)userData.get("auctionNo");
		
		Map<String, WebSocketSession> users = channels.get(auctionNo);
		users.remove(session.getId());
		
		//시청자가 없을 경우 방 삭제
		if(users.isEmpty()) {
			channels.remove(auctionNo);
			return;
		}
	}
	
	public void sendData(Map<String, Object> userData, Map<String, WebSocketSession> users) throws Exception{
		String data = gson.toJson(userData);
		for(String key : users.keySet()) {
			WebSocketSession user = users.get(key);
			user.sendMessage(new TextMessage(data));
		}
	}
	
	public void sendDataSolo(Map<String, Object> soloData, WebSocketSession session) throws Exception{
		soloData.put("msgType", "solo");
		String data = gson.toJson(soloData);
		session.sendMessage(new TextMessage(data));
	}
	
	
}
