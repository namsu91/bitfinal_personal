
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/user/userinfo.css"/>"> 

</head>
<body>
<header>
	<c:import url="/WEB-INF/jsp/include/header.jsp" />
</header>
<section id="bg">
<div id="pageBox">
		
					  
		
	<sec:authorize access="isAuthenticated()">
	<sec:authentication property="principal.user" var="user" />
<div id="infoBox" method="post" action="/doublecome/user/userInfoUpdate.do" class="uploader" enctype="multipart/form-data">
	<div id="pfimgbox"> 
		<span class="uploader__input" id="file-upload" type="file" name="fileGroupCode" accept="image/*" ></span>
		<div class="uploader__label" for="file-upload">
			<img  src="/doublecome/file/downLoadFile.do?fileNo=${user.fileNo}" alt="">
		</div> 
	</div>
        
			
	<!-- 버튼 -->
	<form method="post" action="<c:url value="/user/userInfoUpdate.do"/>">
	<input type="hidden" value="${user.userEmail}" name="userEmail"/>
	<input type="hidden" value="${user.userPass}" name="userPass"/>
	<button id="updateFormBtn" >개인정보 수정</button>
	</form>
    <form method="post" action="<c:url value="/history/listHistory.do"/>">
   <%--  <input type="hidden" value="${user.userEmail}" name="userEmail"/> --%>
    <button id="historyGoBtn">거래/후기 내역</button>
    </form>
    <form id="d" method="post" action="deleteUser.do">
    <input type="hidden" value="${user.userEmail}" name="userEmail"/>
    <button type="button" id="deleteBtn">회원 탈퇴</button>
    </form>
			
			<div id="infoContainer">
	    	<h1 id="userInfoTitle" >마이 페이지</h1>
	    	<table id='table'>
	    	<tbody>
	    	<tr>
	    		<th id='th'>이메일</th>
	    		<td id='td'>
	    		<i class="far fa-envelope fa-1x" id="icon"></i>
				<span id="email"  >${user.userEmail}</span>
	    		</td>
	    	</tr>
	    	<tr>
	    		<th id='th'>핸드폰 번호</th>
	    		<td id='td'>
	    		 <i class="fas fa-mobile-alt fa-1x" id="icon"></i>
	    		<span id="phnum" >${user.userPhnum}</span>
	    		</td>
	    	</tr>
	    	<tr>
	    		<th id='th'>별명</th>
	    		<td id='td'>
	    		<i class="fas fa-user fa-1x" id="icon"></i>
	    		<span id="nickname"  >${user.userNickname}</span>
	    		</td>
	    	</tr>
	    	<%-- <c:if test="${user.userEmail.length() < 30} "> 
			<tr>
	    		<th id='th'>비밀번호</th>
	    		<td id='td'>
	    		<i class="fas fa-unlock-alt fa-1x" id="icon"></i>
	    		<input id="registInput" class="registInput" name="userPass" type="password" placeholder="비밀번호">
	    		</td>
			</tr>
			</c:if> --%>
	    	</tbody>
	    	</table>
	    	
	    	
			</div>
</div>
		
		
<div id="bidList">
	
</div>
			</sec:authorize>
</div> 
</section>
	<script src="<c:url value="/resources/js/common/timeFormat.js"/>"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
	<script src="<c:url value="/resources/js/user/userInfo.js" />" ></script>
</body>
<footer>
<c:import url="/WEB-INF/jsp/include/footer.jsp" />
</footer>
</html>