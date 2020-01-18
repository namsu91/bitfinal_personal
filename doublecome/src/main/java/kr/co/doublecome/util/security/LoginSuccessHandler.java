package kr.co.doublecome.util.security;

import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


public class LoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request, HttpServletResponse response, Authentication authentication) 
					throws IOException, ServletException {
		Collection<? extends GrantedAuthority> list = authentication.getAuthorities();
		for (GrantedAuthority auth : list) {
			if(auth.getAuthority() == "ROLE_A") {
				response.sendRedirect(request.getContextPath() + "/admin/basic.do");
				return;
			};
		}
		response.sendRedirect(request.getContextPath() + "/main.do");
	}

}
