package kr.co.doublecome.repository.vo;

import java.util.Date;

import lombok.Data;

@Data
public class Inquiry {

	private int inquiryNo;
	private String inquiryContent;
	private Integer inquiryParent;
	private Date inquiryRegDate;
	private int auctionNo;
	private String userEmail;
	private String userNickname;
	private int inquiryCnt;
	
}
