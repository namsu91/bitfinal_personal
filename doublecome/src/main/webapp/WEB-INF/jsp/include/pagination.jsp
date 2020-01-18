<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<script src="<c:url value="/resources/js/common/pagination.js"/>"></script>
<link rel="stylesheet" href="<c:url value="/resources/css/common/pagination.css"/>">

	<div class="pagination">
		<data data-prev="${pr.prev}" data-next="${pr.next}" data-beginPage="${pr.beginPage}" data-endPage="${pr.endPage}" data-pageNo="${pr.pageNo}">
	</div>
