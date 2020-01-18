<%@ page language="java" contentType="text/html; charset=UTF-8"
 pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <!DOCTYPE html>
 <html lang="en">
 <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="X-UA-Compatible" content="ie=edge">
     <title>Document</title>
     <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
     <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common/normalize.css"/>">
 	 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
     <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/user/findEmailPassForm.css"/>"> 
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
	  <div class="toggle"><i class="far fa-envelope fa-1x"></i>
	    <div class="tooltip">Click me</div>
	  </div>
	  <div class="form">
	    <h2>이메일 찾기</h2>
	    <form method="post" action="<c:url value="/user/findEmailPassForm.do" />">
	      <input type="text" placeholder="핸드폰 번호" name="userPhnum"/>
	      <input type="text" placeholder="찾은 이메일 이메일" value="${email}"/>
	      <button>이메일 조회</button>
	    </form>
	  </div>
	  <div class="form">
	    <h2>비밀번호 찾기</h2>
	    <form method="post" action="<c:url value="/mail/findPass.do" />">
	      <input name="email" type="text" placeholder="이메일"/>
	      <button>전송</button>
	    </form>
	  </div>
	 
	</div>
	<script src="<c:url value="/resources/js/user/findEmailPassForm.js" />"></script>
</body>
</body>
</html>