package kr.co.doublecome.common.service;

import java.util.HashMap;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Service("kr.co.doublecome.common.service.SmsServiceImpl")
public class SmsServiceImpl implements SmsService{
	
	  public void sendSMS(String msg, String phNo) {
		    String api_key = "";
		    String api_secret = "";
		    Message coolsms = new Message(api_key, api_secret);
		    HashMap<String, String> params = new HashMap<String, String>();
		    params.put("to", phNo);
		    params.put("from", "");
		    params.put("type", "SMS");
		    params.put("text", msg);
		    params.put("app_version", "JAVA SDK v1.2");
		    try {
		      JSONObject obj = (JSONObject) coolsms.send(params);
		      System.out.println(obj.toString());
		    } catch (CoolsmsException e) {
		      System.out.println(e.getMessage());
		      System.out.println(e.getCode());
		    }
		  }
}
