package kr.co.doublecome.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.doublecome.repository.mapper.MainMapper;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;

@Service("kr.co.doublecome.main.service.MainService")
public class MainServiceImpl implements MainService {
	
	@Autowired
	private MainMapper mapper;
	
	
	public List<Auction> mainList() {
		return mapper.mainAuctionList();
	}
	
	public List<Category> listCategory() { return mapper.categoryList();}
	
	public List<Auction> retrieveOnAirList(){
		return mapper.selectOnAirAuction();
	}
}
