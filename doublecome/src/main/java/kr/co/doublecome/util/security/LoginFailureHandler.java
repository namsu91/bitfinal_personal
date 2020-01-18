package kr.co.doublecome.util.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginFailureHandler implements AuthenticationFailureHandler{

	@Override
	public void onAuthenticationFailure(HttpServletRequest req, HttpServletResponse res,
			AuthenticationException exception) throws IOException, ServletException {
		 	req.setAttribute("fialureMSG", "아이디 혹은 비밀번호가 다릅니다");
	        req.getRequestDispatcher("user/loginfail.do").forward(req, res);

	}

	
}
