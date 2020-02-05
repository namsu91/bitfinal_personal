<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/chatting/chatting.css" />">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<title>Insert title here</title>
</head>
<body>
	 <div class="wrapper" data-id="${email}" >
        <div class="main_container">
            <div class="left_container">
                <div class="left_top_field">
                    <input type="text" placeholder="Search" />
                    <a href="javascript:;" class="search" ></a>
                </div>
                <div class="left_people_field">
                    <ul class="people">
                    	<c:choose>
                   		<c:when test="${empty chat}">
                   			<div>거래중인 경매가 존재하지 않습니다</div>
                    		<div>경매에 참여해보세요!</div>    
                    		</c:when>
                    		<c:otherwise>
                				<c:forEach items="${chat}" var="chat" varStatus="loop">
	                    		<c:choose>
		                    		<c:when test="${chat.userEmailSeller eq email}">
				                        <li class="person" data-chat="person${chat.chatNo}" data-file-code="${chat.fileGroupCode}" data-type=1 data-fileNo="${chat.fileNo}">
				                        	<span class="count" count="${chat.readsSeller}">
					                            <img src="<c:url value="/file/downLoadFile.do?fileNo=${chat.fileNo}" />" >
				                        	</span>
						                    <span class="name" data-title="${chat.auctionTitle}" data-no="${chat.chatNo}">${chat.auctionTitle}</span>
				                            <c:choose>
				                            	<c:when test="${empty chat.covstRegDate}">
						                            <span class="time"></span>			                            				                            	
						                            <span class="preview">대화를 시작하세요!</span>
				                            	</c:when>
				                            	<c:otherwise>
						                            <span class="time"><fmt:formatDate value="${chat.covstRegDate}" pattern="hh:mm" /></span>		                            	
						                            <span class="preview">${chat.covstContent}</span>
				                            	</c:otherwise>
				                            </c:choose>
		                       			 </li>                    		
		                    		</c:when>
		                    		<c:otherwise>
		                    			<li class="person" data-chat="person${chat.chatNo}" data-file-code="${chat.fileGroupCode}" data-type=2 data-fileNo="${chat.fileNo }">
				                        	<span class="count" count="${chat.readsBuyer}">
					                           <img src="<c:url value="/file/downLoadFile.do?fileNo=${chat.fileNo}" />" >
				                        	</span>
				                            <span class="name" data-title="${chat.auctionTitle}" data-no="${chat.chatNo}">${chat.auctionTitle}</span>
				                            <c:choose>
				                            	<c:when test="${empty chat.covstRegDate}">
						                            <span class="time"></span>			                            				                            	
						                            <span class="preview">대화를 시작하세요</span>
				                            	</c:when>
				                            	<c:otherwise>
						                            <span class="time"><fmt:formatDate value="${chat.covstRegDate}" pattern="hh:mm" /></span>			                            	
						                            <span class="preview">${chat.covstContent}</span>
				                            	</c:otherwise>
				                            </c:choose>
		                       			 </li>          
		                    		</c:otherwise>                    		
	                    		</c:choose>
	                    	</c:forEach>
                    		</c:otherwise>            
                    	</c:choose>
                    </ul>
                </div>
            </div>
            <div class="right_container">
                <div class="right_top_field" ></div>
                <div class="right_message_field">
               	<c:forEach var="chat" items="${chat}">
                    <div class="chat" data-chat="person${chat.chatNo}" data-no="${chat.chatNo}" >
                        <div class="conversation-start">
                            <span></span>
                        </div>
                    </div>
               	</c:forEach>
                    <div class="write" style="display:none;">
                        <input type="text" data-chatfield="chat"/>             
                        <a href="javascript:;" class="write-link send"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
    	function checkCount() {
	    	$(".person .count").each((index, value) => {
	    		if ($(value).attr("count") == 0) {
	    			$(value).addClass("hideCount");	
	    		}    		
	    	})    		
    	}
    	checkCount();
    	 
    </script>
    <script src="<c:url value="/resources/js/chatting/chatting.js" />"></script>
</body>
</html>