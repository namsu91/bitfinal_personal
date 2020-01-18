package kr.co.doublecome.auction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.doublecome.auction.service.AuctionServiceImpl;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.Page;
import kr.co.doublecome.repository.vo.SearchAuction;
import kr.co.doublecome.util.page.PageResult;

@Controller("kr.co.doublecome.auction.controller.AuctionController")
@RequestMapping("/auction")
public class AuctionController {
	
	@Autowired
	private AuctionServiceImpl service;
	
	@RequestMapping("/searchAuction.do")
	public void auctionList(Model model, SearchAuction search) {
		if (search.getCategoryCode() != null) {
			Category category= new Category();
			category.setCategoryCode(search.getCategoryCode());
			category.setCategoryName(search.getCategoryName());
			AjaxPage ap = service.auctionList(search);
			model.addAttribute("pr", ap.getPr());
			model.addAttribute("selectCategory",category);
			model.addAttribute("category",service.listCategory());
			model.addAttribute("auctionlist", ap.getList());
			System.out.println("끝나는 페이지"+ap.getPr().getEndPage());
			
		} else {
			AjaxPage ap = service.auctionList(search);
			model.addAttribute("pr", ap.getPr());
			model.addAttribute("auctionlist", ap.getList());
			model.addAttribute("searchKeyWord", search.getSearchKeyWord());
			model.addAttribute("category",service.listCategory());
		}
	}
	@RequestMapping("/searchActionList.do")
	@ResponseBody
	public AjaxPage auctionSearchList(@RequestBody SearchAuction search) {
		System.out.println(search.getSearchKeyWord());
		System.out.println(search.getSorts());
		return service.auctionList(search);
	}
}
