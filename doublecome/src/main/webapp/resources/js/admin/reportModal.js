$(".dataContent").on("click"," tr > td:not(td:has(input))",(e)=>{
	let data = {};
	data.pageNo = 1;
	data.searchType = $(e.target).closest("tr").attr("searchType");
	data.keyword = $(e.target).closest("tr").attr("keyword");
	console.log(data.keyword)
	listReport(data);
	$(".reportModal").show();
})

$(document).click((e)=>{
	if($(e.target).attr("class") == "reportModalBack"){
		$(".reportModal").hide();	
		resetReport();
	}
})