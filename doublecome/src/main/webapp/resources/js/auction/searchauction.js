$(document).ready(e => {
	$("#price_filter li a, #price_choice, #bidcount li a, a.category, #date li a").unbind("click").click(e => {
		if (selectCheck(e) == false) {
			return;
		} 
		$("#sort_list span").removeClass("on")
		searchAjax(e);
	})
	$("#sort_list a").click(e => {
		$("#sort_list span").removeClass("on")
		$(e.target).find("span").addClass("on");
		searchAjax(e);
	})
	$("#view").change(e => {
		searchAjax(e);		
	})
})
//ajax 처리
function searchAjax(e) {
	if(typeof(e) == 'string'){
	} else{		
		e.preventDefault();
	}
	let sendData = "{";
	let filter = $(".options")
	let ele = e.target;
	let flag = true;
	let priceChoice = [];
	
	for (let option of filter){
		if (flag == true) {
			if ($(option).data("name") == "priceChoice") {
				let startPrice ="startPrice"
				let endPrice = "endPrice"
				priceChoice = $(option).data("value").split("-");
				sendData += '"'+ startPrice + '"' + " : " + priceChoice[0]
				+","+ '"'+ endPrice + '"' + " : " + priceChoice[1]				
			} else if ($(option).data("name") == "limits") {
				let startLimit ="startLimit"
				let limit = $(option).data("value");
				if (limit == "1day") limit = "1";
				else if (limit == "2day") limit = "2";
				else if (limit == "3day") limit = "3";
				sendData += '"'+ startLimit+ '"' + " : " + limit
			} else if ($(option).data("name") == "bidCount") {
				let startBidCount ="startBidCount"
				let endBidCount = "endBidCount"
				bidCount = $(option).data("value").split("-");
				sendData += '"'+ startBidCount+ '"' + " : " + bidCount[0]
				+","+ '"'+ endBidCount + '"' + " : " + bidCount[1]				
			} else if ($(option).data("name") == "searchKeyWord") {
				let searchKeyWord = $(option).data("name") 
				sendData += '"'+ searchKeyWord+ '"' + " : " + '"'+ $(option).data("value") + '"'
			} else {
				sendData = sendData + '"'+ $(option).data("name") + '"' + " : " + $(option).data("value")				
			}
			
			flag = false;
		} else if ($(option).data("name") == "priceChoice") {
			let startPrice ="startPrice"
			let endPrice = "endPrice"
			priceChoice = $(option).data("value").split("-");
			sendData += ","+ '"'+ startPrice + '"' + " : " + priceChoice[0]
			+","+ '"'+ endPrice + '"' + " : " + priceChoice[1]				
		} else if ($(option).data("name") == "limits") {
			let startLimit ="startLimit"
			let limit = $(option).data("value");
			if (limit == "1day") limit = "1";
			else if (limit == "2day") limit = "2";
			else if (limit == "3day") limit = "3";
			sendData += ","+ '"'+ startLimit+ '"' + " : " + limit
		} else if ($(option).data("name") == "bidCount") {
			let startBidCount ="startBidCount"
			let endBidCount = "endBidCount"
			bidCount = $(option).data("value").split("-");
			sendData += ","+ '"'+ startBidCount+ '"' + " : " + bidCount[0]
			+","+ '"'+ endBidCount + '"' + " : " + bidCount[1]				
		} else if ($(option).data("name") == "searchKeyWord") {
			let searchKeyWord = $(option).data("name") 
			sendData += "," + '"'+ searchKeyWord + '"'+ " : " + '"'+ $(option).data("value") + '"'
		} else	{
			sendData = sendData + "," + '"'+ $(option).data("name") + '"'+ " : " + $(option).data("value")				
		}
	}
	
	if(typeof(e) == 'string'){
		sendData += ","+ '"'+ 'pageNo' + '"' + " : " + '"'+ e + '"'
	} else{		
		e.preventDefault();		
		if ($(e.target).data("name") == "sorts" ){		
			sendData += ","+ '"'+ $(e.target).data("name") + '"' + " : " + '"'+ $(e.target).data("value") + '"'
		} else if ($(e.target)[0].name == "listSize") {
			sendData += ","+ '"'+ $(e.target)[0].name + '"' + " : " + '"'+ $(e.target).val() + '"'
		}
	}
	sendData += "}";
	let options = {
		url : "searchActionList.do",
		type : "POST",
		contentType : "application/json",
		data : sendData
	}
	$.ajax(options).done(data => {
		$("#list_view").html(makeAuctionlist(data))
		let count = $(".countdown")
		for(let i = 0 ; i < count.length ; i++) {
			auctionCount($(count[i]),data.list[i].auctionLimitDate)
		}
	})
	.fail(() => {
		 alert("ajax 처리 에러발생");
	 });
}
function makeAuctionlist(data) {
	let $auctionField ="";
	if(data.list.length == 0) {
		$(".pagination").html("");
		return $auctionField = `
				<div class="card-body" >
					<h5 class="card-title m-0" style="text-shadow: 0px 0px 1px black;">
					등록되어있는 경매가 존재하지 않습니다.</h5>
				</div>
		`
	}
	data.list.forEach((list,i) => {
		let maxPrice = comma(uncomma(list.maxPrice));
		$auctionField += `
		<div class='col-md-4 p-2'>
			<div class="card box-shadow">
				<a class="auction_list" href="/doublecome/auction/detailAuction.do?no=${list.auctionNo}&userEmail=${list.userEmail}">
					<img class="card-img-top w-100" style="height: 250px;"
						src="/doublecome/file/downLoadFile.do?fileNo=${list.fileNo}" />
					<p class="mb-1 m-1">${list.auctionTitle}</p>	
					<p class="card-text m-1">${maxPrice}원</p>		
					<div class="auction_condition loadtime">
						<span class="text-left">입찰 ${list.bidCnt}건</span>
						<small class="countdown text-muted m-1"></small>
					</div>
				</a>
			</div>
		</div>
		`
	})
	pg.print($("#content"),data.pr)	
	return $auctionField
}
$(document).on("click",".options", e => {
	let cate = $(e.target).attr("class")
	let arr = $(".cnkfilter");
	if($(e.target).prop('tagName') == "SPAN"){
		if($(e.target).parent().attr("class").endsWith("category ")){
			return false;
		} else if($(e.target).parent().attr("class").endsWith("category selected")){
			return false;
		} else if($(e.target).parent().attr("class").endsWith("category")) {
			return false;
		}
		$(e.target).parent().remove()
		searchAjax(e);
		for (let filter of arr) {
		if ($(e.target).parent().data("value") == filter.dataset.value) {
				$(filter).removeClass("selected");
				$(filter).prev().removeClass("selected")
			}
		}
		return false;
	}
	if(cate.endsWith("category ")){
		return false
	} else if(cate.endsWith("category selected")){
		return false
	} else if(cate.endsWith("category")) {
		return false;
	}
	$(e.target).remove()		
	searchAjax(e);
	for (let filter of arr) {
		if ($(e.target).data("value") == filter.dataset.value) {
			$(filter).removeClass("selected");
			$(filter).prev().removeClass("selected")
		}
	}
})


function selectCheck(e) {
	let $event = $(e.target);
	let clz = $event.attr('class').replace(/cnkfilter/,"")
	if (clz == "category  selected") return;
	if ($event.data("selected") == true) {
		$event.removeClass("selected")
		$event.prev().removeClass("selected")
		$event.data("selected",false) 
		let arr = $(".options");
		for (let filter of arr) {
			if ($event.data("value") == filter.dataset.value) {
				$(filter).remove();
			}
		}
	}
	let chkArr = $("."+clz);
	let arr = $(".options");
	for (let filter of arr) {
		for (let val of chkArr) {
			$(val).removeClass("selected");
			$(val).prev().removeClass("selected");
			if (filter.dataset.value == val.dataset.value){
				filter.remove();				
			}
		}
		$(filter).addClass("selected")
	}
	let title = e.target.title;
	let auctionName = $event.data("name");
	let datavalue = e.target.dataset.value;
	let priceChoice = "";
	if ($event.data("value") == "priceChoice") {
		let num1 = parseInt($("#num1").val())
		let num2 = parseInt($("#num2").val())
		if (num1 >= num2 && num2 !== "") {
			Swal.fire({
				icon: 'error',
				text: '시작금액보다 종료금액이 더 적거나 같을수 없습니다',
				confirmButtonText : '확인'
			})
			return
		}
		if (($("#num2").val()) == "") {
			title = comma(uncomma(num1)) + "원  ~"
			num2 ="123123123"
		} else {			
			title = comma(uncomma(num1)) +" ~ "+ comma(uncomma(num2)) +"원"
		}
		priceChoice = num1 + "-" + num2
		$("#selectbar").append(
			`<a href="/doublecome/auction/searchActionList.do" data-name="${auctionName}" data-value="${priceChoice}" class="options selected ">
			${title}
				<span class="del"></span>
			</a>
				`
		)
		return
	} 
	$event.addClass("selected")		
	$event.prev().addClass("selected")
	$event.data("selected",true)
	$("#selectbar").append(
		`<a href="/doublecome/auction/searchActionList.do" data-value="${datavalue}" data-name="${auctionName}" class="options selected ${clz}">
		${title}
			<span class="del"></span>
		</a>
		`
	)
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

pg.movePage($("#content"),(pageNo)=>{
	searchAjax(pageNo)
})

pg.print($("#content"))