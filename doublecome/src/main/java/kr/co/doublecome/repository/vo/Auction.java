package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data	
public class Auction {
	private int auctionNo;					// 경매글 번호
	private String auctionTitle;			// 경매글 제목
	private String auctionContent;			// 경매글 내용
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date auctionRegDate;     		// 경매글 작성일
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date auctionLimitDate; 			// 경매 기한
	private String auctionBuyNow;			// 즉시 구매가
	private String auctionMinPrice;			// 경매 시작가
	private int auctionCondition;			// 경매 진행 상태
	private int fileGroupCode; 				// 파일 그룹코드
	private int categoryCode;				// 카테고리
	private String categoryName;			// 카테고리
	private int maxPrice;					// 현재 최고 입찰가
	private String maxPriceId;              // 최고 입찰자
	private int bidCnt;						// 입찰 횟수
	private int bidPrice;					// 입찰가
	private String userEmail;				// 경매글쓴이
	private double userScore;				// 경매글쓴이 평점
	private String userNickname;			// 경매글쓴이 닉네임
	private String reviewSender;			// 후기 작성자 이메일
	private int auctionCnt;				    // 경매  개수
	private int auctionReportedCnt;			// 받은 신고글 갯수
	private int inquiryNo;					// 문의글 번호
	private String inquiryContent;			// 문의글 내용
	private int inquiryParent;				// 답글 여부
	private String inquiryRegDate;			// 문의글 게시일
	private int dealNo;						// 거래번호
	private int dealCondition;				// 거래상태
	private int dealBuyerCondition;			// 구매자거래상태
	private int dealSellerCondition;		// 판매자거래상태
	private Date dealRegDate;				// 거래시작일
	private String userEmailBuyer;			// 구매자 이메일
	private String userEmailSeller;			// 판매자 이메일
	private int auctionBroadcast;			// 방송여부
	private String userPhnum;				// 유저폰번호
	
	
	private int fileNo;
	private String fileOriginName;
	private String fileSystemName;
	private String filePath;
	private String fileThumb;
}
