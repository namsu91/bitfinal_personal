package kr.co.doublecome.auction.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import org.apache.commons.net.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import kr.co.doublecome.auction.service.AuctionDetailService;
import kr.co.doublecome.common.service.SmsService;
import kr.co.doublecome.repository.vo.AjaxPage;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.Inquiry;
import kr.co.doublecome.repository.vo.Report;
import kr.co.doublecome.repository.vo.Review;
import kr.co.doublecome.repository.vo.Search;
import kr.co.doublecome.repository.vo.UtilFile;

@Controller("kr.co.doublecome.auction.controller.AuctionDetailController")
@RequestMapping("/auction")
public class AuctionDetailController {

	@Autowired
	private AuctionDetailService service;
//	@Autowired
//	private HistoryService hService;
	@Autowired
	private SmsService smsService;
	
	@RequestMapping("/detailAuction.do")
	public void auctionDetail(int no, String userEmail, Model model, Integer pageNo, Search search, Principal principal ) {
		model.addAttribute("auction", service.auctiondetail(no));
		model.addAttribute("user", service.userInfo(userEmail));
		search.setKeyword("c@c");
		search.setPageNo(1);
		search.setListSize(2);
		model.addAttribute("review", service.selectReceiveReview(search));
		AjaxPage ap = service.retrieveinquiry(no, pageNo);
		model.addAttribute("inquiry", ap.getList());
		model.addAttribute("pr", ap.getPr());
		model.addAttribute("file", service.retrieveFile(no));
		model.addAttribute("bid", service.bidList(no));
		model.addAttribute("tag", service.retrieveFileTag(no));
		model.addAttribute("reportCheck", service.checkReport(no, principal));
		
	}
	
	@RequestMapping("/retrieveReceiveReview.do")
	@ResponseBody
	public List<Review> retrieveReceiveReview(Search search, int rPageNo, String email){
		search.setKeyword(email);
		search.setListSize(5);
		search.setPageNo(rPageNo);
		return service.selectReceiveReview(search);
	}
	
	@RequestMapping("/checkBid.do")
	@ResponseBody
	public int checkBid(Auction auction){
		int result = service.checkBid(auction);
		if (result >= 1) {
			return 1;
		}
		return 0;
	}
	
	@RequestMapping("/insertAuction.do")
	public void auctionInsert(Model model) {
		model.addAttribute("category", service.categoryList());
	}
	
	@RequestMapping("/inquiry_add.do")
	public String insertInquiry(@RequestHeader(value="referer") String referer, Inquiry inquiry, Principal principal) {
		inquiry.setUserEmail(principal.getName());
		service.insertInquiry(inquiry);
		return "redirect:" + referer;
	}
	
	@RequestMapping("/addAuction.do")
	public String addAuction(@RequestHeader(value = "referer") String referer, Principal principal, Auction auction, UtilFile uFile) throws Exception {
		
		int groupCode = service.maxFileGroupCode();
		System.out.println("경매 넣기" + groupCode);
		auction.setUserEmail(principal.getName());
		auction.setAuctionBuyNow(auction.getAuctionBuyNow().replaceAll(",", ""));
		auction.setAuctionMinPrice(auction.getAuctionMinPrice().replaceAll(",", ""));
		auction.setFileGroupCode(groupCode);
		service.addAuction(auction);
		
		return "redirect:/main.do";
	}
	
	@RequestMapping("/deleteAuction.do")
	public String updateAuction(int no, Model model) {
		service.deleteAuction(no);
		return "redirect:/main.do";
	}
	
	@RequestMapping("/editInquiry.do")
	public String updateInquiry(@RequestHeader(value="referer") String referer, Inquiry inquiry) {
		service.updateInquiry(inquiry);
		return "redirect:" + referer;
	}
	@RequestMapping("/removeInquiry.do")
	public String deleteInquiry(@RequestHeader(value="referer") String referer, int inquiryNo) {
		service.deleteInquiry(inquiryNo);
		return "redirect:" + referer;
	}
	@RequestMapping("/addBid.do")
	public String auctionBid(@RequestHeader(value="referer") String referer, Principal principal, Auction auction) {
		auction.setUserEmail(principal.getName());
		smsService.sendSMS("최고입찰가가 갱신되었습니다.", service.selectPhNum(auction.getAuctionNo()));
		service.auctionBid(auction);
		return "redirect:" + referer;
	}
	@RequestMapping("/buyNow.do")
	public String insertDeal(Principal principal, Auction auction) {
		auction.setUserEmailBuyer(principal.getName());
		service.callSPAddDeal(auction);
		return "redirect:/main.do";
	}
	@RequestMapping("/uploadPhoto.do")
	public void upload() {
	}
	
	@RequestMapping("/tempFile.do")
	@ResponseBody
	public String tempFile(String fileUrl, String filename) {
		String fileUrl2 = fileUrl.split(",")[1];
		byte[] binary = Base64.decodeBase64(fileUrl2);
		FileOutputStream fos = null;
		String root = null;
		try {
			String sysName = UUID.randomUUID().toString();
			String fileName = sysName+".jpg";
			root = "/var/photo/upload/temp/" + fileName;
			File file = new File("/var/photo/upload/temp/");
			if(file.exists() == false) file.mkdirs();
			fos = new FileOutputStream(root);
			fos.write (binary);
			fos.flush();
			fos.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return root;
	}
	 
	
	
	
	@RequestMapping("/fileTag.do")
	@ResponseBody
	public void fileTag(String data, UtilFile file) throws Exception {
		int fileGroupCode = service.maxFileGroupCode() + 1;
		System.out.println("파일 등록" + fileGroupCode);
		JsonParser parser = new JsonParser();
		JsonElement element = parser.parse(data);
		JsonObject obj = element.getAsJsonObject(); 
		Set<Map.Entry<String, JsonElement>> entries = obj.entrySet();
		
		for (Map.Entry<String, JsonElement> entry: entries) {
			
			
			String sysName = entry.getKey().split("/var/photo/upload/temp/")[1];
			SimpleDateFormat sdf = new SimpleDateFormat("/yyyy/MM/dd/");
			String filePath = "auction" + sdf.format(new Date());
			String path = "/var/photo/upload/" + filePath;
			File realPath = new File(path);
			if(realPath.exists() == false) realPath.mkdirs();
			File delFile = new File(entry.getKey());
			File copyFile = new File(path + sysName);
			FileInputStream fis = new FileInputStream(delFile);
			FileOutputStream fos = new FileOutputStream(copyFile);
			int input = 0; 
			byte[] data2 = new byte[1024];			  
			while((input = fis.read(data2)) != -1) {
			  fos.write(data2, 0, input);
			}
			file.setFileGroupCode(fileGroupCode);
			file.setFilePath(path);
			file.setFileSystemName(sysName);
			service.addFile(file);
			System.out.println("파일넣었음" + fileGroupCode);
			if (element.getAsJsonObject().get(entry.getKey()).isJsonArray()) {
				JsonArray jsonArray = obj.getAsJsonArray(entry.getKey());
				for (int i = 0; i < jsonArray.size(); i++) {
					String content = jsonArray.get(i).getAsJsonObject().get("content").getAsString();
					if (content.equals("")) continue;
					file.setFileNo(file.getFileNo());
					file.setTagXCor(jsonArray.get(i).getAsJsonObject().get("x").getAsInt());
					file.setTagYCor(jsonArray.get(i).getAsJsonObject().get("y").getAsInt());
					file.setTagContent(content);
					service.addTag(file);
				}
			} 
			fis.close();
			fos.close();
			delFile.delete();
		}
	}
	
	
	
}
