package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Report {
	private int reportNo;
	private String reportContent;
	private String reportSender;
	private String reportReceiver;
	private int dealNo;
	private int reportTypeCode;
	private int auctionNo;
	private int reportCnt;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date reportRegDate;
	private String reportTypeName;
}
