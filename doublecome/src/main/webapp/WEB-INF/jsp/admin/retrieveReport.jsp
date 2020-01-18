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
	href="<c:url value="/resources/css/admin/retrieveReport.css"/>">
</head>

<body>
	<div class="adminPage">
		<div class="adminSideBar">
			<input type="hidden" id="innerIndex" value="9">
			<c:import url="/WEB-INF/jsp/admin/sideBar.jsp" />
		</div>

		<div class="adminContent">
			<div>
				<h2>신고 항목</h2>
			</div>
		
			<div class="dataFilters">
				<input type="button" class="removeReportTypesBtn" value="삭제 ">
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
						<th>신고항목 내용</th>
						<th>신고항목 순서</th>
						<th>신고 수</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
			</table>
			<data id="searchForm" data-action="retrieveReportTypes.do"> <c:import
				url="/WEB-INF/jsp/include/pagination.jsp" />
			<div class="addReportBtn">
				<button>등록</button>
			</div>




		</div>

		<div class="adminModal">
			<div class="adminModalBack">
				<div>
					<h2>신고항목 관리</h2>
					<hr style="width: 90%" />
					<form>
						<input type="hidden" name="reportTypeCode" value="">
						<div>
							<span>신고항목 제목</span> <input name="reportTypeName" type="text">
						</div>

						<div>
							<span>신고항목 순서</span> <input name="reportTypeOrder" type="text">
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
	<script src="<c:url value="/resources/js/admin/retrieveReport.js"/>"></script>

</body>

</html>