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


// 검색 ajax성공시==============================================================================================
function success(result){
	console.log(result)
	 let $tbody = $("<tbody></tbody>")
	 if(result.list.length == 0){
	 	$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='5'>검색결과가 없습니다.</td></tr>"));
	 	pg.print($(".adminContent"),result.pr);
	 	return;
	 }
	 result.list.forEach((deal)=>{
        $("#dataCount").text(deal.dealCnt)
        let dealCondition = deal.dealCondition == 1 ? '거래중' : 
                            deal.dealCondition == 2 ? '정상거래완료' :
                            deal.dealCondition == 3 ? '거래취소' : '신고거래';
	 	let $tr = $("<tr></tr>")
	 	$tr.append($(`<td>${deal.dealNo}</td>`));
	 	$tr.append($(`<td>${deal.auctionTitle}</td>`));
	 	$tr.append($(`<td>${deal.userEmailBuyer}</td>`));
	 	$tr.append($(`<td>${deal.userEmailBuyer}</td>`));
	 	$tr.append($(`<td>${dealCondition}</td>`));
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

