
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
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/user/userinfoUpdate.css"/>"> 

</head>
<body>
<header>
	<c:import url="/WEB-INF/jsp/include/header.jsp" />
</header>
<section id="bg">
<div id="pageBox">
		
					  
		
				
<!-- <form id="infoBox" method="post" action="/doublecome/file/photoUpload.do" class="uploader" enctype="multipart/form-data" >
 </form>
 --> <form method="post" action="<c:url value="/user/userUpdate.do"/>" enctype="multipart/form-data" >
	<sec:authorize access="isAuthenticated()">
	<sec:authentication property="principal.user" var="user" />
												  	
<div class="l-constrained">
<!--   <div class="m-box"> -->
      <div class="m-upload js-fileupload">
        <div class="m-upload__preview jst-preview" style="background-image:url(/doublecome/file/downLoadFile.do?fileNo=${user.fileNo});">
          
        </div>
        
        <div class="m-upload__inputs">
          <div class="m-upload__file">
            <input type="file" accept="image/*" name="file" id="ul-button-1">
            
            <label for="ul-button-1">
             
              <span> <i class="far fa-image fa-1x"></i>사진 등록</span>
            </label>
          </div>
          </div>
        </div>
      <!-- </div> -->
   </div>   
         
        
			
	<!-- 버튼 -->
	<button id="updateFormBtn" >수정</button>
	<a id="updateFormCancel" href="<c:url value="/user/userInfo.do"/>">취소</a>
			
			<div id="infoContainer">
	    	<h1 id="userInfoTitle" >회원 정보 수정</h1>
	    	<table id='table'>
	    	<tbody>
	    	<tr>
	    		<th id ='th'>이메일</th>
	    		<td id='td'>
	    		<i class="far fa-envelope fa-1x" id="icon"></i>
				<input id="userEmail" name="userEmail" type="text" value="${user.userEmail}" class="registInput"
						placeholder="${user.userEmail}" readonly/>
						<div id="alert"></div>
	    		</td>
	    	</tr>
	    	<tr>
	    		<th id ='th'>핸드폰 번호</th>
	    		<td id='td'>
	    		 <i class="fas fa-mobile-alt fa-1x" id="icon"></i>
	    		<input id="userPhnum" name="userPhnum" type="text" class="registInput" value="${user.userPhnum}"
	    				placeholder="${user.userPhnum}" />
						<div id="alert"></div>
	    		</td>
	    	</tr>
	    	<tr>
	    		<th id ='th'>별명</th>
	    		<td id='td'>
	    		<i class="fas fa-user fa-1x" id="icon"></i>
	    		<input id="userNickname" name="userNickname" type="text" value="${user.userNickname}" placeholder="${user.userNickname}"  class="registInput">
						<div id="alert"></div>
	    		</td>
	    	</tr>
	    	<c:choose>
	    	<c:when test="${user.userType == 3}">
	    		<input id="userPass" name="userPass" type="hidden" value="" placeholder="비밀번호"  class="registInput">
	    	</c:when>
	    	<c:otherwise>
			<tr>
	    		<th id ='th'>비밀번호</th>
	    		<td id='td'>
	    		<i class="fas fa-unlock-alt fa-1x" id="icon"></i>
	    		<input id="userPass" name="userPass" type="password" value="" placeholder="비밀번호"  class="registInput">
	    		<input id="userPassConfirm" name="userPassConfirm" type="password" placeholder="비밀번호 확인" class="registInput">
				<div id="alert"></div>
	    		</td>
			</tr>
	    	</c:otherwise>
	    	</c:choose>
			
	    	</tbody>
	    	</table>
			</div>
			</sec:authorize>
</form>
		
		
<div id="bidList">
</div>
</div> 
</section>
<footer>
<c:import url="/WEB-INF/jsp/include/footer.jsp" />
</footer>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
	<script src="<c:url value="/resources/js/user/userInfoUpdate.js" />" ></script>
</body>
</html>