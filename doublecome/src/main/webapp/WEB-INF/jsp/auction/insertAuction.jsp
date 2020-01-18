<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>글작성 페이지</title>
</head>
<link rel="stylesheet"
	href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/auction/bootstrap.min.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/auction/insert.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/auction/swiper.min.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/summernote/summernote.css"/>">
<link rel="stylesheet"
	href="<c:url value="/resources/css/datetimepicker/datetimepicker.css"/>">
<link rel="stylesheet" 
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="https://kit.fontawesome.com/71437d7c9e.js" crossorigin="anonymous"></script>
<body>
	<c:import url="/WEB-INF/jsp/include/header.jsp" />
	<div id="wrapper">
		<div class="contents">
			<form id="insertForm" method="post" enctype="multipart/form-data" action="addAuction.do">
				<div class="formbox">
					<dl class="row">
						<dt class="col-xs-3 menu">제목</dt>
						<dd class="col-xs-9">
							<input type="text" id="auctiontitle" name="auctionTitle" placeholder=" 글 제목을 입력해주세요" />
						</dd>
						<dt class="col-xs-3 menu">카테고리</dt>
						<dd class="col-xs-9">
							<select name="catg" class="category">
							<c:forEach items="${category}" var="cat">
								<option class="selecC" value="${cat.categoryCode}">${cat.categoryName}</option>
							</c:forEach>
							</select>
						</dd>

						<dt class="col-xs-3 menu">입찰 기한</dt>
						<dd class="col-xs-9">
							<div class='input-group date' id='datetimepicker'>
								<input type='text' class="form-control" name="auctionLimitDate" /> 
								<span class="input-group-addon"> 
								<span class="glyphicon glyphicon-calendar"></span>
								</span>
							</div>
						</dd>

						<dt class="col-xs-3 menu">경매 시작가</dt>
						<dd class="col-xs-9 line_height_clean">
							<dl class="row">
								<dd class="col-xs-4 line_clean">
									<p class="won">원</p>
									<input type="text" class="start inputwon" name="auctionMinPrice" />
								</dd>
								<dt class="col-xs-2 menu">즉시 구매가</dt>
								<dd class="col-xs-4">
									<p class="won">원</p>
									<input type="text" class="buy inputwon" name="auctionBuyNow" />
								</dd>
							</dl>
						</dd>
						<dt class="col-xs-3 menu fileUp">파일첨부<i class="glyphicon glyphicon-exclamation-sign fileUpIcon"></i></dt>
						<dd class="col-xs-9 attach">
							<dl class="uploadWrap">
  							<p class="upload_btn"><i class="glyphicon glyphicon-picture uploadPhoto"></i> 사진</p>
							</dl>
						</dd>
						<dt class="col-xs-3 menu fileUp">미리보기</dt>
						<dd class="col-xs-9">
							<div class="img_wrap"></div>
						</dd>
					</dl>
				</div>
				<textarea id="summernote" name="auctionContent" ></textarea> 
				<div class="submit">
					<button type="button" class="button">등록</button>
				</div>
				<input type="hidden" class="catg" name="categoryCode" value="" />
			</form>
		</div>
	
	</div>
		<div class="hoverNotification">
		<div>메인에 등록할 사진을 업로드 해주세요</div>
	</div>	

	<script src="<c:url value="/resources/js/common/jquery-3.4.1.min.js" />"></script>
	<script src="<c:url value="/resources/js/auction/bootstrap.min.js" />"></script>
	<script src="<c:url value="/resources/js/datetimepicker/moment.js" />"></script>
	<script src="<c:url value="/resources/js/datetimepicker/momentlocales.js" />"></script>
	<script src="<c:url value="/resources/js/datetimepicker/localeko.js" />"></script>
	<script src="<c:url value="/resources/js/datetimepicker/datetimepicker.js" />"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
	<script src="<c:url value="/resources/summernote/summernote.js" />"></script>
	<script src="<c:url value="/resources/js/auction/insert.js" />"></script>
	<script src="<c:url value="/resources/js/auction/uploadPhoto.js" />"></script>
	<script src="<c:url value="/resources/js/auction/swiper.min.js" />"></script>
	<c:import url="/WEB-INF/jsp/include/footer.jsp" />

</body>
</html>