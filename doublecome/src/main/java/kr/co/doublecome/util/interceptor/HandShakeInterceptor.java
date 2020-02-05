package kr.co.doublecome.util.interceptor;

import java.util.Map;
import java.util.Random;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

public class HandShakeInterceptor extends HttpSessionHandshakeInterceptor{
	
	@Override
	public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Map<String, Object> attributes) throws Exception {
		
		 ServletServerHttpRequest ssreq = (ServletServerHttpRequest) request;
	     HttpServletRequest req =  ssreq.getServletRequest();
		 
		 Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		 
		 //아이디 입력
		 if(principal != "anonymousUser") {
			 UserDetails userDetails = (UserDetails) principal;
			 attributes.put("userId", userDetails.getUsername());
		 } else {
			 attributes.put("userId","비회원");
		 }
		 
		 //색상 랜덤 선택
		 Random r = new Random();
		 String color = "#";
		 for(int i = 0; i < 3; i++) {
			 int num = r.nextInt(130) + 124;
			 color += String.format("%02X", num) + "";
		 }
		 attributes.put("color",color);
		 
		 //경매번호 추출
		 if(req.getParameter("auctionNo") != null) {			 
			 Integer auctionNo = Integer.parseInt(req.getParameter("auctionNo"));
			 attributes.put("auctionNo",auctionNo);
		 }
		 
		return super.beforeHandshake(request, response, wsHandler, attributes);
	}

	@Override
	public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
			Exception ex) {
		super.afterHandshake(request, response, wsHandler, ex);
	}
}
