package kr.co.doublecome.repository.vo;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data	
public class User implements Serializable{
	private Boolean isSNS = false;			// API 로그인 여부
	private String userEmail;				// 사용자 이메일	
	private String userPass;				// 사용자 비밀번호
	private String userScore;				// 사용자 평점
	private String userPhnum;				// 사용자 휴대전화 번호
	private String userNickname;			// 사용자 닉네임
	private int userType;					// 사용자 타입 - 받은 후기글 갯수에 따라 변화
	private int userReviewCnt;				// 받은 후기글 갯수
	private int userReportedCnt;			// 받은 신고글 갯수
	private int userDealCnt;				// 사거나 판 거래 개수
	private int fileGroupCode;				// 프로필 사진 파일 그룹 코드
	private Date userRegDate;      			// 등록 날짜	
	private int userCnt;                    // 유저수
	
	
	private int fileNo;
	private String fileOriginName;
	private String fileSystemName;
	private String filePath;
	private String fileThumb;
}
