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
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
<link rel="stylesheet" href="<c:url value="/resources/css/admin/sideBar.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/admin/content.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/admin/retrieveReported.css"/>">
</head>

<body>
	<div class="adminPage">

		<div class="adminSideBar">
			<input type="hidden" id="innerIndex" value="2">
			<c:import url="/WEB-INF/jsp/admin/sideBar.jsp" />
		</div>


		<div class="adminContent">
			<div>
				<h2>신고 회원 관리</h2>
			</div>

			<div id="searchBar">
				<form action="" id="searchForm" data-action="searchUser.do">
				<input type="hidden" name="type" value="1">
					<table class="dataSearch">
						<tr>
							<td>검색항목</td>
							<td><select name="searchType">
									<option value="userEmail">이메일</option>
									<option value="userNickname">닉네임</option>
									<option value="userPhnum">전화번호</option>
							</select> <input type="text" name="keyword" class="searchWord"></input></td>
							<td>신고수</td>
							<td>
								<p class="labels">회</p> <input type="text" name="startReportedCnt"> <span>~</span>
								<p class="labels">회</p> <input type="text" name="endReportedCnt">
							</td>
						</tr>
						<tr>
							<td>평점</td>
							<td>
								<p class="labels">점</p> <input type="text" name="startScore"> <span>~</span>
								<p class="labels">점</p> <input type="text" name="endScore">
							</td>
							<td>후기수</td>
							<td>
								<p class="labels">회</p> <input type="text" name="startReviewCnt"> <span>~</span>
								<p class="labels">회</p> <input type="text" name="endReviewCnt">
							</td>
						</tr>
						<tfoot>
							<tr>
								<td colspan="4">
									<button type="button" id="searchBtn">검색</button>
								</td>
							</tr>
						</tfoot>
					</table>
				</form>
			</div>
			
			
			<div class="dataFilters">
				<input type="button" class="removeCheckBtn" value="탈퇴">
				<div>
					<ul>
						<li data-sort="userEmail">&#149;아이디순</li>
						<li data-sort="userNickname">&#149;닉네임순</li>
						<li data-sort="userReportedCnt">&#149;높은 신고수순</li>
						<li data-sort="userReviewCnt">&#149;높은 후기수순</li>
					</ul>
				</div>
				<div>
					<select id="listSize">
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
						<th>이메일</th>
						<th>닉네임</th>
						<th>전화번호</th>
						<th>신고 개수</th>
						<th>평점</th>
						<th>후기 개수</th>
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
	<script src="<c:url value="/resources/js/admin/retrieveReportedUser.js"/>"></script>
</body>

</html>