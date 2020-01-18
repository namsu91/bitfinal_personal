package kr.co.doublecome.user.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.github.scribejava.core.model.OAuth2AccessToken;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import kr.co.doublecome.common.service.FileService;
import kr.co.doublecome.repository.vo.Auction;
import kr.co.doublecome.repository.vo.IsYours;
import kr.co.doublecome.repository.vo.User;
import kr.co.doublecome.repository.vo.UtilFile;
import kr.co.doublecome.user.BO.NaverLoginBO;
import kr.co.doublecome.user.service.UserService;
import kr.co.doublecome.util.security.MyBatisUserDetailsService;

@Controller
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService service;

	@Autowired
	FileService fileService;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private MyBatisUserDetailsService userService;

	/* NaverLoginBO */
	private NaverLoginBO naverLoginBO;
	private String apiResult = null;

	@Autowired
	private void setNaverLoginBO(NaverLoginBO naverLoginBO) {
		this.naverLoginBO = naverLoginBO;
	}

	// 로그인
	@RequestMapping("/loginForm.do")
	public void loginForm(String result, Model model, HttpSession session) throws Exception {

		/* 네이버아이디로 인증 URL을 생성하기 위하여 naverLoginBO클래스의 getAuthorizationUrl메소드 호출 */
		String naverAuthUrl = naverLoginBO.getAuthorizationUrl(session);
		// 네이버 로그인 창 URL
		model.addAttribute("url", naverAuthUrl);

		
	}
	
	//로그인 실패
	 @RequestMapping("/loginfail.do")
	 public String loginfail ( HttpServletRequest request, HttpServletResponse response
			 ) throws Exception{
		 response.getContentType();
		 System.out.println(request.getAttributeNames() + "<<getAttributeNames");
		 System.out.println(response.getContentType() + "<< getContentType");
	 return "user/loginForm.do"; 
	 }
	 
	
	
	@RequestMapping("/kakaoCallback.do")
	@ResponseBody
	public int kakaoCallback(
			Model model, HttpSession session,
			HttpServletRequest req,
			String email,
			String id)
			throws Exception {
		System.out.println("kakao >>" + email);
		System.out.println(service.checkEmail(email) + " <<service.checkEmail(email)");
		if (service.checkEmail(email) == 0) {
			return 0;
		}

		UserDetails u = userService.loadUserByUsername(email);
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(new UsernamePasswordAuthenticationToken(u, null, u.getAuthorities()));
		HttpSession APIsession = req.getSession(true);
		APIsession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);
		return 1;
	}

	// 네이버 로그인 성공시 callback호출 메소드
	@RequestMapping("/callback.do")
	public String callback(
			Model model, 
			@RequestParam String code, 
			@RequestParam String state, 
			HttpSession session,
			HttpServletRequest req) throws Exception {

		OAuth2AccessToken oauthToken;
		oauthToken = naverLoginBO.getAccessToken(session, code, state);
		// 로그인 사용자 정보를 읽어온다.
		apiResult = naverLoginBO.getUserProfile(oauthToken);
		model.addAttribute("result", apiResult);

		JsonParser jsonParser = new JsonParser();
		JsonElement jsonElement = jsonParser.parse(apiResult);

		JsonElement response = jsonElement.getAsJsonObject().get("response");
		String email = response.getAsJsonObject().get("email").getAsString();
		String nickname = response.getAsJsonObject().get("nickname").getAsString();
		String id = response.getAsJsonObject().get("id").getAsString();
		if (service.checkEmail(email) == 0) {
			User u = new User();
			u.setUserEmail(email);
			u.setUserPass(id);
			u.setUserNickname(nickname);
			model.addAttribute("user", u);
			return "user/joinForm2";
		}

		UserDetails u = userService.loadUserByUsername(email);
		SecurityContext sc = SecurityContextHolder.getContext();
		// 아이디, 패스워드, 권한을 설정합니다. 아이디는 Object단위로 넣어도 무방하며
		// 패스워드는 null로 하여도 값이 생성됩니다.
		sc.setAuthentication(new UsernamePasswordAuthenticationToken(u, null, u.getAuthorities()));
		HttpSession APIsession = req.getSession(true);

		// 위에서 설정한 값을 Spring security에서 사용할 수 있도록 세션에 설정해줍니다.
		APIsession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);

		return "/main";
	}

	// 이메일 찾기 페이지, 이메일 찾기
	@RequestMapping("/findEmailPassForm.do")
	public String findEmailForm(String userPhnum, Model model) throws Exception {

		if (service.findEmail(userPhnum) == null) {
			model.addAttribute("email", "가입된 메일이 없습니다");
			return "user/findForm";
		}
		String r = service.findEmail(userPhnum);
		model.addAttribute("email", r);
		return "user/findForm";
	}

	// 비밀번호 찾기 페이지
	@RequestMapping("/findForm.do")
	public void findPass(User user) throws Exception {
	}

	// 회원 탈퇴
	@RequestMapping("/deleteUser.do")
	public String deleteUser(String userEmail) throws Exception {
		service.deleteUser(userEmail);
		return "redirect:/user/logout.do";
	}
	
	//회원 탈퇴  - 진행중 경매 유무 확인
	@RequestMapping("/checkAuction.do")
	@ResponseBody
	public List<Auction> checkAuction (String email) throws Exception {
		
		List<Auction> a = service.checkAuction(email); 
		a = service.checkDeal(email);
		return a;
	}

	// 회원 가입 - 화면
	@RequestMapping("/joinForm.do")
	public void joinForm(User user, Model model) throws Exception {
	}

	// 회원가입 - api 화면
	@RequestMapping("/joinForm2.do")
	public void joinForm2(Model model, User user, String email, String id) throws Exception {
		User u = new User();
		u.setUserEmail(email);
		u.setUserPass(id);
		model.addAttribute("user", u);
	}

	// 회원 가입 - 버튼
	@RequestMapping("/insert.do")
	public String insertUser(User user, HttpServletRequest req) throws Exception {
		user.setUserPass(encoder.encode(user.getUserPass()));
		service.insertUser(user);

		UserDetails u = userService.loadUserByUsername(user.getUserEmail());
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(new UsernamePasswordAuthenticationToken(u, null, u.getAuthorities()));
		HttpSession APIsession = req.getSession(true);

		APIsession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);

		return "redirect:/main.do";
	}

	// 회원 가입 - 이메일 중복 검사
	@RequestMapping("/checkEmail.do")
	@ResponseBody
	public int checkEmail(@RequestParam(value = "param") String userEmail) {
		System.out.println("email" + service.checkEmail(userEmail));
		return service.checkEmail(userEmail);
	}

	// 회원 가입 - 번호 중복 검사
	@RequestMapping("/checkPhnum.do")
	@ResponseBody
	public int checkPhnum(@RequestParam(value = "param") String userPhnum) {
		System.out.println("phnum" + service.checkPhnum(userPhnum));
		return service.checkPhnum(userPhnum);
	}

	// 회원 가입 - 별명 중복 검사
	@RequestMapping("/checkNickname.do")
	@ResponseBody
	public int checkNickname(@RequestParam(value = "param") String userNickname) {
		System.out.println("userNickname" + service.checkPhnum(userNickname));
		return service.checkNickname(userNickname);
	}

	// 마이페이지
	@RequestMapping("/userInfo.do")
	public void userInfo() throws Exception {
	}



	// 마이페이지 - 회원 정보 수정
	@RequestMapping("/userInfoUpdate.do")
	public void userInfoUpdate(/* @RequestParam(value="userEmail") */ String userEmail,
			/* @RequestParam(value="userPass") */ String userPass, Model model) throws Exception {
		User user = new User();
		user.setUserEmail(userEmail);
		user.setUserPass(userPass);
		model.addAttribute("user", service.selectUserInfo(user));
	}
	
	// 마이페이지 -프로필 이미지 삭제
	@RequestMapping("/deleteProfile.do")
	@ResponseBody
	public void deleteProfile(String email) throws Exception {
		User user = service.selectUserInfoByName(email);
		fileService.deleteProfile(user); 
		service.updateUserDefaultProfile(email);
	}

	// 마이페이지 - 회원 정보 수정 버튼
	@RequestMapping("/userUpdate.do")
	public String updateUser(User user, Principal p, HttpServletRequest req, HttpServletResponse res,
			@RequestParam("file") MultipartFile file) throws Exception {
		User u = service.selectUserInfoByName(user.getUserEmail());
		
		//비밀번호 수정 
		if(user.getUserPass().length() != 0)
			user.setUserPass(encoder.encode(user.getUserPass())); 
		
		//파일 수정
		if(file.getOriginalFilename().length() != 0 ) {
			UtilFile util = new UtilFile(); 
			List<MultipartFile> attach = new ArrayList<>(); 
			attach.add(file);
			util.setAttach(attach); 
			
			if(u.getFileGroupCode() != 0) {
				fileService.deleteProfile(u);
				user.setFileGroupCode(u.getFileGroupCode());
			}else {
				user.setFileGroupCode(fileService.maxFileGroupCode() + 1);
			}
			u.setFileGroupCode(user.getFileGroupCode());
			fileService.uploadProfile(util, u);
		}else {
			user.setFileGroupCode(u.getFileGroupCode());
		}
			
		service.updateUser(user);
		
		
		User updatedU = service.selectUserInfoByName(user.getUserEmail());
		// 세션 등록
		UserDetails uu = userService.loadUserByUsername(updatedU.getUserEmail());
		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(new UsernamePasswordAuthenticationToken(uu, null, uu.getAuthorities()));
		HttpSession APIsession = req.getSession(true);

		APIsession.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);
		return "redirect:/main.do";
	}

	// 입찰 리스트
	@RequestMapping("/bidList.do")
	@ResponseBody
	public List<Auction> bidList(String email) throws Exception {
		return service.bidList(email);
	}
	//입찰 리스트 - 입찰 가격 체크
	@RequestMapping("/isYours.do")
	@ResponseBody
	public int isYours(IsYours iy) {
		iy = service.isYours(iy);
		if(iy.getMaxPrice() == iy.getBidPrice()) 
		return 1;
		else return 0; 
	}


	// 비밀번호 수정 패이지
	@RequestMapping("/findPassForm.do")
	public void findPassForm(@RequestParam(value = "userEmail") String userEmail,
			@RequestParam(value = "userPass") String userPass, Model model) throws Exception {
		User user = new User();
		user.setUserEmail(userEmail);
		user.setUserPass(userPass);
		model.addAttribute("user", service.selectUserInfo(user));
	}

	// 비밀번호 수정 - 버튼
	@RequestMapping("/passUpdate.do")
	public String paddUpdate(User u) {
		System.out.println("passUpdate.do");
		User user = service.selectUserInfoByName(u.getUserEmail());
		if(u.getUserType() == 0) {
			return "redirect:/main.do";
		}
		System.out.println(u.getUserPass());
		user.setUserPass(encoder.encode(u.getUserPass()));
		service.updateUser(user);
		return "redirect:/main.do";
	}
}
