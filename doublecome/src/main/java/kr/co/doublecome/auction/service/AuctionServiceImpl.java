package kr.co.doublecome.auction.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.AuctionMapper;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.SearchAuction;
import kr.co.doublecome.util.page.PageResult;

@Service("kr.co.doublecome.auction.service.AuctionService")
public class AuctionServiceImpl implements AuctionService {
	
	@Autowired
	private AuctionMapper mapper;
	// 카테고리 리스트 담아서 넘김
	public List<Category> listCategory() { return mapper.categoryList();}
	// 선택한 리스트 뿌리기
	public AjaxPage auctionList(SearchAuction search) {
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<>();
		if (search.getListSize() < 13) search.setListSize(12); 
		List<Auction> alist = mapper.listAuction(search);
		for(Auction auction : alist) {
			list.add((Object)auction);
		}
		int count = 0;
		
		if(!alist.isEmpty()) {
			count = alist.get(0).getAuctionCnt();
		}
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, search.getListSize(), 10));
		return ap;
	}
}
