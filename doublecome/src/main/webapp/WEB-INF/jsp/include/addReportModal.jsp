<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- id = openReportModal  버튼에 아이디값을 주고 이 jsp 인클루드한다-->

<link rel="stylesheet"
	href="<c:url value="/resources/css/common/addReportModal.css"/>">
    <div class="addReportModal">
        <div class="addReportModalBack">
            <div>
                <div class="reportReason">
                    <form method="post" id="reportForm">
                    <!-- 유저 신고는 1번 경매신고는 2번-->
                    <input type="hidden" value='' name="reportReceiver" class="reportReceiver">
                    <input type="hidden" value='' name="reportSender" class="reportSender">
                    <input type="hidden" value='' name="auctionNo" class="auctionNo">
                    <span>신고사유</span>
                    <div>
                        <input type="radio" name="reportTypeCode" id="report1"  value="1"/>
                        <label for="report1">욕설 및 비방</label>
                    </div>
                    <div>
                        <input type="radio" name="reportTypeCode" id="report2" value="2"/>
                        <label for="report2">물품 미발송</label>
                    </div>
                    <div>
                        <input type="radio" name="reportTypeCode" id="report3" value="3"/>
                        <label for="report3">광고성 게시물</label>
                    </div>
                    <div>
                        <input type="radio" name="reportTypeCode" id="report4" value="4"/>
                        <label for="report4">불친절</label>
                    </div>
                    <div>
                        <input type="radio" name="reportTypeCode" id="report5" value="5"/>
                        <label for="report5">기타</label>
                    </div>
                <div>
                    <span>신고 내용</span>
                    <textarea name="reportContent" placeholder="내용을 입력해주세요.(선택)"></textarea>
                </div>
				</form>
                </div>
                <div><button class="addReportBtn">신고</button><button class="cancleReportBtn">취소</button></div>
            </div>
        </div>
    </div>
    
<script src="<c:url value="/resources/js/common/addReportModal.js"/>"></script>