package kr.co.doublecome.liveauction.controller;

import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.doublecome.liveauction.service.LiveAuctionService;
import kr.co.doublecome.repository.vo.Auction;

@Controller
@RequestMapping("/liveAuction")
public class LiveAuctionController {
	
	@Autowired
	LiveAuctionService service;
	

	@RequestMapping(value="/broadcast.do", method=RequestMethod.POST)
	public String broadcast(int auctionNo, String type, Model model) {
		Auction auction = service.retrieveAuction(auctionNo);
		if(auction.getAuctionBroadcast() == 1) {
			return "liveAuction/notExist";
		}
		model.addAttribute("auction",service.retrieveAuction(auctionNo));
		model.addAttribute("type",type);
		return "liveAuction/broadcast";
	}
	
	@RequestMapping(value="/start.do", method=RequestMethod.POST)
	@ResponseBody 	
	public String startOnAir(int auctionNo) {
		return service.startOnAir(auctionNo);
	}
	
	@RequestMapping(value="/close.do", method=RequestMethod.POST)
	@ResponseBody 	
	public void closeOnAir(int auctionNo) {
		service.closeOnAir(auctionNo);
	}
	

}
