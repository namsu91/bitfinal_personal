package kr.co.doublecome.util.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import kr.co.doublecome.repository.mapper.UserMapper;
import kr.co.doublecome.repository.vo.SecurityUser;
import kr.co.doublecome.repository.vo.User;

public class MyBatisUserDetailsService implements UserDetailsService {

	@Autowired
	private UserMapper mapper;

//	@Autowired
//	private PasswordEncoder encoder;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User vo = mapper.selectUserInfoByName(userName);

		List<SimpleGrantedAuthority> list = new ArrayList<>();
		
		list.add(new SimpleGrantedAuthority("ROLE_U"));
		if(vo.getUserType() == 2) {
			list.add(new SimpleGrantedAuthority("ROLE_A"));
		}
		
		return vo == null ? null : new SecurityUser(vo, list);
	} 
}
