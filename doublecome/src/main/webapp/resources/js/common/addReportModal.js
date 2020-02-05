$("#openReportModal").click(()=>{
    $(".addReportModal").show();
})

$(".cancleReportBtn").click(()=>{
    closeReportModal();
})

$(".addReportModalBack").click((e)=>{
    if($(e.target).attr("class") == 'addReportModalBack'){
    closeReportModal();
    }
})

function closeReportModal() {
	for (let i = 1; i <= $('input[name="reportTypeCode"]').length; i++){
		if ($(`#report${i}`).prop("checked")){
			$(`#report${i}`).prop("checked", false);
		}
	}
    let $modal = $(".addReportModal")
    $modal.hide();
    $modal.find("textarea").val("");
    
}


$(document).on("click", ".reportBtn", () => { 
	$(".auctionNo").val(no); 
	$(".reportReceiver").val(email); 
	$('#reportForm').attr("action", `${contextPath}/admin/addAuctionReport.do`); 
});

$("body").on("click", ".reportButton", (e) => {
	 $(".addReportModal").show();
	 $('input[name=auctionNo]').val($(e.target).data("no"));
	 $('#reportForm').attr("action", `${contextPath}/admin/addReport.do`);
});

$(".addReportBtn").click((e) => {
	let flag = false;
	for (let i = 1; i <= $('input[name="reportTypeCode"]').length; i++){
		if ($(`#report${i}`).prop("checked")){
			flag = true;
		}
	}
	if (!flag){
		Swal.fire("신고 타입을 선택해주세요.");
	}
	$("#reportForm")[0].submit();
});

