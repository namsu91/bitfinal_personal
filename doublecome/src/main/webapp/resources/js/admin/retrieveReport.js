
//모달창 띄울 시 데이터 입력
$(".dataContent").on("click",".editBtn",(e)=>{
    let $trEles = $(e.target).closest("tr").find("td")
    let $eles = $trEles.slice(1,3);
    let reportTypeCode = $trEles.find("input").val();

    $(".adminModalBack input[type=hidden]").val(reportTypeCode)

    let $modalEles = $(".adminModalBack input[type=text]");
    console.log($modalEles);
    
    for(let i = 0; i < $eles.length; i++){
        $($modalEles[i]).val($($eles[i]).text());
    } 

      $(".adminModal").show();
      $("#eventBtn").text("수정");
      $("#eventBtn").attr("action","editReportType.do")
  })

  //등록버튼시 모달 띄우기
  $(".addReportBtn > button").click((e)=>{
      $("#eventBtn").text("등록");
      $("#eventBtn").attr("action","addReportType.do")
      $(".adminModal").show();
  });

  //모달창 닫기
  $(".adminModalBack").click((e)=>{
      if($(e.target).hasClass("adminModalBack")){
          modalClose();
      }
  })    

  //취소버튼 클릭시 모달 닫기
  $("#cancelBtn").click(()=>{
      modalClose();
  })

  //모달 이벤트버튼 클릭시
  $(".adminModal").on("click","#eventBtn",()=>{
    eventReportType($("#eventBtn").attr("action"))
  })

  //최초 로딩
  search();
  
  //성공시
  function success(result){
	console.log(result)
	let $tbody = $("<tbody></tbody>")
	
	if(result.list.length == 0){
		$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='5'>검색결과가 없습니다.</td></tr>"));
		pg.print($(".adminContent"),result.pr);
		return;
	}
	
	for(let i = 0; i < result.list.length; i++){				
		let reportType = result.list[i]
		$("#dataCount").text(reportType.reportTypeCnt)
		
		let $tr = $("<tr></tr>")
		$tr.append($(`<td><input type="checkbox" name="removeCategory" value="${reportType.reportTypeCode}"></td>`));
		$tr.append($(`<td>${reportType.reportTypeName}</td>`));
		$tr.append($(`<td>${reportType.reportTypeOrder}</td>`));
		$tr.append($(`<td>${reportType.reportTypeReportCnt}</td>`));
		$tr.append($(`<td><button class="editBtn">관리</button></td>`));
		$tbody.append($tr);
	}
		
	$(".dataContent tbody").html($tbody.html())		
	pg.print($(".adminContent"),result.pr);
		
  }



  function modalClose(){
      $(".adminModal").hide();
      let $modalEles = $(".adminMoadalBack input");
      $modalEles.val("");
  }

  // 등록 및 수정  ajax
  function eventReportType(url) {	  
    let data = makeParams($(".adminModal form"));
        $.ajax({
            url:url,
            type:"POST",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:()=>{
                search();
                modalClose();
            }
        })
    }       


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

  
//신고항목 삭제=============================================================================================================
$(".removeReportTypesBtn").click(()=>{
    removeReportTypes();
})

function removeReportTypes(){
    let data = {};
    let reportTypeCodes = new Array;
    $(".dataContent input[type=checkbox]:gt(0):checked").each((index,ele)=>{
        reportTypeCodes.push($(ele).val());
    });
    console.log(reportTypeCodes);
  
    
    $.ajax({
        url:"removeReportTypes.do",
        type:"POST",
        data:JSON.stringify(reportTypeCodes),
        contentType:"application/json",
        success: ()=>{
             search();
           modalClose();
        }
    });
} 