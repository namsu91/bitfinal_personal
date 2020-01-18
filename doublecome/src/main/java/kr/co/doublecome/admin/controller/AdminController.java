package kr.co.doublecome.admin.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.doublecome.admin.service.AdminService;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Category;
import kr.co.doublecome.repository.vo.Report;
import kr.co.doublecome.repository.vo.ReportType;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.repository.vo.SearchAuction;
import kr.co.doublecome.repository.vo.SearchDeal;
import kr.co.doublecome.repository.vo.SearchUser;

@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Autowired
	AdminService service;
	

	@RequestMapping("/basic.do")
	public void basic() {}
	
	@RequestMapping("/retrieveUser.do")
	public void retrieveUser(SearchUser su) {}
	
	@RequestMapping("/retrieveReportedUser.do")
	public void retrieveReportedUser() {}
	
	@RequestMapping("/retrieveUserStatistics.do")
	public void retrieveUserStatistics() {}
	
	@RequestMapping("/retrieveReportedAuction.do")
	public void retrieveReportedAuction(Model model) {		
		model.addAttribute("categories", service.retrieveCategoryForAucion());		
	}
	
	@RequestMapping("/retrieveAuctionStatistics.do")
	public void retrieveAuctionStatistics() {}
	
	@RequestMapping("/retrieveAuction.do")
	public void retrieveAuction(Model model) {
		model.addAttribute("categories", service.retrieveCategoryForAucion());		
	}
	
	@RequestMapping("/retrieveDeal.do")
	public void retrieveDeal() {}
	
	@RequestMapping("/retrieveCategory.do")
	public void retrieveCategory() {}
	
	@RequestMapping("/retrieveReport.do")
	public void retrieveReport() {}
	
	@RequestMapping("/searchUser.do")
	@ResponseBody 
	public AjaxPage searchUser(@RequestBody SearchUser su) {
		return service.retrieveUserForAdmin(su);
	}
	
	@RequestMapping("searchAuction.do")
	@ResponseBody 
	public AjaxPage searchAuction(@RequestBody SearchAuction sa) {
		return service.retrieveAuctionForAdmin(sa);
	}
	
	@RequestMapping("searchDeal.do")
	@ResponseBody 
	public AjaxPage searchDeal(@RequestBody SearchDeal sd) {
		return service.retrieveDealForAdmin(sd);
	}
	
	@RequestMapping("/detailReport.do")
	@ResponseBody 
	public AjaxPage retrieveReport(Search search) {
		search.setListSize(5);
		return service.retrieveReport(search);
	}
	
	@RequestMapping("/removeUser.do")
	@ResponseBody 
	public void removeUser(@RequestBody List<String> userEmails) {
		service.removeUser(userEmails);
	}
	
	@RequestMapping("/removeAuction.do")
	@ResponseBody 
	public void removeAuction(@RequestBody List<Integer> auctionNos) {
		service.removeAuction(auctionNos);
	}
	
	@RequestMapping("/removeCategories.do")
	@ResponseBody 
	public void removeCategories(@RequestBody List<String> categoryCodes) {
		service.removeCategories(categoryCodes);
	}
	
	@RequestMapping("/removeReportTypes.do")
	@ResponseBody 
	public void removeReportTypes(@RequestBody List<String> reportTypeCodes) {
		service.removeReportTypes(reportTypeCodes);
	}
	
	@RequestMapping("/retrieveCategories.do")
	@ResponseBody 
	public AjaxPage retrieveCategories(@RequestBody Search search) {
		return service.retrieveCategories(search);
	}
	
	@RequestMapping("/retrieveReportTypes.do")
	@ResponseBody 
	public AjaxPage retrieveReportTypes(@RequestBody Search search) {
		return service.retrieveReportTypes(search);
	}
	
	@RequestMapping("/editCategory.do")
	@ResponseBody 
	public void editCategories(@RequestBody Category cat) {
		service.editCategory(cat);
	}
	
	@RequestMapping("/addCategory.do")
	@ResponseBody 
	public void addCategories(@RequestBody Category cat) {
		service.addCategory(cat);
	}
	
	@RequestMapping("/editReportType.do")
	@ResponseBody 
	public void editReportType(@RequestBody ReportType reportType) {
		service.editReportType(reportType);
	}
	
	@RequestMapping("/addReportType.do")
	@ResponseBody 
	public void addReportType(@RequestBody ReportType reportType) {
		service.addReportType(reportType);
	}
	
	@RequestMapping("/retrieveUserStaticsAc.do")
	@ResponseBody 	
	public Map<String,String> retrieveUserStaticsAc() {
		return service.retrieveUserStaticsAc();
	}
	
	@RequestMapping("/retrieveUserStaticsRp.do")
	@ResponseBody 	
	public Map<String,String> retrieveUserStaticsRp() {
		return service.retrieveUserStaticsRp();
	}
	
	@RequestMapping("/retrieveUserStaticsDc.do")
	@ResponseBody 	
	public Map<String,String> retrieveUserStaticsDc() {
		return service.retrieveUserStaticsDc();
	}
	
	@RequestMapping("/retrieveAuctionStaticsCon.do")
	@ResponseBody 	
	public Map<String,String> retrieveAuctionStaticsCon() {
		return service.retrieveAuctionStaticsCon();
	}
	
	@RequestMapping("/retrieveAuctionStaticsCat.do")
	@ResponseBody 	
	public List<Category> retrieveAuctionStaticsCat() {
		return service.retrieveAuctionStaticsCat();
	}
	
	@RequestMapping("/retrieveAuctionStaticsRegDate.do")
	@ResponseBody 	
	public List<Map<String,String>> retrieveAuctionStaticsRegDate(String startDate, String endDate) {
		return service.retrieveAuctionStaticsRegDate(startDate, endDate);
	}
	
	@RequestMapping("/retrieveUserStaticsRegDate.do")
	@ResponseBody 	
	public List<Map<String,String>> retrieveUserStaticsRegDate(String startDate, String endDate) {
		return service.retrieveUserStaticsRegDate(startDate, endDate);
	}
	
	// 신고등록
	@RequestMapping("/addReport.do")
	public String addReport(Principal p, Report report) {
		service.addReport(p.getName(), report);
		return "redirect:/history/listHistory.do";
	}
	
	@RequestMapping("/addAuctionReport.do")
	public String addAuctionReport(Principal p, Report report) {
		service.addAuctionReport(p.getName(), report);
		return "redirect:/main.do";
	}
	
	
	
	
}
