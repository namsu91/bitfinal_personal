package kr.co.doublecome.liveauction.service;

import kr.co.doublecome.repository.vo.Auction;

public interface LiveAuctionService {
	Auction retrieveAuction(int auctionNo);
	String startOnAir(int auctionNo);
	void closeOnAir(int auctionNo);

}
