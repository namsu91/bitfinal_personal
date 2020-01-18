package kr.co.doublecome.admin.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.AdminMapper;
import kr.co.doublecome.repository.mapper.AuctionMapper;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.Deal;
import kr.co.doublecome.repository.vo.Report;
import kr.co.doublecome.repository.vo.ReportType;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.repository.vo.SearchAuction;
import kr.co.doublecome.repository.vo.SearchDeal;
import kr.co.doublecome.repository.vo.SearchUser;
import kr.co.doublecome.repository.vo.User;
import kr.co.doublecome.util.page.PageResult;

@Service
public class AdminServiceImpl implements AdminService{
	
	@Autowired
	AdminMapper mapper;

	@Autowired
	AuctionMapper auctionMapper;
	
	public Map<String, String> retrieveUserStaticsAc() {
		return mapper.selectUserStaticsByAuctionCnt();
	}


	public Map<String, String> retrieveUserStaticsRp() {
		return mapper.selectUserStaticsByReport();
	}


	public Map<String, String> retrieveUserStaticsDc() {
		return mapper.selectUserStaticsByDealCnt();
	}

	public Map<String, String> retrieveAuctionStaticsCon() {
		return mapper.selectAuctionStaticsByCondition();
	}

	

	public List<Category> retrieveAuctionStaticsCat() {
		return mapper.selectAuctionStaticsByCategory();
	}

	
	

	public List<Map<String, String>> retrieveUserStaticsRegDate(String startDate, String endDate) {
		Map<String,String> map = new HashMap<String,String>();
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		System.out.println(startDate + "  " + endDate);
		return mapper.selectUserCntbyRegDate(map);
	}


	public List<Map<String, String>> retrieveAuctionStaticsRegDate(String startDate, String endDate) {
		Map<String,String> map = new HashMap<String,String>();
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		System.out.println(startDate + "  " + endDate);
		return mapper.selectAuctionCntbyRegDate(map);
	}


	public AjaxPage retrieveUserForAdmin(SearchUser su){
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		List<User> ulist = mapper.selectUserForAdmin(su);
		for(User user : ulist) {
			list.add((Object)user);
		}
		
		int count = 0;
		
		if(!ulist.isEmpty()) {
			count = ulist.get(0).getUserCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(su.getPageNo(), count, su.getListSize(), 10));
		
		return ap;
	}

	
	public void removeAuction(List<Integer> auctionNos) {
		mapper.deleteAuction(auctionNos);
	}


	public void editCategory(Category cat) {
		mapper.updateCategory(cat);
	}

	public void removeCategories(List<String> categoryCodes) {
		mapper.deleteCategory(categoryCodes);
	}


	@Override
	public void addCategory(Category cat) {
		mapper.insertCategory(cat);		
	}


	public AjaxPage retrieveReport(Search search) {
		
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		
		List<Report> rlist = mapper.selectReportForAdmin(search);
		
		for(Report report : rlist) {
			list.add((Object)report);
		}
		
		int count = 0;
		
		if(!rlist.isEmpty()) {
			count = rlist.get(0).getReportCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, 5, 5));

		return ap;
	}
	
	@Override
	public AjaxPage retrieveDealForAdmin(SearchDeal sd) {
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		
		List<Deal> dlist = mapper.selectDealForAdmin(sd);
		
		for(Deal deal : dlist) {
			list.add((Object)deal);
		}
		
		int count = 0;
		
		if(!dlist.isEmpty()) {
			count = dlist.get(0).getDealCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(sd.getPageNo(), count, sd.getListSize(), 10));

		return ap;
	}


	public void editReportType(ReportType reportType) {
		System.out.println(reportType.toString());
		mapper.updateReportType(reportType);
	}


	@Override
	public AjaxPage retrieveReportTypes(Search search) {
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		List<ReportType> rtlist =  mapper.selectReportTypesForAdmin(search);
		
		
		for(ReportType rt : rtlist) {
			list.add((Object)rt);
		}
		
		int count = 0;
		
		if(!rtlist.isEmpty()) {
			count = rtlist.get(0).getReportTypeCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, search.getListSize(), 10));
		
		return ap;
	}



	public void removeReportTypes(List<String> reportTypeCodes) {
		mapper.deleteReportType(reportTypeCodes);
	}


	public void addReportType(ReportType reportType) {
		mapper.insertReportType(reportType);		
	}


	public void removeUser(List<String> userEmails) {
		mapper.deleteUser(userEmails);
	}
	
	public AjaxPage retrieveCategories(Search search){
		
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		List<Category> clist =  mapper.selectCategoriesForAdmin(search);
		
		
		for(Category cat : clist) {
			list.add((Object)cat);
		}
		
		int count = 0;
		
		if(!clist.isEmpty()) {
			count = clist.get(0).getCategoryCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(search.getPageNo(), count, search.getListSize(), 10));
		
		return ap;
	}
	
	public List<Category> retrieveCategoryForAucion(){
		return auctionMapper.categoryList();
	}
	
	public AjaxPage retrieveAuctionForAdmin(SearchAuction sa){
		AjaxPage ap = new AjaxPage();
		List<Object> list = new ArrayList<Object>();
		List<Auction> alist = mapper.selectAuctionForAdmin(sa);
		
		System.out.println(alist);
		
		for(Auction auction : alist) {
			list.add((Object)auction);
		}
		
		int count = 0;
		
		if(!alist.isEmpty()) {
			count = alist.get(0).getAuctionCnt();
		}
		
		ap.setList(list);
		ap.setPr(new PageResult(sa.getPageNo(), count, sa.getListSize(), 10));
		
		return ap;
	}


	public void addReport(String userEmail, Report report) {
		Deal deal = mapper.dealInfo(report.getAuctionNo());
		if (userEmail == deal.getUserEmailBuyer()) {
			report.setReportSender(deal.getUserEmailBuyer());
			report.setReportReceiver(deal.getUserEmailSeller());
		} else {
			report.setReportSender(deal.getUserEmailSeller());
			report.setReportReceiver(deal.getUserEmailBuyer());
		}
		report.setDealNo(deal.getDealNo());
		deal.setUserEmail(userEmail);
		mapper.insertReport(report);
		mapper.updateDealCondition(deal);
		
	}
	
	public void addAuctionReport(String userEmail, Report report) {
		report.setReportSender(userEmail);
		mapper.insertReport(report);
		
	}
	
}
