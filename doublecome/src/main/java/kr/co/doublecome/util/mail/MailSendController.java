package kr.co.doublecome.util.mail;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.doublecome.user.service.UserService;

@Controller
@RequestMapping("/mail") 
public class MailSendController {
	
	public MailSendController() {
	}
	
	@Autowired 
	private JavaMailSenderImpl mailSend;
	
	@Autowired
	UserService service;
	
	//비밀번호 찾기
	@RequestMapping("/findPass.do") 
	public String mailSender( String email ) { 
		System.out.println("/sendMailForFindPass.do");
		final MimeMessagePreparator preparator = new MimeMessagePreparator() {
			@Override 
			public void prepare(MimeMessage mimeMessage) throws Exception { 
				final MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8"); 
				helper.setFrom("doublecome4@gmail.com");  					// 보내는사람 생략하면 정상작동을 안함 xml과 다르면 전송 안됨
				helper.setTo(email); 						// 받는사람 이메일
				helper.setSubject("누구나 쉬운 경매! 더불로와 - 비밀번호 찾기"); 			// 메일제목은 생략이 가능하다
				
				
				
				helper.setText(
						/*
						 * "<div>"+ "<div style='color: #8e8e8e'> 누구나 쉬운 경매!</div>" +
						 * "<div style='color: #DB1D3B;'> 더불 </div>" +
						 * "<div style='color: #DB1D3B;'> 러와 </div>" + "<div>" +
						 * "<div class=\"pen-title\" style=''>\r\n" +
						 * "	  <div><a href=\"doublecome/main.do\">누구나 쉬운 경매!</a></div>\r\n" +
						 * "		<div><a class=\"titleToMain\" href=\"doublecome/main.do\">더블</a></div>\r\n"
						 * +
						 * "		<div><a class=\"titleToMain\" href=\"doublecome/main.do\">로와</a></div>\r\n"
						 * + "	</div>" +
						 */
						"본인이 요청하지 않았다면 무시해 주세요<br>" +
						"<br>비밀번호 수정 페이지로 " +
						"<a href=http://localhost:80/doublecome/user/findPassForm.do"+
								"?userEmail=" + email +
								"&userPass=" + service.findPass(email) + "> 이동 <a>"
										+ "합니다"  , true);	 			// 메일 내용
			} 
		}; 
		mailSend.send(preparator); 
		return "main"; 
	}



}
