package kr.co.doublecome.repository.vo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import kr.co.doublecome.repository.vo.User;

import lombok.Getter;

@Getter
public class SecurityUser extends org.springframework.security.core.userdetails.User {
	private static final long serialVersionUID = 1L;
	private User user;
	public SecurityUser(User vo, Collection<? extends GrantedAuthority> list) {
		super(vo.getUserEmail(), vo.getUserPass(), list);
		this.user = vo;
	}
}
