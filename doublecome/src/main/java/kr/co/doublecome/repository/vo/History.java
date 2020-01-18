package kr.co.doublecome.repository.vo;

import lombok.Data;

@Data
public class History {
	
	private String userEmail;				// 로그인된 사용자 이메일
	private String userScore;				// 사용자 평점
	private String userNickname;			// 사용자 닉네임
	private int userReviewCnt;				// 받은 후기 갯수
	private int fileGroupCode;				// 프로필사진 파일 그룹 코드
	private int sellCnt;					// 판매 횟수
	private int buyCnt;						// 구매 횟수
	
}
