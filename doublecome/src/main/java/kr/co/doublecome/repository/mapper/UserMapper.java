package kr.co.doublecome.repository.mapper;

import java.util.List;

import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.IsYours;
import kr.co.doublecome.repository.vo.User;

public interface UserMapper {
	public User selectUserInfo(User user);
	public User selectUserInfoByName(String userName);
	
	public void insertUser(User user);
	public void deleteUser(String email);
	public List<Auction> checkAuction(String email);
	public List<Auction> checkDeal(String email);
	
	public void updateUser(User user);
	public void updateUserDefaultProfile(String email);
	
	
	public String findEmail(String user);
	public String findPass(String email);
	
	public List<Auction> bidList(String email);
	public IsYours isYours(IsYours iy);
	
	public int checkEmail(String userEmail);
	public int checkPhnum(String userPhnum);
	public int checkNickname(String userNickname);
	
}
