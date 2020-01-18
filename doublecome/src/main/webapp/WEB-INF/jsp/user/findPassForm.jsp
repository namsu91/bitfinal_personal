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
    <h2>비밀 번호 재설정</h2>
    <form onsubmit="return nullCheck();" method="post" action="<c:url value="/user/passUpdate.do"/>">
      <input type="hidden" placeholder="이메일" name="userEmail" id="userEmail" value="${param.userEmail}"/>
      <div id="emailCheck" class="alert"></div>
      <input type="password" placeholder="비밀 번호" name="userPass" id="userPass"/>
      <div id="passCheck" class="alert"></div>
      <input type="password" placeholder="비밀번호 확인" name="userPassConfirm" id="userPassConfirm"/>
      <div id="passConfirmCheck" class="alert"></div>
      <button tpye="submit" id="joinBtn">수정</button>
    </form>
  </div>
</div>
	<script src="<c:url value="/resources/js/user/findPassForm.js" />"></script>
</body>
</html>

<!-- 
 -->