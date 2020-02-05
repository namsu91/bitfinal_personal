let rPageNo = 1; //판매자 후기
let reviewCnt = 0;
let limit = new Date($('.counter-class').data('date'));
let now = new Date($('.counter-class').data('now')) 
//해당글 리밋시간 지날시 모든이벤트 off
$(document).ready(() => {
	if(limit.getTime() < now.getTime()) {
		$(".afterModal").css("display", "block");
		$(document).off();
	}
})
let timer = limit.getTime() - now.getTime()
if (timer > 0) {
	setTimeout(() => {
		location.reload();
	}, timer)
}	

//alert 라이브러리
function swalAlert(msg) {
	Swal.fire(msg)
}

//alert 라이브러리
function swal() {
    Swal.fire({
        title: '로그인이 필요한 페이지입니다',
        text: "회원가입 혹은 로그인후 진행해주세요",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '로그인',
        cancelButtonText: '회원가입'
      }).then((result) => {
        if (result.value) {
            location.href="/doublecome/user/loginForm.do"
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            location.href="/doublecome/user/joinForm.do"
        }
      })
}

//경매종료 페이지 스크롤 내릴때 모달조절
$(window).scroll(function () {
	  height = $(document).scrollTop();
	  margin = parseInt($(".afterModal").css("margin-top"))
	  marginTop = margin - height
	  top1 = $(".topbar").css("height")
	  top2 = $(".topContent").css("height")
	  // 헤더의 길이
	  if (marginTop <= 0 && height >= (parseInt(top1) + parseInt(top2))) {
		  $(".afterModal").css("margin-top", 0)
		  //만약 scrollTop이 헤더의 길이보다 커지면 마진을 0 으로
	  } else if(height <= 220) {
		  $(".afterModal").css("margin-top", (parseInt(top1) + parseInt(top2))-height+"px")
		  //스크롤을 다시 올리면 원래의 마진 복구
	  } else {
		  $(".afterModal").css("margin-top", (parseInt(top1) + parseInt(top2))-height+"px")
		  //스크롤을 내리면 마진탑을 내림
	  }
	  
	})

$(document).on("click", ".remove_btn", () => {
	Swal.fire({
		title: '게시글을 삭제하시겠습니까',
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: '확인',
		cancelButtonText: '취소'
	}).then((result) => {
		if (result.value) {
			location.href="/doublecome/auction/deleteAuction.do?no=" + no
		} else if (result.dismiss === Swal.DismissReason.cancel) {
		}
	})
})
//스틱 라이브러리
$('.sidebar, .nav').stick_in_parent("#wrapper");

//스와이퍼 라이브러리
let galleryTop = new Swiper('.gallery-top', {
  effect: 'cube',
  grabCursor: true,
  loop: true,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
  },
});

//페이지 클릭부분 호출
$("#btn1").click(() => {
	$("#inquiry_box").css('display', 'block')
  $("#insertbox1").html($("#inquiry_box"))
})
$("#btn1_1").click(() => {
	$("#inquiry_box").css('display', 'block')
  $("#insertbox1_1").html($("#inquiry_box"))
})
$("#btn1_2").click(() => {
	$("#inquiry_box").css('display', 'block')
  $("#insertbox1_2").html($("#inquiry_box"))
})
$("#btn2").click(() => {
	$("#inquiry_box").css('display', 'block')
  $("#insertbox2").html($("#inquiry_box"))
})

//문의 답장버튼 클릭시 html호출해서 해당 부분 하단에 붙여넣기
$(document).on("click", ".reply", () => {
	$div = $(e.target).attr("id")
	$("#inquiry_box").css('display', 'block')
	$("." + $div).append($("#inquiry_box"))
	$parent =  $div.replace(/[^0-9]/g,"")
	$(".inquiryParent").val($parent)
})

$(document).on("click", ".notLogin", () => {
	swal()
})
//$(".loginAlready").click(() => {
//	location.href="/bidModal.do"
//})


$(document).ready(function(){
    loopcounter('counter-class');
  });

//스크롤 내릴시 상단 탭 부분 변경
$(window).scroll(function () {
  height = $(document).scrollTop();
  if ($("#nav1").offset().top-80 < height && 
      $("#nav2").offset().top-80 > height) {
        $(".nav").children().removeClass("movenav")
        $(".nav1").addClass("movenav")
      } else if ($("#nav2").offset().top-80 < height &&
      $("#nav3").offset().top-80 > height
      ) {
        $(".nav").children().removeClass("movenav")
        $(".nav2").addClass("movenav")
      } else if ($("#nav3").offset().top-80 < height
      ) {
        $(".nav").children().removeClass("movenav")
        $(".nav3").addClass("movenav")
      } 
  //제일 하단까지 내려왔을 경우
  if ($(document).height() - $(window).height() <= height + 20) {
    	  $(".nav").children().removeClass("movenav")
    	  $(".nav3").addClass("movenav")
  }
})


$('.nav-item').click(function(e){
	classes = $(e.target).data("nav");
	let movepoint = '#' + classes;
	let addcss = '.' + classes;
	let offset = $(movepoint).offset().top - 60;
    $(addcss).addClass("movenav")
    $(".nav").children().removeClass("movenav")
    $('html').animate({scrollTop : offset}, 400);
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(".nowprice").html(numberWithCommas($(".nowprice").html()))
$(".buyprice").html(numberWithCommas($(".buyprice").html()))
$(".nowMax").html(numberWithCommas($(".nowMax").html()))

$(".bidPriceRank").each((index, item) => {
	$(item).html(numberWithCommas($(item).html()))
	
})

$(document).on("click", ".logout", () => {
	swal();
})


pg.print($("#nav2"));
pg.movePage($("#nav2"),(pageNo) =>{
	let href = location.search.substr(1)
	location.href = `?no=${no}&userEmail=${email}&pageNo=${pageNo}`
//	let offset = $("#nav3").offset()
//	$("html").animate({scrollTop : offset.top}, 400)
})


makeReviewListAjax()
let acc = document.getElementsByClassName("accordion");

function toggle() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
 }


function makeReviewListAjax() {
	$.getJSON({
		url: "retrieveReceiveReview.do",
		data: {rPageNo, email},
		success: result => {
			makeReviewList(result);
			for (i = 0; i < acc.length; i++) {
				acc[i].removeEventListener("click", toggle)
				acc[i].addEventListener("click", toggle);
			}
		}
	});
}

$(document).on("click", ".moreBtn", (e) => {
	makeReviewListAjax()
});

function makeReviewList (result) {
	let html = "";
	if (result.length == 0) {
		html = `
			<div class="review_box">
				<div class="empty_review">작성된 리뷰가 없습니다.</div>
			</div>
		`
		$(".reviewListContent").html(html);
	} else {
		$.each(result, (i, review) => {
			reviewCnt = review.reviewCnt;
			html += `
										<button class="accordion">
								<div class="col-xs-12">
									<div class="col-xs-2">
										<p class="grade">
											<span class="grade_point">${review.reviewScore}</span><span>점</span>
										</p>
									</div>
									<div class="col-xs-8 text-center">
										<p class="review_title review_pdct_title">${review.auctionTitle}</p>
										<p class="review_title review_title">${review.reviewTitle}</p>
										<p class="review_title review_regdate"><fmt:formatDate value="${review.reviewRegDate}" pattern="yyyy-MM-dd"/></p>
									</div>
									<div class="review_contents_writer col-xs-2">
										<p class="review_writer">${review.senderNickname}</p>
									</div>
								</div>

							</button>
							<div class="accor">
								<div class="accor_contents">
									<div class="review_contents_top row">
										<div class="review_top col-xs-10">
											<div class="col-xs-3">
												<img src="/doublecome/file/downLoadFile.do?fileNo=${review.fileGroupCode}"
													class="review_img img-rounded img-fluid" />
											</div>
											<div class="col-xs-7 review_contents_title">
												<p>
													<span class="review_writer">${review.senderNickname}</span><span
														class="review_contents_regdate"><fmt:formatDate value="${review.reviewRegDate}" pattern="yyyy-MM-dd"/></span>
												</p>
												<p>${review.reviewTitle}</p>
											</div>
										</div>
									</div>
									<div class="col-xs-10 review_contents_contents">
										<div class="clearfix"></div>
										<p>${review.reviewContent}</p>
									</div>
								</div>
							</div>
			`;
		})
			html += `
					<button class="moreBtn">더 보기 <span class="glyphicon glyphicon-menu-down"></span></button>
				`;
		$(".moreBtn").remove();
		if (rPageNo*5 > reviewCnt) {
			$(".moreBtn").remove();
		}
		
		$(".reviewListContent").append(html);
		
		if (rPageNo*5 > reviewCnt) {
			$(".moreBtn").remove();
		}
		rPageNo += 1;
		
	}
}



$(document).on("click", ".updateInquiryBtn", (e) => {
	let id = $(e.target).data("no")
	let content = $(e.target).data("content")
	let prevContent = $(".InquiryUpdateText").parents("div").parents("div").attr("class")
	if($('textarea').hasClass("InquiryUpdateText")) {
		$(".InquiryUpdateBox").remove();
		$(`.${prevContent} p`).show();
	}
	$(`.inquiryContent${id} p`).hide();
	
	let html = 
	`
		<div class="InquiryUpdateBox">
	<form id="upForm" method="post" action="editInquiry.do">
	<textarea class="InquiryUpdateText" name="inquiryContent">${content}</textarea>
					<div class="InquiryUpdateBtn">
						<button class="InquiryUpdateCancelBtn">취소</button>
						<button type="button" class="InquiryUpdateCompleteBtn">수정</button>
					</div>
		<input type="hidden" name="inquiryNo" value="${id}">	
	</form>
		</div>
	`;
	$(`.inquiryContent${id}`).append(html);
	
	$(".InquiryUpdateCancelBtn").click(() => {
		$(".InquiryUpdateBox").remove();
		$(`.inquiryContent${id} p`).show();
	})
	$(".InquiryUpdateCompleteBtn").click(() => {
		Swal.fire({
	        title: '등록한 문의사항을 수정하시겠습니까',
	        type: 'warning',
	        showCancelButton: true,
	        confirmButtonColor: '#3085d6',
	        cancelButtonColor: '#d33',
	        confirmButtonText: '수정',
	        cancelButtonText: '취소'
	      }).then((result) => {
	        if (result.value) {
	        	$("#upForm").submit()
	        } else if (result.dismiss === Swal.DismissReason.cancel) {
	        }
	      })
	})
	
})
$(document).on("click", ".deleteInquiryBtn", (e) => {
	let id = $(e.target).data("no")
	
	    Swal.fire({
        title: '등록한 문의사항을 삭제하시겠습니까',
        text: "삭제시 등록된 답변도 같이 삭제됩니다",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.value) {
        	location.href=`removeInquiry.do?inquiryNo=${id}`
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        }
      })
})


function addCommas(x) {
	 let val = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 if(!val.endsWith("000")) {
		 alert("입력은 천원단위 입니다.")
		 return;
	 }
	 return val;
}
 
function removeCommas(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
}

$(".start, .buy").on("focus", function() {
	    var x = $(this).val();
	    x = removeCommas(x);
	    $(this).val(x);
	}).on("focusout", function() {
	    var x = $(this).val();
	    if(x && x.length > 0) {
	        if(!$.isNumeric(x)) {
	            x = x.replace(/[^0-9]/g,"");
	        }
	        x = addCommas(x);
	        $(this).val(x);
	    }
	}).on("keyup", function() {
	    $(this).val($(this).val().replace(/[^0-9]/g,""));
	});

$(".start").click((e) => {
	   $($(e.target)).val("")
})
$(document).on("click", ".bidModalBtn", () => {
	if (email == id) {
		swalAlert("자신의 제품에 입찰 혹은 구매하실 수 없습니다.")
	} else {
	$div = $(".nowMax").text().replace(/[^0-9]/g,"")
	$div2 = $(".inputwon").val().replace(/[^0-9]/g,"")
	$div3 = $(".auctionBuyNow").val()
	if(parseInt($div)+10 < parseInt($div2) && parseInt($div2) < $div3) {
		$(".inputwon").val($(".inputwon").val().replace(/[^0-9]/g,""))
		$.ajax({
			url : "checkBid.do",
			type : "post",
			data : {
				bidPrice : parseInt($div2),
				auctionNo : no
			},
			success: function(result) {
				if (result == 1) {
					swalAlert("최고 입찰가가 갱신되었습니다.")
					$(".swal2-confirm").click(() => {
						location.reload();
					})
					
				} else {
					swalAlert("입찰 되었습니다.")
					$(".swal2-confirm").click(() => {
						$("#bidForm").submit();						
					})
					
				}
			},
		})
		
	} else if (parseInt($div2) > $div3) {
		swalAlert("즉시 구매가격보다 높은 가격으로 입찰하실 수 없습니다.")
	} 
	else {
		swalAlert("현재 가격보다 낮은 가격 또는 같은 가격으로 입찰하실 수 없습니다.")
	}
	}
})

$(document).on("click", ".loginAlreadyBuyNow", () => {
	if (email == id) {
		swalAlert("자신의 제품에 입찰 혹은 구매하실 수 없습니다.")
	} else {
    Swal.fire({
        title: '즉시구매가격으로 구매하시겠습니까?',
        text: "구매시 취소하실 수 없습니다",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '즉시구매',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.value) {
        	$(".inputwon").val($(".auctionBuyNow").val())
        	$("#bidForm").attr("action", "buyNow.do");
        	$("#bidForm").submit();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        	
        }
      })
	}
})
$(document).on("click", ".InquiryBtn", () => {
	if (email == id) {
		swalAlert("자신의 글에 문의등록을 하실 수 없습니다.")
	} else {
		$("#productInquiry").submit();
	}
})

$(".swiper-wrapper").on("click", () => {
	$(".carousel-inner .item:nth-child(1)").addClass("active");
	$(".modal").show();
})
$(".tagCancel").click(() => {
	$(".carousel-inner .item").removeClass("active");
	$(".modal").hide();
})

//방송 시작 버튼 클릭시 이벤트
$(".onAir_btn").click(()=>{
	let hostIndex = location.href.indexOf( location.host ) + location.host.length;
	let path = location.href.substring( 0, location.href.indexOf('/', hostIndex + 1));

	$.ajax({
		url : path + '/liveAuction/start.do',
		type : "post",
		data : {
			auctionNo : no
		},
		success: (result) => {
			if (result == 'false') {
				swalAlert("이미 방송이 진행중입니다.")
			    return;
			}
			submit(path + '/liveAuction/broadcast.do',no)
		},
	})
})


//폼객체 만들어서 전송하는 함수
function submit(url,auctionNo) {

        var form = document.createElement("form");

        form.setAttribute("charset", "UTF-8");

        form.setAttribute("method", "Post");  //Post 방식

        form.setAttribute("action", url); //요청 보낼 주소



        var hiddenField = document.createElement("input");

        hiddenField.setAttribute("type", "hidden");

        hiddenField.setAttribute("name", "auctionNo");

        hiddenField.setAttribute("value", auctionNo);

        form.appendChild(hiddenField);



        hiddenField = document.createElement("input");

        hiddenField.setAttribute("type", "hidden");

        hiddenField.setAttribute("name", "type");

        hiddenField.setAttribute("value", "presenter");

        form.appendChild(hiddenField);

        document.body.appendChild(form);

        form.submit();

}