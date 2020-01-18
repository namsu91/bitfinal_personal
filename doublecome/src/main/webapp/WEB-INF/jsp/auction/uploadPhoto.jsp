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
	href="<c:url value="/resources/css/auction/uploadPhoto.css"/>">

<body>
	<div class="box">
		<div class="modal">
			<div class="sidebar">
				<div class="sidebarContent">
					<button class="tagCancel" type="button" >취소</button>
					<button class="tagComplete" type="button" >완료</button>
				</div>
			</div>
		</div>
		<div class="wrapper">
			<header>
				<div class="topContent">
					<input style="display: none;" type="file" id="upload" name="attach"
						multiple /> <label for="upload" class="upload_btn"><span
						class="glyphicon glyphicon-picture"></span> 사진</label>

					<div class="submit">
						<button type="button" id="attachBtn" class="button">첨부하기</button>
					</div>
				</div>
			</header>
			<div class="contents">
				<ul class="npu_image_list _list _list-list npu_cols_6 j-selectable">

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap">
						</div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>
					
					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>
					
					<li class="npu_image_item _npu_image_item_blank">
						<div class="npu_image_list_thumb_wrap"></div>
					</li>

				</ul>

			</div>
		</div>
	</div>


	<script
		src="<c:url value="/resources/js/common/jquery-3.4.1.min.js" />"></script>
	<script src="<c:url value="/resources/js/auction/bootstrap.min.js" />"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
	<script src="<c:url value="/resources/js/auction/uploadPhoto.js" />"></script>

</body>
</html>