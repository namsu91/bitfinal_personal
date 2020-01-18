package kr.co.doublecome.main.service;

import java.util.List;

import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;


public interface MainService {
	
	List<Auction> mainList();

	List<Category> listCategory();
	
	List<Auction> retrieveOnAirList();
}
