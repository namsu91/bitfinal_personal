package kr.co.doublecome.history.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.HistoryMapper;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.History;
import kr.co.doublecome.repository.vo.Review;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.util.page.PageResult;

@Service("kr.co.doublecome.history.service.HistoryServiceImpl")
public class HistoryServiceImpl implements HistoryService{
	@Autowired
	private HistoryMapper mapper;
	
	public List<Review> receiveReviewList(Search search){
		return mapper.selectReceiveReview(search);
	}
	public List<Review> sendReviewList(Search search){
		return mapper.selectSendReview(search);
	}
	public History receiveUserInfo(String userEmail) {
		return mapper.userInfo(userEmail);
	}
	public AjaxPage receiveSaleHistory(Search search) {
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		
		List<Auction> aList = mapper.saleHistory(search);
		
		for(Auction auction : aList) {
			System.out.println("경매글:" + auction);
			list.add((Object)auction);
		}
		
		int count = 0;
		
		if(!aList.isEmpty()) {
			count = aList.get(0).getAuctionCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, 5, 5));

		return ap;
	}
	
	public AjaxPage receiveBuyHistory(Search search){
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		
		List<Auction> aList = mapper.buyHistory(search);
		
		for(Auction auction : aList) {
			list.add((Object)auction);
		}
		
		int count = 0;
		
		if(!aList.isEmpty()) {
			count = aList.get(0).getAuctionCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, 5, 5));

		return ap;
	}
	public void insertReview(Review review) {
		Deal deal = mapper.dealInfo(review.getAuctionNo());
		review.setDealNo(deal.getDealNo());
		if (deal.getUserEmailBuyer().equals(review.getReviewSender())) {
			review.setReviewReceiver(deal.getUserEmailSeller());
		} else {
			review.setReviewReceiver(deal.getUserEmailBuyer());
		}
		review.setType("insert");
		mapper.insertReview(review);
		mapper.updateUserReviewInfo(review);
	}
	public void deleteReview(Review review) {
		review.setType("delete");
		mapper.deleteReview(review);
		mapper.updateUserReviewInfo(review);
	}
	public Review selectOneReview(Review review) {
		return mapper.selectOneReview(review);
	}
	public void updateReview(Review review) {
		review.setType("update");
		mapper.updateReview(review);
		System.out.println(review);
		mapper.updateUserReviewInfo(review);
	}
	public void dealComplete(Deal deal) {
		mapper.dealComplete(deal);
	}
	public void dealCancel(Deal deal) {
		mapper.dealCancel(deal);
	}
}
