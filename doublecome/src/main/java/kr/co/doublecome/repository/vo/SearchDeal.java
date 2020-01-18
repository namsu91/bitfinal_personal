package kr.co.doublecome.repository.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)

public class SearchDeal extends Search{
	public SearchDeal () {
		super();
	}
	
	public SearchDeal (int pageNo) {
		super(pageNo);
	}
	
	public SearchDeal (int pageNo, int listSize) {
		super(pageNo, listSize);
	}
	
	private Integer startDealNo;
	private Integer endDealNo;
	
	
	private Integer[] categories;
}
