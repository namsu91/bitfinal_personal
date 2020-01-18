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
<link rel="stylesheet" href="<c:url value="/resources/css/common/normalize.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/admin/sideBar.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/admin/content.css"/>">
<link rel="stylesheet" href="<c:url value="/resources/css/admin/basic.css"/>">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.css"/>
<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>
</head>

<body>
	<div class="adminPage">

		<div class="adminSideBar">
			<input type="hidden" id="innerIndex" value="0">
			<c:import url="/WEB-INF/jsp/admin/sideBar.jsp" />
		</div>


		<div class="adminContent">
			<div>
				<h2>기본정보</h2>
			</div>
			
			<div class="infos">
                <div>
                    <div>
                        <p><i class="fas fa-user"></i> 회원 정보</p>
                        <div>
                            <div>
                                <span>전체 회원수 </span>  <span class="data">1</span> <span>명</span>
                            </div>
                            <div>
                                <span>신고된 회원수 </span>  <span class="data">1</span> <span>명</span>
                            </div>
                            <div>
                                <span>최근 1주일 가입 회원수 </span>  <span class="data">1</span> <span>명</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p><i class="fas fa-stamp"></i> 경매 정보</p>
                        <div>
                            <div>
                                <span>전체 경매수 </span> <span class="data">1</span> <span>개</span>
                            </div>
                            <div>
                                <span>진행중인 경매수 </span>  <span class="data">1</span> <span>개</span>
                            </div>
                            <div>
                                <span>최근 1주일 등록 경매수 </span>  <span class="data">1</span> <span>개</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <p><i class="fas fa-handshake"></i> 거래 정보</p>
                        <div>
                            <div>
                                <span>전체 거래수 </span> <span class="data">1</span> <span>개</span>
                            </div>
                            <div>
                                <span>진행중인 거래수 </span>  <span class="data">1</span> <span>개</span>
                            </div>
                            <div>
                                <span>최근 1주일 등록 거래수 </span> <span class="data">1</span> <span>개</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>
				<h4>월별 개별 항목 통계</h4>
			</div>
            <div id="lineChart"></div>
		</div>
	</div>
	<script src="<c:url value="/resources/js/admin/sideBar.js"/>"></script>
	<script src="https://d3js.org/d3.v3.min.js"></script>     
    <script src="https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.11/c3.min.js"></script>
	<script src="<c:url value="/resources/js/admin/basic.js"/>"></script>
	
</body>

</html>