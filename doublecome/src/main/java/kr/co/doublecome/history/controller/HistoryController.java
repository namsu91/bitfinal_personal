package kr.co.doublecome.history.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.doublecome.common.service.FileService;
import kr.co.doublecome.history.service.HistoryService;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.Review;
import kr.co.doublecome.repository.vo.Search;

@Controller("kr.co.doublecome.history.controller.HistoryController")
@RequestMapping("/history")
public class HistoryController {
	@Autowired
	private HistoryService service;
	@Autowired
	private FileService fService;
	
	
	// history 처음 로딩시 구매/판매 내역, 후기 목록
	@RequestMapping("/listHistory.do")
	public void listHistory(Principal p, Model model) {
		String userEmail = p.getName();
		model.addAttribute("userHistory", service.receiveUserInfo(userEmail));
	}
	
	// 구매내역 ajax
	@RequestMapping("/receivePurchaseHistory.do")
	@ResponseBody
	public AjaxPage receivePurchaseHistory(Search search, Principal p){
		search.setListSize(5);
		search.setKeyword(p.getName());
		return service.receiveBuyHistory(search);
	}
	
	// 판매내역 ajax
	@RequestMapping("/receiveSaleHistory.do")
	@ResponseBody
	public AjaxPage receiveSaleHistory(Search search, Principal p){
		search.setListSize(5);
		search.setKeyword(p.getName());
		return service.receiveSaleHistory(search);
	}
	
	// 받은 후기 ajax
	@RequestMapping("/retrieveReceiveReview.do")
	@ResponseBody
	public List<Review> retrieveReceiveReview(Search search, Principal p){
		search.setKeyword(p.getName());
		search.setListSize(5);
		return service.receiveReviewList(search);
	}
	
	// 보낸후기 ajax
	@RequestMapping("/retrieveSendReview.do")
	@ResponseBody
	public List<Review> retrieveSendReview(Search search, Principal p){
		search.setKeyword(p.getName());
		search.setListSize(5);
		return service.sendReviewList(search);
	}
	
	// 후기등록
	@RequestMapping("/addReview.do")
	public String addReview(Principal p, Review review) {
		review.setReviewSender(p.getName());
		review.setReviewContent(fService.saveBase64File(review.getReviewContent()));
		service.insertReview(review);
		return "redirect:listHistory.do";
	}
	
	// 후기 수정폼
	@RequestMapping("/editReviewForm.do")
	@ResponseBody
	public Review editReviewForm(Review review) {
		return service.selectOneReview(review);
	}
	
	// 후기 수정
	@RequestMapping("/editReview.do")
	public String editReview(Review review) {
		review.setReviewContent(fService.saveBase64File(review.getReviewContent()));
		service.updateReview(review);
		
		return "redirect:listHistory.do";
	}
	
	// 후기삭제
	@RequestMapping("/removeReview.do")
	@ResponseBody
	public void removeReview(Review review) {
		service.deleteReview(review);
	}
	
	// 거래완료
	@RequestMapping("/dealComplete.do")
	public String dealComplete(Deal deal, Principal p) {
		service.dealComplete(deal);
		
		return "redirect:listHistory.do";
	}
	
	@RequestMapping("/dealCancel.do")
	public String dealCancel(Deal deal, Principal p) {
		service.dealCancel(deal);
		
		return "redirect:listHistory.do";
	}
}
