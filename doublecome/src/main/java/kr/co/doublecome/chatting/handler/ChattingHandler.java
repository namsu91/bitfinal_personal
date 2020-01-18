package kr.co.doublecome.chatting.handler;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.google.gson.Gson;

import kr.co.doublecome.chatting.service.ChattingService;
import kr.co.doublecome.repository.vo.Chat;
import kr.co.doublecome.repository.vo.ChatSearch;
import kr.co.doublecome.repository.vo.ConverSation;


@Component("messenger")
public class ChattingHandler extends TextWebSocketHandler {
	@Autowired
	ChattingService service;
	@Autowired
	Gson gson;
	private Map<Integer, Map<String, WebSocketSession>> chatMap = new HashMap<>();
	
	@SuppressWarnings("null")
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		Map<String, Object> userData = session.getAttributes();
		String email = (String) userData.get("userId");
		ChatSearch ctList = new ChatSearch();
		ctList.setEmail(email);
		List<Chat> chatList = service.chatList(ctList);
		for(Chat chat : chatList) {
			Map<String, WebSocketSession> userSession = chatMap.get(chat.getChatNo());
			if(userSession == null) {
				userSession = new HashMap<String, WebSocketSession>(); 
				chatMap.put(chat.getChatNo(), userSession);
			}
			userSession.put(session.getId(), session);				
			chatMap.put(chat.getChatNo(), userSession);
		}
	}
	public void webSend(ConverSation covst, WebSocketSession session) {
		String data = gson.toJson(covst);
		Map<String, WebSocketSession> userSession = chatMap.get(covst.getChatNo());
		for(String key : userSession.keySet()) {
			WebSocketSession user = userSession.get(key);
			if(!user.getId().equals(session.getId())) {
				try {
					user.sendMessage(new TextMessage(data));				
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	@SuppressWarnings("unlikely-arg-type")
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		ConverSation covst = gson.fromJson(message.getPayload(), ConverSation.class);
		System.out.println("데이터 타입" + covst.getDataType());
		if(covst.getDataType() == 1) {
			webSend(covst, session);
		} else if(covst.getDataType() == 2){
			webSend(covst, session);
		} else if(covst.getDataType() == 3){
			webSend(covst, session);
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println(session.getId() + " 연결 종료되었음..");
		Map<String, Object> userData = session.getAttributes();
		String email = (String) userData.get("userId");
		ChatSearch ctList = new ChatSearch();
		ctList.setEmail(email);
		List<Chat> chatList = service.chatList(ctList);
		for(Chat chat : chatList) {
			chatMap.get(chat.getChatNo()).remove(session.getId());
		}
	}
	
}
