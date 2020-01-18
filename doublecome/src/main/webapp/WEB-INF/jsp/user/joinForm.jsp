<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
 response.setHeader("Cache-Control","no-cache");
 response.setHeader("Pragma","no-cache");
 response.setDateHeader("Expires",0);
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
 <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/user/joinform.css"/>"> 

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
    <h2>회원 가입</h2>
    <form onsubmit="return nullCheck();" method="post" action="<c:url value="/user/insert.do"/>">
      <input type="email" placeholder="이메일" name="userEmail" id="userEmail"/>
      <div id="emailCheck" class="alert"></div>
      <input type="password" placeholder="비밀 번호" name="userPass" id="userPass"/>
      <div id="passCheck" class="alert"></div>
      <input type="password" placeholder="비밀번호 확인" name="userPassConfirm" id="userPassConfirm"/>
      <div id="passConfirmCheck" class="alert"></div>
      <input type="tell" placeholder="핸드폰 번호 (- 없이)" name="userPhnum" id="userPhnum"/>
      <div id="phnumCheck" class="alert"></div>
      <input type="text" placeholder="별명" name="userNickname" id="userNickname"/>
      <div id="idCheck" class="alert"></div>
      <input type="hidden" name="userType" value="1" />
      <button tpye="submit" id="joinBtn">가입</button>
    </form>
  </div>
</div>
	<script src="<c:url value="/resources/js/user/joinForm.js" />"></script>
</body>
</html>

<!-- 
	<script src="<c:url value="/resources/js/user/joinForm.js" />"></script>


	<div id="bg">
	<div id="registBox">
		<span id="registTitle">회원 가입</span>
					  
		<form method="post" action="<c:url value="/user/insert.do"/>" class="uploader" enctype="multipart/form-data" >
				
		<span id="pfimgbox"> 
					<input class="uploader__input" id="file-upload" type="file" name="fileGroupCode" accept="image/*" />
					
					<label class="uploader__label" for="file-upload">
						<span class="uploader__wrapper">
							<img class="uploader__file hidden" src="#" alt="">
							<svg class="uploader__svg" xmlns="http://www.w3.org/2000/svg" width="98px" height="90px" viewBox="0 0 98 90">
								<path class="uploader__clipalt" d="M47.559,12.453L9.966,50.05 c0,0-16.188,15.611-0.892,30.908c15.297,15.301,30.995-0.804,30.995-0.804l50.666-50.669c0,0,10.814-10.891-0.268-21.981 c-11.087-11.088-21.97-0.288-21.97-0.288L24.221,51.486c0,0-10.736,8.541-2.432,16.921c8.307,8.384,16.832-2.521,16.832-2.521 l32.535-32.531"/>
							  <path class="uploader__clip" d="M47.559,12.453L9.966,50.05 c0,0-16.188,15.611-0.892,30.908c15.297,15.301,30.995-0.804,30.995-0.804l50.666-50.669c0,0,10.814-10.891-0.268-21.981 c-11.087-11.088-21.97-0.288-21.97-0.288L24.221,51.486c0,0-10.736,8.541-2.432,16.921c8.307,8.384,16.832-2.521,16.832-2.521 l32.535-32.531"/>
							</svg>
						</span>
					</label>
		</span>
	
		
		
		<div id="registInputBox1" class="registInputBox">
				<i class="far fa-envelope fa-3x" id="icon"></i>
				<div id="registInput">
				<input id="registInput" name="userEmail" type="text" placeholder="이메일 ">
				</div>
				<div id="alert"></div>
		</div>
		<div id="registInputBox2" class="registInputBox">
				<i class="fas fa-unlock-alt fa-3x" id="icon"></i>
				<div id="registInput">
				<input id="registInput" name="userPass" type="password" placeholder="비밀번호">
				</div>
				<div id="alert"></div>
				<div id="registInput">
				<input id="registInput" name="userPassConfirm" type="password" placeholder="비밀번호 확인">
				</div>
		</div>
		<div id="registInputBox3" class="registInputBox">
				<i class="fas fa-mobile-alt fa-3x" id="icon"></i>
				<div id="registInput">
				<input id="registInput" name="userPhnum" type="text" placeholder="핸드폰 번호">
				</div>
				<div id="alert"></div>
		</div>
		<div id="registInputBox4" class="registInputBox">
				<i class="fas fa-user fa-3x" id="icon"></i>
				<div id="registInput">
				<input id="registInput" name="userNickname" type="text" placeholder="별명"></div>
				<div id="alert"></div>
		</div>
			<button id="registDoBtn" type="submit">가입</button>
		</form>
		
	</div>
	</div>
 -->