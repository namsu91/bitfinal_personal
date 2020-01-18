package kr.co.doublecome.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.UserMapper;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.IsYours;
import kr.co.doublecome.repository.vo.User;

@Service

public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserMapper mapper;
	//회원 탈퇴
	@Override
	public void deleteUser(String email) {
		mapper.deleteUser(email);
		
	}
	// 회원탈퇴 - 진행중 경매 유무 확인
	@Override
	public List<Auction> checkAuction(String email) {
		return mapper.checkAuction(email);
	}
	// 회원탈퇴 - 진행중 거래 유무 확인
	@Override
	public List<Auction> checkDeal(String email) {
		return mapper.checkDeal(email);
	}
	//회원 가입
	@Override
	public void insertUser(User user) {
	mapper.insertUser(user);	
	}

	//鍮꾨�踰덊샇 李얘린 - 媛쒖씤�젙蹂� �닔�젙�럹�씠吏�
	@Override
	public User selectUserInfoByName(String userName) {
		return mapper.selectUserInfoByName(userName);
	}
	
	//마이페이지
	@Override
	public User selectUserInfo(User user) {
		return mapper.selectUserInfo(user);
	}
	//마이페이지 - 정보 수정
	@Override
	public void updateUser(User user) {
		mapper.updateUser(user);
	}

	//마이페이지 - 입찰 리스트
	@Override
	public List<Auction> bidList(String email) {	
		return mapper.bidList(email);
	}
	//마이페이지 - 입찰 가격 체크
	@Override
	public IsYours isYours(IsYours iy) {
		return mapper.isYours(iy);
	}

	
	//이메일 찾기
	@Override
	public String findEmail(String user) {
		return mapper.findEmail(user);
	}
	//비밀번호 찾기
	@Override
	public String findPass(String email) {
		return mapper.findPass(email);
	}

	//유일성 검사 - 이메일
	@Override
	public int checkEmail(String userEmail) {
		return mapper.checkEmail(userEmail);
	}

	//유일성 검사 - 번호
	@Override
	public int checkPhnum(String userPhnum) {
		return mapper.checkPhnum(userPhnum);
	}

	//유일성 검사 - 별명
	@Override
	public int checkNickname(String userNickname) {
		return mapper.checkNickname(userNickname);
	}
	
	//프로필 이미지
	@Override
	public void updateUserDefaultProfile(String email) {
		mapper.updateUserDefaultProfile(email);
	}
	




	
	
	
	
}
