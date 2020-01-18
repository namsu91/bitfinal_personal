package kr.co.doublecome.repository.vo;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)

public class SearchAuction extends Search{
	public SearchAuction () {
		super();
	}
	
	public SearchAuction (int pageNo) {
		super(pageNo);
	}
	
	public SearchAuction (int pageNo, int listSize) {
		super(pageNo, listSize);
	}
	
	private String categoryName;
	private Integer categoryCode;
	private Integer startLimit;
	private Integer startBidCount;
	private Integer endBidCount;
	private Integer startPrice;
	private Integer endPrice;
	private String sorts;
	private Integer type;
	private Integer startReportedCnt;
	private Integer endReportedCnt;
	private String searchKeyWord;
	
	private Integer[] categories;
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date startLimitDate; 
	
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date endLimitDate; 
	
}
