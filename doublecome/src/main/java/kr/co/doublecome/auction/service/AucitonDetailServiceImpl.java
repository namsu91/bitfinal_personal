package kr.co.doublecome.auction.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.AuctionDetailMapper;
import kr.co.doublecome.repository.mapper.AuctionMapper;
import kr.co.doublecome.repository.mapper.HistoryMapper;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.History;
import kr.co.doublecome.repository.vo.Inquiry;
import kr.co.doublecome.repository.vo.Review;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.repository.vo.UtilFile;
import kr.co.doublecome.util.page.PageResult;

@Service("kr.co.doublecome.auction.service.AucitonDetailServiceImpl")
public class AucitonDetailServiceImpl implements AuctionDetailService {
	
	@Autowired
	private AuctionDetailMapper mapper;
	
	@Autowired 
	private HistoryMapper hMapper;
	
	@Autowired
	private AuctionMapper aMapper;
	
	public Auction auctiondetail(int no) {
		return mapper.auctiondetail(no);
	}
	
	public History userInfo(String userEmail) {
		return hMapper.userInfo(userEmail);
	}
	
	public List<Review> selectReceiveReview(Search search) {
		return hMapper.selectReceiveReview(search);
	}
	
	public AjaxPage retrieveinquiry(int no, Integer pageNo) {
		AjaxPage ap = new AjaxPage();
		if(pageNo == null) {
			pageNo = 1;
		}
		Search search = new Search(pageNo);
		search.setKeyword(String.valueOf(no));	
		List<Object> list = new ArrayList<Object>();
		
		for(Inquiry inquiry : mapper.retrieveinquiry(search)) {
			list.add(inquiry);
		}
		int count = 0;
		
		if(!list.isEmpty()) {
			Inquiry a = (Inquiry)list.get(0);
			count = a.getInquiryCnt();
		}
		PageResult pr =  new PageResult(search.getPageNo(),count);
		ap.setList(list);
		ap.setPr(pr);
		return ap;
	}
	
	public void insertInquiry(Inquiry inquiry) {
		mapper.insertInquiry(inquiry);
	}
	
	public List<Category> categoryList() {
		return aMapper.categoryList();
	}
	
	public void addFile(UtilFile file) {
		mapper.addFile(file);
	}
	
	public int maxFileGroupCode() {
		return mapper.maxFileGroupCode();
	}
	
	public void addAuction(Auction auction) {
		mapper.addAuction(auction);
	}
	
	public List<UtilFile> retrieveFile(int no) {
		return mapper.retrieveFile(no);
	}
	public List<UtilFile> retrieveFileTag(int no) {
		return mapper.retrieveFileTag(no);
	}
	
	public void deleteAuction(int no) {
		mapper.deleteAuction(no);
	}
	public void updateInquiry(Inquiry inquiry) {
		mapper.updateInquiry(inquiry);
	}
	public void deleteInquiry(int no) {
		mapper.deleteInquiry(no);
	}
	public void auctionBid(Auction auction) {
		mapper.auctionBid(auction);
	}
	public void insertDeal(Deal deal) {
		mapper.insertDeal(deal);
	}
	public int checkBid(Auction auction) {
		return mapper.checkBid(auction);
	}
	public void callSPAddDeal(Auction auction) {
		mapper.callSPAddDeal(auction);
	}
	public List<Auction> bidList(int no) {
		return mapper.bidList(no);
	}
	public String selectPhNum(int no) {
		return mapper.selectPhNum(no);
	}
	public void tempFile(String string) {
		
	}
	public void addTag(UtilFile file) {
		mapper.addTag(file);
	}
}
