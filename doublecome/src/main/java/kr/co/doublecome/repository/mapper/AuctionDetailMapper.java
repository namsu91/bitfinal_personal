package kr.co.doublecome.repository.mapper;

import java.util.List;
import java.util.Map;

import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.Inquiry;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.repository.vo.UtilFile;

public interface AuctionDetailMapper {
	
	Auction auctiondetail(int no);
	Auction selectAuctionForLive(int no);	
	List<Inquiry> retrieveinquiry(Search search);
	void insertInquiry(Inquiry inquiry);
	int addFile(UtilFile file);
	int maxFileGroupCode();
	void addAuction(Auction auction);
	List<UtilFile> retrieveFile(int no);
	List<UtilFile> retrieveFileTag(int no);
	void deleteAuction(int no);
	void updateInquiry(Inquiry inquiry);
	void deleteInquiry(int no);
	void auctionBid(Auction auction);
	void insertDeal(Deal deal);
	int checkBid(Auction auction);
	void callSPAddDeal(Auction auction);
	List<Auction> bidList(int no);
	String selectPhNum(int no);
	void addTag(UtilFile file);
	List<Auction> smsList();
	void smsUpdate();
	void updateOnAir(Map<String,Integer> liveAuctionMap);
	int selectMaxBid(int auctionNo);
}
