package kr.co.doublecome.util.page;

public class PageResult {
	int pageNo;
	int count;
	
	int beginPage;
	int endPage;
	
	boolean prev;
	boolean next;
	
	public PageResult(int pageNo, int count) {
		this(pageNo, count, 10, 10);
	}
	
	// 현재 페이지번호, 게시물 전체 갯수, 보여줄 게시물 갯수, 페이징 보여줄 갯수
	public PageResult(int pageNo, int count, int listSize, int tabSize) {
		this.pageNo = pageNo;
		this.count = count;
		int lastPage = (int)Math.ceil(count / (double)listSize);
		int currTab = (int)Math.ceil(pageNo / (double)tabSize);
		this.beginPage = (currTab - 1) * tabSize + 1;
		this.endPage = currTab * tabSize;
		if(endPage > lastPage) {endPage = lastPage;}
		this.prev = (beginPage != 1);
		this.next = (endPage != lastPage);
	}
	
	
	
	public int getPageNo() { return pageNo; }
	public int getCount() { return count; }
	public int getBeginPage() { return beginPage; }
	public int getEndPage() { return endPage; }
	public boolean isPrev() { return prev; }
	public boolean isNext() { return next; }
	
}
