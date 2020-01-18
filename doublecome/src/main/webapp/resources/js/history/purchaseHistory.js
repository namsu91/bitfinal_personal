$(function (){
	let data = { pageNo: 1, searchType: ""};
	$(".purchaseTabList").click((e) => {
		$(".purchaseTabList").removeClass("tabChoice");
		$(e.target).addClass("tabChoice");
		data.searchType = $(e.target).data("type");
		$("#purchaseAjax").html("");
		purchaseListAjax(data);
	});
	
	purchaseListAjax(data);
	
	function purchaseListAjax(data){
		data.searchType = $("#purchaseHead").siblings(".tabHead").find("span.tabChoice").data("type");
		$.getJSON({
			url: `receivePurchaseHistory.do`,
			contentType :'application/json',
			data: data,
			success: result => makePurchaseHistory(result, data) 
		});
	};
	
	// 신뢰도 별
	function makeStar(score){
		let starHtml = ``;
		let halfScore = Math.floor(score / 2); 
		for (let i = 1; i <= halfScore; i++){
			starHtml += `
				<i class="fas fa-star reviewStar"></i>
			`;	
		}
		if (score % 2 === 1){
			starHtml += `
				<i class="fas fa-star-half-alt reviewStar"></i>
			`;	
		}
		for (let i = halfScore; i < 5; i++){
			if ((score % 2 == 1) && i == 4){
				continue;
			}
			starHtml += `
			<i class="far fa-star reviewStar"></i>
			`;
		}
		return starHtml;
	}
	
	let contextPath = window.location.pathname.substr(0,window.location.pathname.indexOf("/",2));
	function makePurchaseHistory(result, data){
		let purchaseContent = $("<div></div>");
		let purchaseAjax = $("#purchaseAjax");
		let html = ``;
		let starHtml = ``;
		if(result.list.length == 0){
			html = `
				<div class="emptyBox">구매한 내역이 없습니다.</div>
			`;
			purchaseContent.html(html);
		} else {
//			html += `
//			<div class="purchaseSort">
//			<div>
//				<ul>
//					<li class="sortTypeTab sortTypeChoice" data-sort="recency">•최신순</li>
//					<li class="sortTypeTab" data-sort="highGrade">•높은평점순</li>
//					<li class="sortTypeTab" data-sort="lowGrade">•낮은평점순</li>
//				</ul>
//				</div>
//			</div>
//			`;
			$.each(result.list, (i, r) => {

				starHtml = makeStar(Math.round(r.userScore));
				let bidPrice = r.bidPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				html += `
					<div class="listCon">
						<div class="listHead">
							<span class="listDate"> 
				`;
				if (r.auctionCondition != 1){
					html += `
						<span class="dateTitle">거래 시작일</span> 
						<span class="dateContent">${format(r.dealRegDate, "ymd")}</span>
					`;
					if (r.dealCondition == '3'){
						html += `
						<span class="dealCondition colorGreen">취소거래</span>
						`;
						} else if (r.dealCondition == '4'){
						html += `
						<span class="dealCondition colorRed">신고거래</span>
						`;
						}
				} else {
					html += `
						<span class="dateTitle">입찰 마감일 </span> 
						<span class="dateContent">${format(r.auctionLimitDate, "ymd")}</span>
					`;
				}
				html += `
					</span>
					<span class="detailCon"> 
					<a>입찰금 <strong>${bidPrice}</strong>원</a>
					</span>
					</div>
				`;
				if ((r.dealCondition == 1 && ((r.dealNo!= 0 && r.reviewSender == null) || r.dealBuyerCondition == 1))
						|| (r.dealCondition == 2 && (r.dealNo!= 0 && r.reviewSender == null))
						|| (r.dealCondition == 3 && (r.dealNo!= 0 && r.reviewSender == null))){
					html += `					
					<div class="listBody marginRemove">
						<ul>
							<li>
						<div class="btnGroup"> 
						   <div class="more">
				        <button class="more-btn">
				            <span class="more-dot"></span>
				            <span class="more-dot"></span>
				            <span class="more-dot"></span>
				        </button>
				        <div class="more-menu">
				            <div class="more-menu-caret">
				                <div class="more-menu-caret-outer"></div>
				                <div class="more-menu-caret-inner"></div>
				            </div>
				            <ul class="more-menu-items" >
						`;
					if (r.dealNo!= 0 && r.reviewSender == null){
						html += `
							<li class="more-menu-item reviewBtn" data-no="${r.auctionNo}">
			                    <button type="button" data-no="${r.auctionNo}" class="more-menu-btn" role="menuitem">후기등록</button>
			                </li>
						`;
					}
					if (r.dealBuyerCondition == 1){
						html +=`
							<li class="more-menu-item dealBuyerComplete" data-no="${r.auctionNo}">
			                    <button type="button" class="more-menu-btn" data-no="${r.auctionNo}">거래완료</button>
			                </li>
			                <li class="more-menu-item reportButton" data-no="${r.auctionNo}">
			                    <button type="button" data-no="${r.auctionNo}" class="more-menu-btn ">신고</button>
			                </li>
			                <li class="more-menu-item dealBuyerCancel" data-no="${r.auctionNo}">
			                    <button type="button" data-no="${r.auctionNo}" class="more-menu-btn">거래취소</button>
			                </li>
						`;
					}
					html += `
						 </ul>
				        </div>
				    </div>
				    </div>
					`;
				} else{
					html += `
					<div class="listBody">
						<ul>
							<li>
					`;
				}
				html +=`
								<div class="productImg">
									<img class="imgCon"
										src="${contextPath}/file/downLoadFile.do?fileNo=${r.fileNo}"/>
								</div>
							</li>
							<li>
								<div class="productInfo">
									<a href="${contextPath}/auction/detailAuction.do?no=${r.auctionNo}&userEmail=${r.userEmail}" class="listTitle">${r.auctionTitle}</a>
									<div class="listRegDate">${format(r.auctionRegDate, "ymd")}</div>
								</div>
							</li>
							<li>
							<div class="writerInfo">
								<a class="auctionWriter">${r.userNickname}</a>
								<div>(평점 : ${r.userScore}점)</div>
								<div class="starDiv">
									${starHtml}
								</div>
								</div>											
						</div>
							</li>
						</ul>
					</div>
				</div>
				`;
			});
		}
		purchaseContent.html(html);
		purchaseContent.append($("<div></div>").addClass("pagination"));
		purchaseAjax.html(purchaseContent.html());
		pg.print(purchaseAjax, result.pr);
	};


	pg.movePage($("#purchaseAjax"),(pageNo)=>{
		let year = $("#purchase option:selected").html();
		let data = { 
				pageNo: pageNo,
				searchType: $("#purchase option:selected").html()
		};
		purchaseListAjax(data);
	});
	
    pg.movePrevTab($("#purchaseAjax"),(pageNo)=>{
		let year = $("#purchase option:selected").html();
		let data = { 
				pageNo: pageNo,
				searchType: $("#purchase option:selected").html()
		};
		purchaseListAjax(data);
	});

    pg.moveNextTab($("#purchaseAjax"),(pageNo)=>{
		let year = $("#purchase option:selected").html();
		let data = { 
				pageNo: pageNo,
				searchType: $("#purchase option:selected").html()
		};
		purchaseListAjax(data);
	});

});

$(document).click(function(e){
	if ($(e.target).closest("button").attr("class") != "more-btn"){
		$(".more").removeClass("show-more-menu");
	}	
});

$("body").on("click", ".reviewBtn", (e) => {
	$("#reviewForm > form").attr("action","addReview.do");
	$("#auctionTitle").html($(e.target).closest(".listBody").find(".listTitle").html());
	$("#auctionNo").val($(e.target).data("no"));
	$(".regitbtn > button").html("등록");
	$("#addReviewModal").css("display","block");
})
$("body").on("click", ".more", (e) => {
	$(e.target).closest(".more").toggleClass("show-more-menu");

$("body").on("click", ".dealBuyerComplete", (e) => {
	confirm('거래완료', 'Complete', $(e.target).data("no"), 'dealBuyerCondition=2');
});

$("body").on("click", ".dealBuyerCancel", (e) => {
	confirm('거래취소', 'Cancel', $(e.target).data("no"), 'dealBuyerCondition=3');
});
	

function confirm(msg, type, auctionNo, userCondition){
	Swal.fire({
		  title: `${msg} 하시겠습니까?`,
		  text: `${msg} 후에는 거래상태 변경이 불가능합니다.`,
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '확인',
		  cancelButtonText: '취소'
			  
		}).then((result) => {
	        if (result.value) {
	            location.href=`deal${type}.do?auctionNo=${auctionNo}&${userCondition}`;
	        }
		})
};
	
});
