package kr.co.doublecome.repository.vo;

import lombok.Data;

@Data
public class Page {
	private int pageNo;
	private int listSize;

	public Page() {
		this(1,10);
	}
	
	public Page(int pageNo) {
		this(pageNo, 10);
	}
	
	
	public Page(int pageNo, int listSize) {
		this.pageNo = pageNo;
		this.listSize = listSize;
	}
	
	public int getBegin() {
		return (pageNo - 1) * listSize;
	}
	
	
}
