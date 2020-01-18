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
	href="<c:url value="/resources/css/admin/retrieveCategory.css"/>">
</head>

<body>
	<div class="adminPage">
		<div class="adminSideBar">
			<input type="hidden" id="innerIndex" value="8">
			<c:import url="/WEB-INF/jsp/admin/sideBar.jsp" />
		</div>

		<div class="adminContent">
			<div>
				<h2>카테고리 항목</h2>
			</div>

			<div class="dataFilters">
				<input type="button" class="removeCategoriesBtn" value="삭제 ">
				<div>
					<ul>
						<li data-sort="categoryCode">&#149;순서순</li>
						<li data-sort="categoryName">&#149;제목순</li>
						<li data-sort="categoryDealCnt">&#149;높은 경매수순</li>
					</ul>
				</div>
				<div>
					<select id="listSize">
						<option value="10">10개씩 보기</option>
						<option value="25">25개씩 보기</option>
						<option value="50">50개씩 보기</option>
					</select> <span>총 개수 : </span> <span id="dataCount">10</span> <span>개</span>
				</div>
			</div>

			<table class="dataContent">
				<thead>
					<tr>
						<th><input type="checkbox"></th>
						<th>카테고리 제목</th>
						<th>카테고리 순서</th>
						<th>노출 여부</th>
						<th>경매 수</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<tr>
					<tr>
						<td style="text-align: center" colspan='5'>검색결과가 없습니다.</td>
					</tr>
				</tbody>
			</table>
			<data id="searchForm" data-action="retrieveCategories.do"> <c:import
				url="/WEB-INF/jsp/include/pagination.jsp" />
			<div class="addCategoryBtn">
				<button>등록</button>
			</div>
		</div>

		<div class="adminModal">
			<div class="adminMoadalBack">
				<div>
					<h2>카테고리 관리</h2>
					<hr style="width: 90%" />
					<form>
						<input type="hidden" name="categoryCode" value="">
						<div>
							<span>카테고리 제목</span> <input name="categoryName" type="text">
						</div>

						<div>
							<span>카테고리 순서</span> <input name="categoryOrder" type="text">
						</div>

						<div>
							<span>노출 여부</span> <input type="radio" value="1" id="showTrue"
								name="categoryDisplay"> <label for="showTrue">노출</label>
							<input type="radio" value="2" id="showFalse"
								name="categoryDisplay"> <label for="showFalse">비노출</label>
						</div>

						<div>
							<button id="eventBtn" type="button">수정</button>
							<button id="cancelBtn" type="button">취소</button>
						</div>
					</form>
				</div>
			</div>
		</div>

	</div>
	<script src="<c:url value="/resources/js/admin/sideBar.js"/>"></script>
	<script src="<c:url value="/resources/js/admin/retrieveCategory.js"/>"></script>

</body>

</html>