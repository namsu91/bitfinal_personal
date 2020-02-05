<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ page import="java.text.SimpleDateFormat"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<div id="top">
		<div id="slide">

			<div class="swiper-container gallery-top">
				<div class="swiper-wrapper">
					<c:forEach items="${file}" var="f">
						<div class="swiper-slide"
							style="background-image: url('<c:url value="/file/downLoadFile.do?fileNo=${f.fileNo}" />')"></div>
					</c:forEach>
				</div>
				<div class="swiper-button-next swiper-button-white"
					style="position: absolute; color: black; right: -51px;"></div>
				<div class="swiper-button-prev swiper-button-white"
					style="position: absolute; color: black; left: -51px;"></div>
				<div class="swiper-container gallery-thumbs">
					<div class="swiper-wrapper">
						<c:forEach items="${file}" var="f">
							<div class="swiper-slide"
								style="background-image: url('<c:url value="/file/downLoadFile.do?fileNo=${f.fileNo}" />')">
							</div>
						</c:forEach>
					</div>
				</div>
			</div>

		</div>
		<div class="l-sub" id="l-sub">
			<div class="sidebar" id="sidebar">
				<div class="ProductInformation">
					<ul class="ProductInformation__items">
						<li class="ProductInformation__item">
							<div class="Count">
								<ul class="Count__counts">
									<li class="Count__count">
										<dl class="Count_top">
											<dt class="Count__title">입찰인원</dt>
											<dd class="Count__number">
												<span id="now_bid">${auction.bidCnt}</span> 명입찰
											</dd>
										</dl>
									</li>
									<li class="Count__count Count__count--sideLine">
										<dl class="Count_top2">
											<dt class="Count__title">남은시간</dt>
											<dd class="Count__number">
												<div class="middle">
													<div class="inner">
													<c:set var="now" value="<%=new java.util.Date()%>" />
														<div class="counter-class"
															data-date="<fmt:formatDate value="${auction.auctionLimitDate}" pattern="yyyy-MM-dd HH:mm:ss"/>"
															data-now="<fmt:formatDate value="${now}" pattern="yyyy-MM-dd HH:mm:ss"/>">
															<div class="timer-font">
																<span class="counter-days"></span> 일
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
													</div>
												</div>
												<span class="Count__unit"></span>
											</dd>
										</dl>
									</li>
								</ul>
							</div>
						</li>


						<li class="ProductInformation__item js-stickyNavigation-start">



							<div class="Price Price--current">
								<div class="PriceUse is-hide">
									<div class="CouponPh2 is-hide"></div>
								</div>
								<dl class="Price__body">
									<dt class="Price__title">현재 최고가</dt>
									<dd class="Price__value">
										<span class="nowprice"> <c:choose>
												<c:when test="${auction.maxPrice eq 0}">
											${auction.auctionMinPrice}
											</c:when>
												<c:otherwise>
											${auction.maxPrice}
											</c:otherwise>
											</c:choose>
										</span><span>원</span>
									</dd>
								</dl>
								<sec:authorize access="isAnonymous()">
									<div class="Price__buttonArea">
										<a href="#"
											class="Button Button--bid js-modal-show rapidnofollow notLogin"
											rel="nofollow" data-modal-name="error"
											data-ylk="rsec:bds;pos:1" data-rapid_p="7">입 찰 하 기</a>
									</div>
								</sec:authorize>
								<sec:authorize access="isAuthenticated()">
									<div class="Price__buttonArea">
										<a href="#normalModal"
											class="Button Button--bid js-modal-show rapidnofollow loginAlready Mine"
											rel="nofollow" data-modal-name="error"
											data-ylk="rsec:bds;pos:1" data-rapid_p="7"
											data-toggle="modal">입 찰 하 기</a>
									</div>
								</sec:authorize>
							</div>
							<div class="Price Price--buynow">
								<div class="PriceUse is-hide"></div>
								<dl class="Price__body ">
									<dt class="Price__title">즉시 구매가</dt>
									<dd class="Price__value">
										<span class="buyprice">${auction.auctionBuyNow}</span><span>원</span>
									</dd>
								</dl>
								<sec:authorize access="isAnonymous()">
									<div class="Price__buttonArea">
										<a href="#"
											class="Button Button--buynow js-modal-show rapidnofollow notLogin Mine"
											rel="nofollow" data-modal-name="error"
											data-ylk="rsec:byitnw;pos:1" data-rapid_p="9">즉시 구매하기</a>

									</div>
								</sec:authorize>
								<sec:authorize access="isAuthenticated()">
									<div class="Price__buttonArea">
										<a href="#"
											class="Button Button--buynow js-modal-show rapidnofollow loginAlreadyBuyNow Mine"
											rel="nofollow" data-modal-name="error"
											data-ylk="rsec:byitnw;pos:1" data-rapid_p="9">즉시 구매하기</a>
									</div>
								</sec:authorize>
								<div id="auc_detail_ymobile_pc"></div>
							</div>
						</li>


						<li class="ProductInformation__item side_seller_info">
							<dl class="Seller">
								<dt class="Seller__title sellerInfo">
									<p class="Seller__titleText">판매자 정보</p>
								</dt>
								<dl class="Seller__card">
									<p>
										닉네임 : <span>${user.userNickname}</span>
									</p>
								</dl>
								<dd class="Seller__subCard cvr273">
									<!--<a href="#" class="Seller__followButton">フォロー</a>-->
									<dl class="Seller__rating">
										<dd class="Seller__ratingTitle">
											거래횟수：<span class="Seller__ratingSum">${user.sellCnt}</span> 회
										</dd>
										<dd class="Seller__ratingCount">
											<span class="Seller__ratingGood">평가점수 : <span>${user.userScore}</span>점
											</span>
											<div>
												(<span>${user.userReviewCnt}</span>회)
											</div>
										</dd>
									</dl>
								</dd>
							</dl>
						</li>

					</ul>
				</div>
			</div>
		</div>
	</div>

	<div id="normalModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-hidden="true">&times;</button>
					<h4 class="modal-title">경매 입찰하기</h4>
				</div>
				<table>
					<thead>
						<tr>
							<th scope="col">순위</th>
							<th scope="col">닉네임</th>
							<th scope="col">입찰가</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${bid}" var="b" varStatus="i">
							<tr class="bidListRank">
								<td>${i.count}</td>
								<td>${b.userNickname}</td>
								<td class="bidPriceRank">${b.bidPrice}</td>
							</tr>
						</c:forEach>
					</tbody>
				</table>
				<div class="modal-body">
					<dl class="row modalBody">
						<dd class="col-xs-6">
							<p>현재 최고가</p>
						</dd>
						<dd class="col-xs-6">
							<p class="nowMax">
								<c:choose>
									<c:when test="${auction.maxPrice eq 0}">
						${auction.auctionMinPrice}
						</c:when>
									<c:otherwise>
						${auction.maxPrice}
						</c:otherwise>
								</c:choose>
								<span> 원</span>
							</p>
						</dd>

					</dl>
					<form id="bidForm" method="POST" action="addBid.do">
						<div>
							<dl class="row modalBody">
								<dd class="col-xs-6">
									<p>입찰희망가</p>
								</dd>
								<dd class="col-xs-6 line_clean">
									<p class="won">원</p>
									<input type="text" class="start inputwon" name="bidPrice" /> <input
										type="hidden" name="auctionNo" value="${auction.auctionNo}">
									<input type="hidden" name="userEmail"
										value="${auction.userEmail}"> <input type="hidden"
										name="auctionBuyNow" class="auctionBuyNow"
										value="${auction.auctionBuyNow}">
								</dd>
							</dl>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
					<button type="button" class="btn bidModalBtn">입찰하기</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal">

		<div id="carousel-example" class="carousel slide">
			<div class="carousel-inner">
				<c:forEach items="${file}" var="f">
					<div class="item">
					<button type="button" class="tagCancel">닫기</button>
						<div class="imgtempWrapper">
							<div class="imgWrapper">
								<a href="#" class="imgTag"><img class="tagImg"
									src="<c:url value="/file/downLoadFile.do?fileNo=${f.fileNo}" />"></a>
								<c:forEach items="${tag}" var="t">
								<c:if test="${f.fileNo eq t.fileNo}">
								<div class="tagTextBox" style="top: ${t.tagYCor}%; left: ${t.tagXCor}%;">
									${t.tagContent}
								</div>
								</c:if>
								</c:forEach>
							</div>
						</div>
					</div>
				</c:forEach>
			</div>
			<a class="left carousel-control" href="#carousel-example"
				data-slide="prev"> <span
				class="glyphicon glyphicon-chevron-left"></span>
			</a> <a class="right carousel-control" href="#carousel-example"
				data-slide="next"> <span
				class="glyphicon glyphicon-chevron-right"></span>
			</a>
		</div>
	</div>

</body>
</html>