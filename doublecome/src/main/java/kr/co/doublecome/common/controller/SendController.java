package kr.co.doublecome.common.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.doublecome.common.service.SmsService;

@Controller
@RequestMapping("/Sms")
public class SendController {
	@Autowired
	private SmsService service;
	
	@RequestMapping("/Send.do")
	public void downLoadFile(String msg, String phNo) {
		service.sendSMS(msg, phNo);
	}
	
}
