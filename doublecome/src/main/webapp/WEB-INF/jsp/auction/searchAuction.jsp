<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Album</title>
  <script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
 
<!--   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" -->
<!--     type="text/css"> -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
  <script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
  <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/auction/searchsidebar.css" />">
  <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/auction/searchcontent.css" />">
  <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/auction/searchbar.css" />">
  <link href="https://fonts.googleapis.com/css?family=Gothic+A1&display=swap" rel="stylesheet">
</head>

<body>
<c:import url="/WEB-INF/jsp/include/header.jsp" />
  <div id="wrapper">
    <div id="sidebar">
      <div class="category checklist categorylist box-line">
        <h3>카데고리</h3>
        <ul>
        <c:forEach var="category" items="${category}" >
          <li>
       		<i class="fas fa-${category.categoryIcon} category-filter"></i>
          	<a class="category cnkfilter" id="category${category.categoryCode}" 
     		href="<c:url value="/auction/searchActionList.do" />"
          	data-selected="" data-name="categoryCode" data-value="${category.categoryCode}" title="${category.categoryName}">
				${category.categoryName}
          	</a>
          </li>	        
        </c:forEach>
        </ul>
      </div>
      <div class="checklist box-line accordion" id="price_filter">
          <div><h3>가격</h3></div>
          <ul>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="price-filter cnkfilter" data-name="priceChoice" data-selected="" data-value="0-20000" title="2만원 미만">2만원 미만</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="price-filter cnkfilter" data-name="priceChoice" data-selected="" data-value="20000-50000" title="2만원 ~ 5만원">2만원 ~ 5만원</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="price-filter cnkfilter" data-name="priceChoice" data-selected="" data-value="50000-100000" title="5만원 ~ 10만원">5만원 ~ 10만원</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="price-filter cnkfilter" data-name="priceChoice" data-selected="" data-value="100000-200000" title="10만원 ~ 20만원">10만원 ~ 20만원</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="price-filter cnkfilter" data-name="priceChoice" data-selected="" data-value="200000-123123111" title="20만원 이상">20만원 이상</a></li>
            <li>
              <input class="price-filter cnkfilter" data-name="priceChoice" data-value="" id="num1" data-selected="" type="text" numberOnly/> ~
              <input class="price-filter cnkfilter" data-name="priceChoice" data-value="" id="num2" data-selected="" type="text" numberOnly/>
              <a href="<c:url value="/auction/searchActionList.do" />" id="price_choice" class="price-filter" data-name="priceChoice" data-selected="" data-value="priceChoice"></a>
            </li>
          </ul>
      </div>
      <div class="checklist box-line accordion" id="date">
          <div><h3>시간</h3></div>
          <ul>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="time-filter cnkfilter" data-name="limits" data-selected="" data-value="1" title="오늘까지">오늘까지</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="time-filter cnkfilter" data-name="limits" data-selected="" data-value="2" title="내일까지">내일까지 </a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="time-filter cnkfilter" data-name="limits" data-selected="" data-value="3" title="3일 이상" >3일 이상 </a></li>
          </ul>
      </div>
      <div class="checklist box-line accordion" id="bidcount">
          <div><h3>입찰</h3></div>
          <ul>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="bid-filter cnkfilter" data-name="bidCount" data-selected="" data-value="3-777777" title="3건이상">3건 이상</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="bid-filter cnkfilter" data-name="bidCount" data-selected="" data-value="5-777777" title="5건이상">5건 이상</a></li>
            <li><a href="<c:url value="/auction/searchActionList.do" />" class="bid-filter cnkfilter" data-name="bidCount" data-selected="" data-value="10-777777" title="10건이상">10건 이상</a></li>
          </ul>
      </div>
    </div>
    
    <div class="layout-right">
      <div class="py-4 bg-light" id="content">
      	<div class="option_selectbar" id="selectbar">
      		<a id="resetfilter" href="" class="clear">
      			<span class="option-clean"></span>
      			전체해제
      		</a>
      		<span class="bar">|</span>
      	</div>
        <div class="container w-75">
          <div class="row">
            <div class="col-md-12" style="">
              <div class="card-body" style="">
                <h5 class="card-title m-0" style="	text-shadow: 0px 0px 1px black;">Best Auction</h5>
               	<div class="sort_area">
		      		<ul class="sort_list" id="sort_list">
						<li><a class="order" href="<c:url value="/auction/searchActionList.do" />" data-selected="" data-name="sorts" data-value="minPrice" title="낮은 가격순"><span></span>낮은 가격순</a></li>
						<li><a class="order" href="<c:url value="/auction/searchActionList.do" />" data-selected="" data-name="sorts" data-value="maxPrice" title="높은 가격순"><span></span>높은 가격순</a></li>
						<li><a class="order" href="<c:url value="/auction/searchActionList.do" />" data-selected="" data-name="sorts" data-value="regDate" title="등록일순"><span></span>등록일순</a></li>
						<li><a class="order" href="<c:url value="/auction/searchActionList.do" />" data-selected="" data-name="sorts" data-value="bidCnt" title="입찰 많은순"><span></span>입찰횟수순</a></li>
					</ul>
					<span class="view_count">
						<select id="view" name="listSize">
							<option selected="selected" value="12">12개씩 보기</option>
							<option value="24">24개씩 보기</option>
							<option value="48">48개씩 보기</option>
						</select>
					</span>
		      	</div>
              </div>
            </div>
          </div>
        </div>
        <div class="container w-75">
          <div class="row" id="list_view">
       		<c:choose>
					<c:when test="${empty auctionlist}">
						<div class="col-md-12">
							<div class="card-body" >
								<h5 class="card-title m-0" style="text-shadow: 0px 0px 1px black;">
								등록되어있는 경매가 존재하지 않습니다.</h5>
							</div>
						</div>
					</c:when>
					<c:otherwise>
						<c:forEach items="${auctionlist}" var="list">
							<div class="col-md-4 p-2" >
								<a class="auction_list" href="<c:url value="/auction/detailAuction.do?no=${list.auctionNo}&userEmail=${list.userEmail}" />">
									<div class="card box-shadow">
										<img class="card-img-top w-100" style="height: 250px;"
										src="<c:url value="/file/downLoadFile.do?fileNo=${list.fileNo}" />">
										<p class="mb-1 m-1">${list.auctionTitle}</p>
										<c:choose>
											<c:when test="${empty list.maxPrice}">
												<p class="card-text m-1"><fmt:formatNumber value="${list.auctionMinPrice}" pattern="#,###"/>원</p>											
											</c:when>
											<c:otherwise>
												<p class="card-text m-1"><fmt:formatNumber value="${list.maxPrice}" pattern="#,###"/>원</p>		
											</c:otherwise>
										</c:choose>
										<div class="auction-condition">
											<span class="text-left">입찰 ${list.bidCnt}건</span>
											<small id="auction${list.auctionNo}" class="countdown text-muted m-1"></small>
											<script>
											$(() => {
												auctionCount($("#auction${list.auctionNo}"), new Date(${list.auctionLimitDate.time}))
											})	
											</script>
										</div>
									</div>
								</a>
							</div>
						</c:forEach>
					</c:otherwise>
				</c:choose>
				</div>
            </div>
			<c:import url="/WEB-INF/jsp/include/pagination.jsp" />
          </div>
        </div>
      </div>
 <c:import url="/WEB-INF/jsp/include/footer.jsp" />
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="<c:url value="/resources/js/common/countdown.js" />"></script>
  <script>
    $("input:text[numberOnly]").on("keyup", function() {
      $(this).val($(this).val().replace(/[^0-9]/g,""));
  });
  </script>
  <script src="<c:url value="/resources/js/auction/searchauction.js" />"></script>
  <script>
	  $(document).ready(e => {
		  let searchKeyWord = `${searchKeyWord}`;
		  if (searchKeyWord != "") {
			  $("#selectbar").append(
				`<a href="/doublecome/auction/searchActionList.do" 
					data-name="searchKeyWord" 
					data-value=${searchKeyWord}
					class="options selected searchKeyWord "
					data-selected="true">
					${searchKeyWord}
						<span class="del"></span>
				</a>
			`)
		  }
	  let cateCode = `${selectCategory}`
	  if (cateCode != "") {
		$("#selectbar").append(
			`<a href="/doublecome/auction/searchActionList.do" 
			data-name="categoryCode" 
			data-value="${selectCategory.categoryCode}" 
			class="options selected category "
			data-selected="true">
			${selectCategory.categoryName}
				<span class="del"></span>
			</a>
			`
		)
		let loadchk = $(".category");
		let optiondata = $(".options");
		for(let value of loadchk) {
			for (let optionval of optiondata) {
				if (value.dataset.value == optionval.dataset.value) {
					$(value).addClass("selected")	
					$(value).prev().addClass("selected")
					if ($(value).attr("class").startsWith("options ")) {
						$(value).prev().removeClass("selected")
					}
				}
			}
		}
	  } 
	})
  </script>
  <script src="<c:url value="/resources/js/auction/accordion.js" />"></script>
</body>

</html>