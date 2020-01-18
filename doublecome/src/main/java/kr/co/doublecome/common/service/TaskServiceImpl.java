package kr.co.doublecome.common.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import kr.co.doublecome.repository.mapper.AuctionDetailMapper;
import kr.co.doublecome.repository.vo.Auction;

@Service("kr.co.doublecome.common.service.TaskServiceImpl")
public class TaskServiceImpl implements TaskService{

	@Autowired
	private AuctionDetailMapper mapper;
	
	@Autowired
	private SmsService smsService;
	
	@Scheduled(fixedDelay=10000)
	public void callSms() {
		
		List<Auction> smsList = mapper.smsList();

		if (smsList.size() == 0) {
			return;
		} else {
			for (Auction auction : smsList) {
				smsService.sendSMS(
						auction.getUserNickname() + "회원님이 입찰하신 옥션 " + auction.getAuctionTitle() + " 을(를) " + auction.getBidPrice() + " 원에 낙찰받으셨습니다."
						, auction.getUserPhnum());
			}
			mapper.smsUpdate();			
		}
	}
	
}
