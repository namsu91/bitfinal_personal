package kr.co.doublecome.repository.vo;

import kr.co.doublecome.repository.vo.Page;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)

public class Search extends Page{

	public Search() {
		super();
	}
	

	public Search(int pageNo) {
		super(pageNo);
	}
	

	public Search(int pageNo, int listSize) {
		super(pageNo, listSize);
	}
	
	private String searchType;
	private String keyword;
	private String sort;	
}
