package kr.co.doublecome.liveauction.handler;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;
@Component("LiveAuctionChatHandler")
public class LiveAuctionChatHandler extends TextWebSocketHandler{
	
	@Autowired
	Gson gson;
	
	//전체 사용자 정보 관리하기
	private Map<Integer, Map<String, WebSocketSession>> channels = new HashMap<>();
	
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
		userData.put("type","entrance");
		userData.put("count", users.size());
		broadcast(userData,users);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		Map<String, Object> userData = session.getAttributes();
		int auctionNo = (int)userData.get("auctionNo");
		
		Map<String, WebSocketSession> users = channels.get(auctionNo);
		userData.put("type","message");
		userData.put("msg"," : " +  message.getPayload());
		broadcast(userData,users);
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		Map<String, Object> userData = session.getAttributes();
		int auctionNo = (int)userData.get("auctionNo");
		
		Map<String, WebSocketSession> users = channels.get(auctionNo);
		users.remove(session.getId());
		
		//시청자가 없을 경우 방 삭제
		if(users.isEmpty()) {
			channels.remove(auctionNo);
			return;
		}
		
		userData.put("type","entrance");
		userData.put("count",users.size());
		broadcast(userData,users);
	}
	
	public void broadcast(Map<String, Object> userData, Map<String, WebSocketSession> users) throws Exception{
		String data = gson.toJson(userData);
		for(String key : users.keySet()) {
			WebSocketSession user = users.get(key);
			user.sendMessage(new TextMessage(data));
		}
	}

}
