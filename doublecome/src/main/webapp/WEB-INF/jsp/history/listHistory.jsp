<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet"
	href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/auction/bootstrap.min.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/summernote/summernote.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/history/listHistory.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/common/pagination.css"/>">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
<link rel="stylesheet"
	href="<c:url value="/resources/css/history/buttonList.css"/>">
</head>
<body>
<%  
response.setHeader("Cache-Control","no-store");  
response.setHeader("Pragma","no-cache");  
response.setDateHeader("Expires",0);  
if (request.getProtocol().equals("HTTP/1.1"))
        response.setHeader("Cache-Control", "no-cache");
%>
	<c:import url="/WEB-INF/jsp/include/header.jsp" />
	<div id="historyContent">
		<div id="myInfo">
			<div id="myDeal">MY거래</div>
			<div data-location="purchaseHead" id="purchaseDeal">
				<span>구매내역</span>
				<span>${userHistory.buyCnt}</span> <span>개</span>
			</div>
			<div data-location="salesHead" id="salesDeal">
				<span>판매내역</span>
				<span>${userHistory.sellCnt}</span> <span>개</span>
			</div>
			<div data-location="reviewHead" id="reviewDeal">
				<span>받은후기</span>
				<span>${userHistory.userReviewCnt}</span> <span>개</span>
			</div>
		</div>
		<!-- 
		<div>
			<ul id="navBar">
				<li><a data-location="purchaseHead" class="navList navChoice">구매내역</a></li>
				<li><a data-location="salesHead" class="navList">판매내역</a></li>
				<li><a data-location="reviewHead" class="navList">후기</a></li>
			</ul>
		</div>
		 -->
		 <div id = moveButton>
		<div id="toTheTop"><i class="fas fa-sort-up fa-3x"></i></div>
		<div id="toTheBottom"><i class="fas fa-sort-down fa-3x"></i></div>
		 </div>
		<div id="innerContent">
			<div>
			</div>
			<div>
				<div id="purchaseHead">구매내역</div>
				<ul class="tabHead">
					<li><span data-type="auctionBid" class="purchaseTabList tabChoice">입찰</span></li>
					<li><span data-type="dealProgress" class="purchaseTabList">낙찰(거래 중)</span></li>
					<li><span data-type="dealComplete" class="purchaseTabList">낙찰(거래 완료)</span></li>
					<li><span data-type="dealCancle" class="purchaseTabList">신고/취소 거래</span></li>
				</ul>
				<div id="purchaseAjax"></div>
			</div>
			<div>
				<div id="salesHead">판매내역</div>
				<ul class="tabHead">
					<li><span data-type="auctionBid" class="salesTabList tabChoice">등록상품(판매 중)</span></li>
					<li><span data-type="dealProgress" class="salesTabList">등록상품(거래 중)</span></li>
					<li><span data-type="dealComplete" class="salesTabList">판매 완료</span></li>
					<li><span data-type="auctionFail" class="salesTabList">유찰</span></li>
					<li><span data-type="dealCancle" class="salesTabList">신고/취소 거래</span></li>
				</ul>
				<div id="salesAjax"></div>
			</div>
			<div>
				<div id="reviewHead">후기</div>
				<ul class="tabHead">
					<li><span class="reviewTabList tabChoice"
						data-name="ReceiveReview">받은 후기</span></li>
					<li><span class="reviewTabList" data-name="SendReview">작성
							후기</span></li>
				</ul>
				<div data-name="ReceiveReview" class="ReceiveReview sortFind">
					<div class="sortType">
						<div>
							<ul>
								<li class="sortTypeTab sortTypeChoice" data-sort="recency">•최신순</li>
								<li class="sortTypeTab" data-sort="highGrade">•높은평점순</li>
								<li class="sortTypeTab" data-sort="lowGrade">•낮은평점순</li>
							</ul>
						</div>
					</div>
					<div id="reviewCon">
						<ul>
						</ul>
					</div>
				</div>
				<div data-name="SendReview" class="SendReview sortFind">
					<div class="sortType">
						<div>
							<ul>
								<li class="sortTypeTab sortTypeChoice" data-sort="recency">•최신순</li>
								<li class="sortTypeTab" data-sort="highGrade">•높은평점순</li>
								<li class="sortTypeTab" data-sort="lowGrade">•낮은평점순</li>
							</ul>
						</div>
					</div>
					<div id="reviewCon">
						<ul>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div id="addReviewModal" class="reviewModal">
			<div class="reviewModalContent">
				<span class="reviewModalClose">&times;</span>
				<div class="addReviewContent" data-value="헤이">
					<div id="reviewForm">
						<form action="" id="rform" method="post">
							<div class="auctionTitleDiv">
								<div>경매글</div>
								<div id="auctionTitle"></div>
							</div>
							<div class="scoreDiv">
								<div class="scoreLibel">신뢰도</div>
								<div class="scoreCon">
									<input type="hidden" name = "reviewScore" value="" />
									<c:forEach var="r" begin="1" end="10">
									<span class="scoreSpan">
										<label class="scoreLabel" id="reviewScore${r}" for="reviewScore${r}" data-no="${r}" >
										<i class='fas fa-star regitStar'></i>${r}
										</label>
									</span>
									</c:forEach>
								</div>
							</div>
							<div class="reviewTitleDiv">
								<div>한줄요약</div>
								<div>
									<input type="text" name="reviewTitle" />
								</div>
							</div>
							<div class="reviewCondiv">
								<div>구매후기</div>
								<div>
									<textarea id="summernote" name="reviewContent"></textarea>
								</div>
							</div>
							<input id="reviewReceiver" type="hidden" name="reviewReceiver" value=""/>
							<input id="auctionNo" type="hidden" name="auctionNo" value="0"/>
							<input id="reviewNo" type="hidden" name="reviewNo" value="0"/>
							<div class="regitbtn">
								<button type="button"></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<c:import url="/WEB-INF/jsp/include/footer.jsp" />
		<c:import url="/WEB-INF/jsp/include/addReportModal.jsp" />
	</div>
	<script src="<c:url value="/resources/js/common/pagination.js"/>"></script>
	<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
	<script src="<c:url value="/resources/js/common/jquery-3.4.1.min.js" />"></script>
	<script src="<c:url value="/resources/js/auction/bootstrap.min.js" />"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
	<script src="<c:url value="/resources/summernote/summernote.js" />"></script>
	<script src="<c:url value="/resources/js/common/timeFormat.js"/>"></script>
	<script src="<c:url value="/resources/js/history/reviewHistory.js"/>"></script>
	<script src="<c:url value="/resources/js/history/purchaseHistory.js"/>"></script>
	<script src="<c:url value="/resources/js/history/sailesHistory.js"/>"></script>
</body>
</html>