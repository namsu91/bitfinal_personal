package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Review {
	
	private int auctionNo;						// 해당 경매글 번호
	private String auctionTitle;				// 해당 경매글 제목
	private String userEmail;					// 경매글쓴이
	private int reviewNo;						// 후기글 번호
	private String reviewTitle;					// 후기글 제목
	private String reviewContent;				// 후기글 내용
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date reviewRegDate;					// 후기글 작성일
	private int dealNo;							// 거래 번호
	private String senderNickname;				// 후기글쓴이 닉네임
	private String reviewSender;				// 후기글 작성한 사용자 이메일
	private String reviewReceiver;				// 후기글 받은 사용자 이메일
	private int reviewScore;					// 평가 점수
	private int fileGroupCode;					// 저장된 파일 그룹코드
	private int reviewCnt;						// 전체 리뷰 개수
	private String type;						// 후기 등록/수정/삭제 타입
}
