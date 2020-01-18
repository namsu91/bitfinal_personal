package kr.co.doublecome.liveauction.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.AuctionDetailMapper;
import kr.co.doublecome.repository.vo.Auction;



@Service
public class LiveAuctionServiceImpl implements LiveAuctionService{
	
	@Autowired
	private AuctionDetailMapper mapper;
	
	@Override
	public Auction retrieveAuction(int auctionNo) {
		return mapper.selectAuctionForLive(auctionNo);
	}

	@Override
	public String startOnAir(int auctionNo) {
		Auction Auction = mapper.selectAuctionForLive(auctionNo);
		int onAir = Auction.getAuctionBroadcast();
		if(onAir == 1) {
			Map<String,Integer> liveAuctionMap = new HashMap();
			liveAuctionMap.put("auctionNo",auctionNo);
			liveAuctionMap.put("onAir",2);
			mapper.updateOnAir(liveAuctionMap);
			return "success";
		}
		return "false";
	}

	@Override
	public void closeOnAir(int auctionNo) {
		Map<String,Integer> liveAuctionMap = new HashMap();
		liveAuctionMap.put("auctionNo",auctionNo);
		liveAuctionMap.put("onAir",1);
		mapper.updateOnAir(liveAuctionMap);		
	}

}
