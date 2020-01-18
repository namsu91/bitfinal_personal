package kr.co.doublecome.repository.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)

public class SearchUser extends Search{

	public SearchUser() {
		super();
	}
	
	public SearchUser(int pageNo) {
		super(pageNo);
	}
	
	public SearchUser(int pageNo, int listSize) {
		super(pageNo, listSize);
	}
	
	private Double startScore;
	private Double endScore;
	private Integer startDealCnt;
	private Integer endDealCnt;	
	private Integer startReviewCnt;
	private Integer endReviewCnt;
	private Integer startReportedCnt;
	private Integer endReportedCnt;
	private Integer type;
}
