package kr.co.doublecome.repository.mapper;

import java.util.List;

import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;

public interface MainMapper {
	
	List<Auction> mainAuctionList();
	List<Category> categoryList();
	List<Auction> selectOnAirAuction();
}
