package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class Chat {
	private int chatNo;
	private int dealNo;
	private String userEmailSeller;
	private String userEmailbuyer;
	private int readsSeller;
	private int readsBuyer;
	private String covstContent;
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
	private Date covstRegDate;
	private String sellerFileGroupCode;
	private String buyerFileGroupCode;
	private String sellerNickName;
	private String buyerNickName;
	private String auctionTitle;
	private int fileGroupCode;
	private int userType;
	private int fileNo;
}
