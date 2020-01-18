package kr.co.doublecome.history.service;

import java.util.List;

import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.History;
import kr.co.doublecome.repository.vo.Review;
import kr.co.doublecome.repository.vo.Search;

public interface HistoryService {
	public List<Review> receiveReviewList(Search search);
	public List<Review> sendReviewList(Search search);
	public History receiveUserInfo(String userEmail);
	public AjaxPage receiveSaleHistory(Search search);
	public AjaxPage receiveBuyHistory(Search search);
	public void insertReview(Review review);
	public void deleteReview(Review review);
	public Review selectOneReview(Review review);
	public void updateReview(Review reivew);
	public void dealComplete(Deal deal);
	public void dealCancel(Deal deal);
}
