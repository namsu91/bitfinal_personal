package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class ConverSation {
	private int covstNo;
	private String covstContent;
	private String userEmail;
	private int chatNo;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date covstRegDate;
	private int userType;
	private int covstReads;
	private int dataType;
}
