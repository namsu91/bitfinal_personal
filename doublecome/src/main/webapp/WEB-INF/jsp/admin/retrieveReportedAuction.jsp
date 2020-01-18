<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
<link rel="stylesheet"
	href="<c:url value="/resources/css/admin/sideBar.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/admin/content.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/admin/retrieveAuction.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/admin/retrieveReported.css"/>">
</head>

<body>
	<div class="adminPage">
		<div class="adminSideBar">
			<input type="hidden" id="innerIndex" value="5">
			<c:import url="/WEB-INF/jsp/admin/sideBar.jsp" />
		</div>

		<div class="adminContent">
			<div>
				<h2>신고 경매 관리</h2>
			</div>

			<div id="searchBar">
				<form action="" name="searchForm" id="searchForm" data-action="searchAuction.do">
				<input type="hidden" name="type" value="1">
					<table class="dataSearch">
						<tr>
							<td>검색항목</td>
							<td><select name="searchType">
									<option value="auctionNo">경매 번호</option>
									<option value="auctionTitle">경매 제목</option>
									<option value="userEmail">판매자 이메일</option>
							</select> <input type="text" name="keyword" class="searchWord"></input></td>
							<td>입찰가</td>
							<td>
								<p class="labels">원</p> <input name="startPrice" type="text"> <span>~</span>
								<p class="labels">원</p> <input name="endPrice" type="text">
							</td>
						</tr>
						<tr>
							<td>카테고리</td>
							<td colspan="3">
								<div class="categoryBox">
								<div>
									<label for="categoryAll" id="categoryAllLabel">전체</label> <input type="checkbox"
											id="categoryAll" value="">
								</div>
								<c:forEach var="category" items="${categories}" varStatus="st" begin="1">
									<div>
										<label for="category${st.count}">${category.categoryName}</label> <input name="categories" type="checkbox"
											id="category${st.count}" value="${category.categoryCode}">
									</div>								
								</c:forEach>
								</div>
							</td>
						</tr>
						<tr>
							<td>마감날짜</td>
							<td><input type="date" name="startLimitDate" id=""> <span>~</span>
								<input type="date" name="endLimitDate" id=""></td>
							<td>신고 수</td>
							<td>
								<p class="labels">회</p> <input type="text" name="startReportedCnt"> <span>~</span>
								<p class="labels">회</p> <input type="text" name="endReportedCnt">
							</td>	
						</tr>
						<tfoot>
							<tr>
								<td colspan="4">
									<button id="searchBtn" type="button">검색</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</form>
			</div>
			<div class="dataFilters">
			<input type="button" class="removeCheckBtn" value="삭제">
				<div>
					<ul>
						<li data-sort="auctionNo">&#149;경매번호순</li>
						<li data-sort="userEmail">&#149;이메일순</li>
						<li data-sort="bidPrice">&#149;높은 입찰가순</li>
						<li data-sort="auctionLimitDate">&#149;마감날짜순</li>
						<li data-sort="auctionReportedCnt">&#149;높은 신고수순</li>
					</ul>
				</div>
				<div>
					<select>
						<option value="10">10개씩 보기</option>
						<option value="25">25개씩 보기</option>
						<option value="50">50개씩 보기</option>
					</select> <span>검색결과 : </span> <span id="dataCount">10</span> <span>개</span>
				</div>
			</div>






			<table class="dataContent">
				<thead>
					<tr>
						<th><input type="checkbox"></th>
						<th>번호</th>
						<th>제목</th>
						<th>판매자</th>
						<th>입찰가</th>
						<th>카테고리</th>
						<th>마감날짜</th>
						<th>신고수</th>
					</tr>
				</thead>
				<tbody>

				</tbody>
			</table>
			<c:import url="/WEB-INF/jsp/include/pagination.jsp" />
		</div>
	<c:import url="/WEB-INF/jsp/admin/reportModal.jsp" />
	</div>
	<script src="<c:url value="/resources/js/common/timeFormat.js"/>"></script>
	<script src="<c:url value="/resources/js/admin/sideBar.js"/>"></script>
	<script src="<c:url value="/resources/js/admin/retrieveReportedAuction.js"/>"></script>

</body>

</html>