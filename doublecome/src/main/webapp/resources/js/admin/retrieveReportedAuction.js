//체크박스 선택 코드========================================================================
$(".dataContent").on("click","input[type=checkbox]:eq(0)",()=>{
	let $checks =  $(".dataContent input[type=checkbox]")
	if($checks.filter(":eq(0)").prop("checked") == true){
		$checks.prop("checked",true);
	} else{
		$checks.prop("checked",false);	
	}
})


$(".dataContent").on("click","input[type=checkbox]:gt(0)",(e)=>{
	let $allChecks = $(".dataContent input[type=checkbox]");
    let $checks = $allChecks.filter(":gt(0)");
	let $allCheck = $allChecks.filter(":eq(0)");
    let check = $(e.target).prop("checked");
    if(check === true && $checks.filter(":checked").length === $checks.length){
    	$allCheck.prop("checked",true)
    } 

    else if(check === false) {
    	$allCheck.prop("checked",false)
    }
})


   //카테고리 선택 코드=============================================================================================
   $(".categoryBox > div:gt(0) > label ").click((e)=>{
	let $checks = $(".categoryBox input[name=categories]");
	let check = $(e.target).siblings("input").prop("checked");
	console.log($(".categoryBox input[name=categories]:checked").length);
	if(check === false && $(".categoryBox input[name=categories]:checked").length + 1  === $checks.length){
		$("#categoryAll").prop("checked",true)
		$("#categoryAll").closest("div").addClass("categoryClicked");
	} 

	else if(check === true) {
		$("#categoryAll").prop("checked",false)
		$("#categoryAll").closest("div").removeClass("categoryClicked");
	}

	$(e.target).closest("div").toggleClass("categoryClicked")
})

$("#categoryAllLabel").click((e)=>{
	makeParams($("#searchForm"));
	console.log($(e.target).siblings("input").prop("checked"));
	let $checks =  $(".categoryBox input[name=categories]");
	if($(e.target).siblings("input").prop("checked") === true){
		$("#categoryAllLabel").closest("div").removeClass("categoryClicked");
		$checks.prop("checked",false).closest("div").removeClass("categoryClicked");
		
	} else {
		$("#categoryAllLabel").closest("div").addClass("categoryClicked");
		$checks.prop("checked",true).closest("div").addClass("categoryClicked");
	}
})

//succes시=======================================================================
   function success(result){
	console.log(result)
	let $tbody = $("<tbody></tbody>")
	if(result.list.length == 0){
		$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='8'>검색결과가 없습니다.</td></tr>"));
		pg.print($(".adminContent"),result.pr);
		return;
	}
	result.list.forEach((auction)=>{
		$("#dataCount").text(auction.auctionCnt)
		let $tr = $("<tr></tr>").attr("searchType",'auctionNo').attr("keyword",auction.auctionNo)
		$tr.append($(`<td><input type="checkbox" name="removeAuction" value="${auction.auctionNo}"></td>`));
		$tr.append($(`<td>${auction.auctionNo}</td>`));
		$tr.append($(`<td>${auction.auctionTitle}</td>`));
		$tr.append($(`<td>${auction.userEmail}</td>`));
		$tr.append($(`<td>${auction.bidPrice}</td>`));
		$tr.append($(`<td>${auction.categoryName}</td>`));
		$tr.append($(`<td>${format(auction.auctionLimitDate,"ymd")}</td>`));
		$tr.append($(`<td>${auction.auctionReportedCnt}</td>`));
		$tbody.append($tr);
	})
		
	$(".dataContent tbody").html($tbody.html())
	
	pg.print($(".adminContent"),result.pr);
}

//처음 검색==============================================================================================================
(function firstSearch(){
	let categories = new Array;
	$checks = $(".categoryBox input[type=checkbox]");
	$checks.each((index,ele)=>{
		$(ele).prop("checked",true);
		$(ele).closest("div").addClass("categoryClicked");
	})
	search();
	$checks.each((index,ele)=>{
		$(ele).prop("checked",true);
	})
})();

//경매 삭제=============================================================================================================
$(".removeCheckBtn").click(()=>{
	removeAuction();
})

//경매 삭제 함수==========================================================================================================
function removeAuction(){
	let data = {};
	let auctionNos = new Array;
	$(".dataContent input[type=checkbox]:gt(0):checked").each((index,ele)=>{
		auctionNos.push($(ele).val());
	});
	console.log(auctionNos);
	
	
	$.ajax({
		url:"removeAuction.do",
		type:"POST",
		data:JSON.stringify(auctionNos),
		contentType:"application/json",
		success: ()=>{
				search(searchQuery);
		}
	});
} 

//신고목록 갱신==================================================================================================
function listReport(data){

	$.ajax({
		url: "detailReport.do",
		type: "POST",
		data: data,
		success: (result)=>{
			console.log(result);
			let reportContent = $("<div></div>");
			
			result.list.forEach(ele => {			
				let report = ele;
				let content = $("<div></div>"); 
				content.append($(`<div><span>${report.reportSender}</span>
											<span>${format(report.reportRegDate,"ymd")}</span><div>`))
								.append($(`<div><span>${report.reportTypeName}</span></div>`))	    
								.append($(`<div><span>${report.reportContent}</span></div>`))
				
				reportContent.append(content);
			})
			reportContent.append($("<div></div>").addClass("pagination"))
			
			$(".reportContent").html(reportContent.html()).attr("keyword",data.keyword);
			
			pg.print($(".reportContent"),result.pr);	
				    
		}
	})
} 

//신고목록 페이지 이동시============================================================================================
pg.movePage($(".reportContent"),(pageNo)=>{
	let keyword = $(".reportContent").attr("keyword")
	let data = {keyword:keyword,pageNo:pageNo,searchType:"auctionNo"}
	listReport(data)
})

//신고목록 리셋========================================================================================================
function resetReport() {
	$(".reportContent").html("");
}