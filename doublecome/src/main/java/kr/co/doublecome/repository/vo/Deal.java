package kr.co.doublecome.repository.vo;

import lombok.Data;

@Data
public class Deal {
	
	private int dealNo;						// 거래 번호
	private int auctionNo;					// 경매글 번호
	private String userEmailBuyer;			// 구매자 이메일
	private String userEmailSeller;			// 판매자 이메일
	private int dealCondition;				// 거래 상태
	private int dealSellerCondition;    	// 판매자 거래 상태
	private int dealBuyerCondition;    		// 구매자 거래 상태
	private int dealUserCondition;
	private int dealCnt;					// 거래 개수
	private String auctionTitle;
	private String userEmail;
}
