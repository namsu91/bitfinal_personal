package kr.co.doublecome.repository.mapper;

import java.util.List;

import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.SearchAuction;

public interface AuctionMapper {
	//카테고리 리스트 받아옴
	List<Category> categoryList();
	List<Auction> listAuction(SearchAuction search);
	
}
