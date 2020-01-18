<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
   <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,100,500,700' rel='stylesheet' type='text/css'>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/common/header.css" />">
   <link href="https://fonts.googleapis.com/css?family=Gothic+A1&display=swap" rel="stylesheet">
   <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
   <link href="https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap" rel="stylesheet">
<div class="topbar">
	<sec:authorize access="isAnonymous()">
		<div>
			<span><a href="<c:url value="/user/loginForm.do" />">로그인</a></span>
			<span><a href="<c:url value="/user/joinForm.do" />">회원가입</a></span>
		</div>
	</sec:authorize>

		<!--인증이 됐을 때  -->
	<sec:authorize access="isAuthenticated()">
		<sec:authentication property="principal.user" var="u" />
			<div>
				<span class="readsCount" readsCount=0 data-id="${u.userEmail}">
					<a href="javascript:popupOpen('<c:url value="/chatting/messenger.do?email=${u.userEmail}"/>')"><i class="far fa-comment-dots"></i>메세지</a>
				</span>
				<span>${u.userEmail}</span>
				<span><a href="<c:url value="/user/logout.do" />">로그아웃</a></span>
			</div>
	</sec:authorize>
</div>
<div class="topContent">
	<div id="movetomain">
		<div style="text-shadow: 0px 0px 1px black;">누구나 쉬	운 경매!</div>
		<div style="text-shadow: 0px 0px 0.5px black;">더블</div>
		<div style="text-shadow: 0px 0px 0.5px black;">로와</div>
	</div>
	<div>
		<div>
			<input class="searchField" type="text" placeholder="경매를 검색하세요."> 
			<i id="search_btn" class="fas fa-search"></i>
		</div>
	</div>
	<div>
		<div class="user_mypage">
			<a href="<c:url value="/user/userInfo.do" />">
				<i class="far fa-user"></i>
				<div>마이페이지</div>
			</a>
		</div>
		<div class="auction_write">
			<a href="<c:url value="/auction/insertAuction.do" />">
				<i class="fas fa-pencil-alt"></i>
				<div>경매등록</div>
			</a>
		</div>
	</div>
	<div>
		<div class="all_category" >
			<i class="fas fa-bars category-filter"></i>
			<a href="<c:url value="/auction/searchAuction.do?categoryCode=0&categoryName=전체" />"></a>
			전체 카테고리	
		</div>
		<div class="categoryBar">
			<ul>
				<c:forEach var="category" items="${category}" >
		          <li>
		       		<i class="fas fa-${category.categoryIcon} category-filter"></i>
		          	<a class="category cnkfilter" id="category${category.categoryCode}" 
		     		href="<c:url value="/auction/searchAuction.do?categoryCode=${category.categoryCode}&categoryName=${category.categoryName}" />"
		          	data-selected="" data-name="categoryCode" data-value="${category.categoryCode}" title="${category.categoryName}">
						${category.categoryName}
		          	</a>
		          </li>	        
	        	</c:forEach>
			</ul>
		</div>
		<div class="category_displayOn">
			<ul>
				<c:forEach var="category" items="${category}" >
				  <c:if test="${category.categoryDisplay == 1}">
			          <li>
			          	<a class="category cnkfilter" id="category${category.categoryCode}" 
			     		href="<c:url value="/auction/searchAuction.do?categoryCode=${category.categoryCode}&categoryName=${category.categoryName}" />"
			          	data-selected="" data-name="categoryCode" data-value="${category.categoryCode}" title="${category.categoryName}">
							${category.categoryName}
			          	</a>
			          </li>	        
				  </c:if>
	        	</c:forEach>
			</ul>
		</div>
	</div>
</div>
<hr id="bdhr" />


<script>
	function popupOpen(url){
		let popOption = "width=820, height=620, resizable=no, scrollbars=no, status=no;";    //팝업창 옵션(optoin)
		window.open(url,"",popOption);
	}
</script>

<script src="<c:url value="/resources/js/common/header.js" />"></script>

