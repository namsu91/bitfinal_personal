<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div class="adminSideItem">
	<div class="moveItem" data-action="basic.do">
		<i class="fas fa-info-circle"></i>
		<p>기본 정보</p>
	</div>
</div>

<div class="adminSideItem">
	<div class="parentItem">
		<i class="fas fa-user"></i>
		<p>회원 관리</p>
		<i class="fas fa-chevron-right"></i>
	</div>
	<div class="moveItem" data-action="retrieveUser.do">
		<p>전체 회원 조회</p>
	</div>
	<div class="moveItem" data-action="retrieveReportedUser.do">
		<p>신고 회원 관리</p>
	</div>
	<div class="moveItem" data-action="retrieveUserStatistics.do">
		<p>회원 통계</p>
	</div>
</div>

<div class="adminSideItem">
	<div class="parentItem">
		<i class="fas fa-stamp"></i>
		<p>경매 관리</p>
		<i class="fas fa-chevron-right"></i>
	</div>
	<div class="moveItem" data-action="retrieveAuction.do">
		<p>전체 경매 조회</p>
	</div>
	<div class="moveItem" data-action="retrieveReportedAuction.do">
		<p>신고 경매 관리</p>
	</div>
	<div class="moveItem" data-action="retrieveAuctionStatistics.do">
		<p>경매 통계</p>
	</div>
</div>

<div class="adminSideItem">
	<div class="parentItem">
		<i class="fas fa-handshake"></i>
		<p>거래 관리</p>
		<i class="fas fa-chevron-right"></i>
	</div>
	<div class="moveItem" data-action="retrieveDeal.do">
		<p>전체 거래 조회</p>
	</div>
</div>

<div class="adminSideItem">
	<div class="parentItem">
		<i class="fas fa-newspaper"></i>
		<p>항목 관리</p>
		<i class="fas fa-chevron-right"></i>
	</div>
	<div class="moveItem" data-action="retrieveCategory.do">
		<p>카테고리 항목 관리</p>
	</div>
	<div class="moveItem" data-action="retrieveReport.do">
		<p>신고 항목 관리</p>
	</div>
</div>
