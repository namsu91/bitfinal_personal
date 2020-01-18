let pageNo = 1;
let reviewCnt = 0;
let sort = "";
let contextPath = window.location.pathname.substr(0,window.location.pathname.indexOf("/",2));
$(function (){
// info 박스 클릭시 이동
let $myInfo = $("#myInfo");
$myInfo.find("div").click((e) => {
	let $topTarget = '';
	let minus = 20;
	$location = $(e.target).closest("div").data("location");
	switch ($location){
	case "purchaseHead": 
		$topTarget = $("#"+$location); 
		break;
	case "salesHead": 
		$topTarget = $("#"+$location); 
//		minus = 70;
		break;
	case "reviewHead": 
		$topTarget = $("#"+$location); 
//		minus = 50; 
		break;
	}
	
	$('html').animate( { scrollTop : $topTarget.offset().top - minus }, 400 );
});
// 파일첨부 
$("body").on("click", ".note-my-files",() => {
	$(`.note-group-select-from-files input[type="file"]`).trigger("click");
});
$(".note-my-files").css("color", "blue");
$(".note-my-files").html(`<span class="glyphicon glyphicon-picture"></span> 사진`);



/**
let $navBar = $("#navBar");
let $left = $(".purchaseTabList").offset().left;
let navTop = $navBar.offset().top;
$navBar.find("a").click((e) => {
	let topTarget = '';
	let minus = 100;
	$location = $(e.target).data("location");
	switch ($location){
	case "purchaseHead": 
		$topTarget = $("#"+$location); 
		break;
	case "salesHead": 
		$topTarget = $("#"+$location); 
		minus = 120;
		break;
	case "reviewHead": 
		$topTarget = $("#"+$location); 
		minus = 50; 
		break;
	}
	
	jQuery('html, body').animate( { scrollTop : $topTarget.offset().top - minus }, 0 );
});
*/
/**
// 네비게이션바 고정 & 색깔 변화
let navFun = function(navigation) {
	$navBar.find("a").removeClass("navChoice");
	$navBar.find(navigation).addClass("navChoice");
};
$(window).scroll(function () {
    // 네비게이션 상단바 고정
    height = $(document).scrollTop();
    if (height >= navTop){
        $navBar.addClass("barFixed");
        $navBar.css("left", $left);
        if (height > $("#purchaseHead").offset().top-60 && height < $("#salesHead").offset().top-70){
        	navFun("a:eq(0)");
        } else if (height > $("#salesHead").offset().top-70 && height < $("#reviewHead").offset().top-100){
        	navFun("a:eq(1)");
        } 
        else if (height > $("#reviewHead").offset().top-100){
        	navFun("a:eq(2)");
        }
    } else if(height < navTop) {
        $navBar.removeClass("barFixed");
        navFun("a:eq(0)");
    };
});
*/
//  각 구매내역, 판매내역, 후기 탭 클릭시 색상변화 모듈화하기
$(".purchaseTabList").click((e) => {
	$(".purchaseTabList").removeClass("tabChoice");
	$(e.target).addClass("tabChoice");
});
$(".salesTabList").click((e) => {
	$(".salesTabList").removeClass("tabChoice");
	$(e.target).addClass("tabChoice");
});
function reviewListAjax(target, pageNo, sort){
	let $dataName = target.data("name");
		$.get({
			url: `retrieve${$dataName}.do`,
			data: {
				pageNo,
				sort
			},
			dataType: "json",
			success: result => makeReviewList(result, $dataName, sort)
		});
	$(".SendReview").css("display", "none");
	$(".ReceiveReview").css("display", "none");
	$("." + $dataName).css("display", "block");
}

// 처음 로딩시 받은후기 목록
reviewListAjax($(".ReceiveReview"), 1);

// 후기 목록 ajax
$(".reviewTabList").click((e) => {
	reviewCnt = 0;
	pageNo = 1;
	$("#reviewCon > ul").html("");
	$(".reviewTabList").removeClass("tabChoice");
	$(".sortTypeTab").removeClass("sortTypeChoice");
	$(".sortType").find(".sortTypeTab:first").addClass("sortTypeChoice");
	$(e.target).addClass("tabChoice");
	reviewListAjax($(e.target), pageNo);
});

$("body").on("click", ".sortTypeTab", (e) => {
	$(".sortTypeTab").removeClass("sortTypeChoice");
	$(e.target).addClass("sortTypeChoice");
	pageNo = 1;
	let $eTarget = $(e.target).closest(".sortFind");
	sort = $(e.target).data("sort");
	$("#reviewCon > ul").html("");
	reviewListAjax($eTarget, pageNo, sort);
});

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

// 후기 목록 출력
function makeReviewList(result, type, sort){
	let html = ``;
	let starHtml = ``;
	if (type == "SendReview"){
		if (result.length == 0){
			$(".SendReview").html("");
			html = `
				<div class="SendReview">
					<div class="emptyBox">작성한 후기가 없습니다.</div>
				</div>
			`;
			$(".SendReview").html(html);
		} else {
			$.each(result, (i, r) => {
				reviewCnt = r.reviewCnt;
				starHtml = makeStar(r.reviewScore);
				html += `
					<li class="preView">
						<div class="scoreArea">
							<div class="score">${r.reviewScore}</div>
							<div class="scoreForm">점</div>
							<span class="scoreStar">
								${starHtml}
							</span>
						</div>
						<div class="contentArea">
							<a href="${contextPath}/auction/detailAuction.do?no=${r.auctionNo}&userEmail=${r.userEmail}" class="auctionTitle">${r.auctionTitle}</a>
							<div class="reviewTitle">${r.reviewTitle}</div>
							<div class="reviewDate">${format(r.reviewRegDate,"ymd")}</div>
						</div>
						<div class="sWriterArea">
							<span class="reviewer">${r.senderNickname}</span>
						</div>
						<div class="editdel">
							<a data-no="${r.reviewNo}" data-receiver="${r.reviewReceiver}" class="editreview">수정</a> / 
							<a data-no="${r.reviewNo}" data-receiver="${r.reviewReceiver}" class="delreview">삭제</a>
						</div>
					</li>
					<li class="reviewDetail">
						<div class="reviewContent">
							<div class="profileDiv">
								<img class="profileImg" src="${contextPath}/file/downLoadFile.do?fileNo=${r.fileGroupCode}" />
							</div>
							<div class="nicknameDiv">${r.senderNickname}</div>
							<div class="regdateDiv">${format(r.reviewRegDate,"ymd")}</div>
							<div class="onelineDiv">${r.reviewTitle}</div>
							<div class="reviewDiv">${r.reviewContent}</div>
						</div>
					</li>
					`;
			})
			$("#reviewCon .moreSBtn").remove();
			if (reviewCnt - (5* (pageNo - 1)) > 5){
				html += `
					</div>
					<button data-name="SendReview" class="moreSBtn" type="button">
					더 보기</button>
					</div>
					`;
			}
			$("#reviewCon > ul").append(html);
			pageNo += 1;
		}
	} else {
		if (result.length == 0){
			$(".ReceiveReview").html("");
			html = `
				<div class="ReceiveReview">
				<div class="emptyBox">받은 후기가 없습니다.</div>
				</div>
				`;
			$(".ReceiveReview").html(html);
		} else {
			$.each(result, (i, r) => {
				reviewCnt = r.reviewCnt;
				starHtml = makeStar(r.reviewScore);
				html += `
					<li class="preView">
					<div class="scoreArea">
					<div class="score">${r.reviewScore}</div>
					<div class="scoreForm">점</div>
						<span class="scoreStar">
							${starHtml}
						</span>
					</div>
					<div class="contentArea">
					<a href="${contextPath}/auction/detailAuction.do?no=${r.auctionNo}&userEmail=${r.userEmail}" class="auctionTitle">${r.auctionTitle}</a>
					<div class="reviewTitle">${r.reviewTitle}</div>
					<div class="reviewDate">${format(r.reviewRegDate,"ymd")}</div>
					</div>
					<div class="rWriterArea noBtn">
					<span class="reviewer">${r.senderNickname}</span>
					</div>
					</li>
					<li class="reviewDetail">
					<div class="reviewContent">
					<div class="profileDiv">
					<img class="profileImg" src="${contextPath}/file/downLoadFile.do?fileNo=${r.fileGroupCode}" />
					</div>
					<div class="nicknameDiv">${r.senderNickname}</div>
					<div class="regdateDiv">${format(r.reviewRegDate,"ymd")}</div>
					<div class="onelineDiv">${r.reviewTitle}</div>
					<div class="reviewDiv">${r.reviewContent}</div>
					</div>
					</li>
					`;
			})
			$("#reviewCon .moreRBtn").remove();
			if (reviewCnt - pageNo - 1 > 5){
				html += `
					</div>
					<button data-name="ReceiveReview" class="moreRBtn" type="button">
					더 보기</button>
					</div>
					`;
			}
			$("#reviewCon > ul").append(html);
			pageNo += 1;
		}
	}
}
$("body").on("click", ".moreSBtn", (e) => {
	$.get({
		url: "retrieveSendReview.do",
		data: {
			pageNo,
			sort
		},
		dataType: "json",
		success: result => makeReviewList(result, $(e.target).data("name"), sort)
	});
});

$("body").on("click", ".moreRBtn", (e) => {
	$.get({
		url: "retrieveReceiveReview.do",
		data: {
			pageNo,
			sort
		},
		dataType: "json",
		success: result => makeReviewList(result, $(e.target).data("name"), sort)
	});
});

function success(msg){
	Swal.fire({
		title: `후기글 ${msg}`,
		text: `${msg}되었습니다.`,
		type: 'success',
		showConfirmButton: false
//		confirmButtonColor: '#3085d6',
//		confirmButtonText: '확인'
	});
};

// 후기 삭제 ajax
$("body").on("click", ".delreview", (e) => {
	Swal.fire({
		  title: `삭제 하시겠습니까?`,
		  text: `삭제하신 후에는 복구가 불가능합니다.`,
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: '확인',
		  cancelButtonText: '취소'
			  
		}).then((result) => {
	        if (result.value) {
	        	$.get({
	        		url: "removeReview.do",
	        		data : {
	        			reviewNo: $(e.target).data("no"),
	        			reviewReceiver: $(e.target).data("receiver")
	        		},
	        		success: function() {
	        			success("삭제");
	        			setTimeout("location.reload()", 1500);
	        		}
	        	});
	        }
		})
});

let $addReviewModal = $("#addReviewModal");
$("body").on("click", ".reviewBtn", (e) => {
	$("#reviewForm > form").attr("action","addReview.do");
	$("#auctionTitle").html($(e.target).closest("ul").find(".listTitle").html());
	$("#auctionNo").val($(e.target).data("no"));
	$(".regitbtn > button").html("등록");
	$addReviewModal.css("display","block");
});

//후기 수정
//$("body").on("click", ".editBtn > button", (e) => {
//	$.get({
//		url: "editReview.do",
//		data : {
//			reviewNo: $(".regitbtn").data("no"),
//			reviewReceiver: $(".regitbtn").data("receiver")
//		},
//		success: function() {
//			success("수정");
//			setTimeout("location.reload()", 1500);
//		}
//	});
//});

// 후기 수정 폼
$("body").on("click", ".editreview", (e) => {
	$.get({
		url: "editReviewForm.do",
		data : {
			reviewNo: $(e.target).data("no")
		},
		success: result => {
			$("#reviewForm > form").attr("action","editReview.do");
			$("#auctionTitle").html(result.auctionTitle);
			$('input:hidden[name="reviewScore"]').val(`${result.reviewScore}`);
			$(`#reviewScore${result.reviewScore}`).closest(".scoreSpan").find(".fa-star").addClass("scoreChoice");
			$(`#reviewScore${result.reviewScore}`).prop("checked", true);
			$(".reviewTitleDiv input").val(result.reviewTitle);
			$('#summernote').summernote('code', result.reviewContent);
			$("#reviewNo").val(result.reviewNo);
			$("#reviewReceiver").val(result.reviewReceiver);
			$(".regitbtn > button").html("수정");
			$addReviewModal.css("display","block");
		}
	});
	
});


// 후기 등록 내용 확인
$(".regitbtn").click((e) => {
	if ($('input:hidden[name="reviewScore"]').val() == "") {
		Swal.fire("신뢰도를 선택해주세요.");
	} else if ($('input:text[name="reviewTitle"]').val() == ""){
		Swal.fire("한줄 요약을 입력해주세요.");
	} else if($(".note-editable").html() == ""){
		Swal.fire("후기를 입력해주세요.");
	} else {
		if($(".regitbtn > button").html() == "등록"){
			Swal.fire("후기가 등록되었습니다.").then((result) => {
		        if (result.value) {
		        	$("#rform").submit();
		        }
		      })
		} else if($(".regitbtn > button").html() == "수정"){
			Swal.fire("후기가 수정되었습니다.").then((result) => {
		        if (result.value) {
		        	$("#rform").submit();
		        }
		      })
		}
	}
});
$("body").on("click", ".reviewModalClose", (e) => {
	$addReviewModal.css("display","none");
	$("#rform")[0].reset();
	$('#summernote').summernote('code','');
	$(".fa-star").removeClass("scoreChoice");
});

window.onclick = function(event) {
 if (event.target == $addReviewModal) {
 	$addReviewModal.css("display","none");
 }
 
}

// 후기작성 서머노트
$('#summernote').summernote(
		{
			height : 350,
			width : 500,
		    disableResize: true,
		    disableResizeEditor: true,
		    resize: false,
		    toolbar : ['insert', ['picture']],
		    popover: {},
		    focus: true
		    	
//		    	onImageUpload: function (files, editor, welEditable) {
//		        for (var i = files.length - 1; i >= 0; i--) {
//		        	console.log(files[i]);
//		        	console.log(btoa(files[i]));
//		        	localStorage.setItem("i", files[i]);
//		        	sendFile(btoa(files[i]));
//		        	sendFile(files[i], this);
//		        	console.log("localStorage:",localStorage.getItem("i"))
//		          }
//		        }
//		      }
});

function sendFile(img, editor) {
	$(editor).summernote('editor.insertImage', img);
	}
//function sendFile(file, editor) {
//	// 파일 전송을 위한 폼생성
//	var data = new FormData();
//	data.append("file", file);
//	$.ajax({ // ajax를 통해 파일 업로드 처리
//		data : data,
//		type : "POST",
//		url : contextPath + "/file/photoUpload.do",
//		cache : false,
//		contentType : false,
//		enctype: "multipart/form-data",
//		processData : false,
//		success : function(url) { // 처리가 성공할 경우
//			// 에디터에 이미지 출력
//			$(editor).summernote('editor.insertImage', url);
//		}
//	});
//}

// 후기제목 클릭시 후기상세글 노출
$("body").on("click" ,".reviewTitle", (e) => {
	$reDetail = $(e.target).closest(".preView").next();
	if ($reDetail.css("display") == "none"){
		$reDetail.css("display", "inline-block");
	} else {
		$reDetail.css("display", "none");
	}
});

// 후기점수
$("body").on("click", ".scoreLabel", (e) => {
	let $star = $(e.target).closest(".scoreSpan").find(".fa-star");
	let $cStar = $(".fa-star");
	let score = $('input:hidden[name="reviewScore"]');
	if ($star.css("visibility") == "hidden"){
		$cStar.removeClass("scoreChoice");
		$star.addClass("scoreChoice");
		score.val($(e.target).data("no"));
	} else if ($star.css("visibility") == "visible"){
		$cStar.removeClass("scoreChoice");
		score.val("");
	}
});

let myInfo = $("#myInfo");
$("#moveButton").css("left", myInfo.offset().left + 930);
// 페이지 상단으로 이동
$("#toTheTop").click((e) => {
	let htmlOffset = jQuery( 'html' ).offset();
    $( 'html, body' ).animate( { scrollTop : htmlOffset.top }, 400 );
});

$("#toTheBottom").click((e) => {
	let htmlOffset = jQuery( 'html' ).offset();
	$('html, body').animate( { scrollTop : $(document).height() } );
});
});