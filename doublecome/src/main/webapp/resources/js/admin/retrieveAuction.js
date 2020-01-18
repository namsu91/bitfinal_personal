	//처음 검색
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
			$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='6'>검색결과가 없습니다.</td></tr>"));
			pg.print($(".adminContent"),result.pr);
			return;
		}
		result.list.forEach((auction)=>{
			$("#dataCount").text(auction.auctionCnt)
			let $tr = $("<tr></tr>")
			$tr.append($(`<td>${auction.auctionNo}</td>`));
			$tr.append($(`<td>${auction.auctionTitle}</td>`));
			$tr.append($(`<td>${auction.userEmail}</td>`));
			$tr.append($(`<td>${auction.bidPrice}</td>`));
			$tr.append($(`<td>${auction.categoryName}</td>`));
			$tr.append($(`<td>${format(auction.auctionLimitDate,"ymd")}</td>`));
			$tbody.append($tr);
		})
			
		$(".dataContent tbody").html($tbody.html())
		
		pg.print($(".adminContent"),result.pr);
   }
