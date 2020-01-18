<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Document</title>
<link rel="stylesheet"
	href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/liveauction/bootstrap.min.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/resources/css/liveauction/ekko-lightbox.min.css" />" />
<link rel="stylesheet"
	href="<c:url value="/resources/css/liveauction/kurento.css" /> " />
<link rel="stylesheet"
	href="<c:url value="/resources/css/liveauction/main.css"/>">
<script src="https://cdn.temasys.io/adapterjs/0.15.x/adapter.min.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script
	src="<c:url value="/resources/js/liveauction/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/resources/js/liveauction/ekko-lightbox.min.js"/>"></script>
<script
	src="<c:url value="/resources/js/liveauction/kurento-utils.min.js"/>"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="<c:url value="/resources/js/liveauction/broadcast.js"/>"></script>
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
</head>
<body>
	<div class="content">
		<video class="video" id="video" autoplay controls muted="muted"></video>
		<div class="innerLive">
			<div class="auctionInfo">
			<c:set var="now" value="<%=new java.util.Date()%>" />
				<div class="counter-class"
					data-date="<fmt:formatDate value="${auction.auctionLimitDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
					data-endDate="<fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss"/>">
					<div class="timer-font">
						<span class="counter-days"><i class="fas fa-play"></i></span> 일
					</div>
					<div class="timer-font">
						<span class="counter-hours"></span> 시간
					</div>
					<div class="timer-font">
						<span class="counter-minutes"></span> 분
					</div>
					<div class="timer-font">
						<span class="counter-seconds"></span> 초
					</div>
				</div>
				<div class=maxBid>
					<div>
						<span>최고입찰가</span> <span class="maxBidPrice">${auction.maxPrice}</span>
					</div>
					<c:if test='${type eq "viewer"}'>
						<button id="openModalBtn">입찰하기</button>
					</c:if>
					<%-- 					<c:if test='${type == "presenter"}'>
						<div>
							<span>최고입찰자</span> <span class="maxBidId">${auction.maxPriceId}</span>
						</div>
					</c:if> --%>
				</div>
				<div class=nowBid>
					<div>
						<span>즉시구매가</span> <span>${auction.auctionBuyNow}</span>
					</div>
					<c:if test='${type eq "viewer"}'>
						<button id="sendPurchaseBtn">구매하기</button>
					</c:if>
					<c:if test='${type == "presenter"}'>
						<button id="endBroadCastBtn">방송 종료</button>
					</c:if>
				</div>
			</div>
			<div class="chatSpace"></div>
			<div class="chatInput">
				<textarea name="" id="" cols="30" rows="10"></textarea>
				<button id="sendChatBtn">채팅</button>
			</div>
		</div>
		<div class="bidSpace"></div>
	</div>
	<c:if test='${type eq "viewer"}'>
		<div class="realTModal">
			<div class="realTModalBack">
				<div>
					<div class="mTitle">
						<span>경매 입찰하기</span>
					</div>
					<hr>
					<div class="mContent">
						<div class="mMaxBid">
							<span>최고 입찰가</span> <span class="maxBidPrice">${auction.maxPrice}</span>
						</div>
						<div class="mSuggestBid">
							<span>희망 입찰가</span> <span><input type="text"></span>
							<p class="won">원</p>
						</div>
					</div>
					<hr>
					<div class="mBtns">
						<button id="sendBidBtn">입찰</button>
						<button class="closeModalBtn">취소</button>
					</div>
				</div>
			</div>
		</div>
	</c:if>
	<div class="btns">
		<div>
			<i class="far fa-eye"></i> <span></span>
		</div>
	</div>
	<script>
		let type = '${type}'
		let auctionNo = ${auction.auctionNo}
	</script>
	<script src="<c:url value="/resources/js/auction/loopcounter.js" />"></script>
	<script src="<c:url value="/resources/js/liveauction/chat.js"/>"></script>
	<script src="<c:url value="/resources/js/liveauction/bid.js"/>"></script>
	<script src="<c:url value="/resources/js/liveauction/main.js"/>"></script>
</body>
</html>