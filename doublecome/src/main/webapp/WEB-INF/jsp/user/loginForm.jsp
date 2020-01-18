<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common/normalize.css"/>">
 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
 <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/user/loginform.css"/>">
</head>
<body>


<!-- Form Mixin-->
<!-- Input Mixin-->
<!-- Button Mixin-->
<!-- Pen Title-->
<div class="topContent">

<div class="pen-title">
  <div><a href="<c:url value="/main.do" />">누구나 쉬운 경매!</a></div>
		<div><a class="titleToMain" href="<c:url value="/main.do" />">더블</a></div>
		<div><a class="titleToMain" href="<c:url value="/main.do" />">로와</a></div>
</div>

</div>
<!-- Form Module-->
<div class="module form-module">
  <div >
    <div ></div>
  </div>
  <div class="form">
    <h2>로그인</h2>
    <form action="<c:url value="/user/login.do"/>" method="post">
      <input type="text" placeholder="이메일" name="userEmail" id='userEmail'/>
      <input type="password" placeholder="비밀번호" name="userPass" id='userPass'/>
       <div id="loginCheck" class="alert">${param.failureMSG}</div>
      <button id="loginBtn">로그인</button>
      <a class="rg" href="/doublecome/user/joinForm.do">회원 가입</a>
      <div id="naver_id_login"><a href="${url}">
      <img width="240" src="https://developers.naver.com/doc/review_201802/CK_bEFnWMeEBjXpQ5o8N_20180202_7aot50.png"/>
      </a>
      </div>
     	<a id="custom-login-btn" href="javascript:loginWithKakao()">
		<img src="//mud-kage.kakao.com/14/dn/btqbjxsO6vP/KPiGpdnsubSq3a0PHEGUK1/o.jpg" width="240"/>
		</a>
		
    </form>
  </div>
  
  <div class="cta"><a href="<c:url value="/user/findForm.do" />">아이디/비밀번호 찾기</a></div>
</div>
        
</body>
<script type='text/javascript'>
  
    //<![CDATA[
    // 사용할 앱의 JavaScript 키를 설정해 주세요.
    Kakao.init('4a6f90228eff30166282d77c92a87ee5');
      function loginWithKakao() {
        // 로그인 창을 띄웁니다.
        Kakao.Auth.login({
          success: function(authObj) {
            Kakao.API.request({
            url: '/v1/user/me',
            success: function(res) {
              console.log(JSON.stringify(res)); //<---- kakao.api.request 에서 불러온 결과값 json형태로 출력
              console.log(JSON.stringify(authObj)); //<----Kakao.Auth.createLoginButton에서 불러온 결과값 json형태로 출력
              console.log(res.id, "아이디");//<---- 콘솔 로그에 id 정보 출력(id는 res안에 있기 때문에  res.id 로 불러온다.
              console.log(res.kaccount_email ,"이메일");//<---- 콘솔 로그에 email 정보 출력 (어딨는지 알겠죠?)
              console.log(res.properties['nickname'], "닉네임");//<---- 콘솔 로그에 닉네임 출력(properties에 있는 nickname 접근 
              // res.properties.nickname으로도 접근 가능 )
              console.log(authObj.access_token);//<---- 콘솔 로그에 토큰값 출력
              $.ajax({
                url: "/doublecome/user/kakaoCallback.do",
                data: {email: res.kaccount_email},
                type: "POST",
                success: (result) => {
	                console.log(result)
	                if(res.kaccount_email == null){
	                console.log("res.kaccount_email")
	                alert("사용자 정보를 이용할 수 없어 일반 가입 과정을 진행 합니다")
					location.href='/doublecome/user/joinForm.do';		                	
	                }else{	
		                if(result === 0)
		                location.href='/doublecome/user/joinForm2.do?email='+res.kaccount_email+"&id="+res.id;
		                else if(result === 1)
		                location.href='/doublecome/main.do';
	                }
                	
                }
                
              })
    }

  })

          },
          fail: function(err) {
            console.log(JSON.stringify(err));
          }
        });
      };
  //]]>
</script>
<script src="<c:url value="/resources/js/user/loginForm.js" />"></script>
</html>
