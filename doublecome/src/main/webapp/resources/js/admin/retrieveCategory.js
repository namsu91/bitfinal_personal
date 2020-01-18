//모달창 띄울시에 데이터 넣기  
$(".dataContent").on("click",(".editBtn"),(e)=>{
	  let $trEles = $(e.target).closest("tr").find("td")
	  let $eles = $trEles.slice(1,3);
	  let categoryCode = $trEles.find("input").val();

	  $(".adminMoadalBack input[type=hidden]").val(categoryCode)

	  let $modalEles = $(".adminMoadalBack input[type=text]");

      for(let i = 0; i < $eles.length; i++){
          $($modalEles[i]).val($($eles[i]).text());
	  } 
	  
	  let radioVal = $(e.target).closest("tr").find("td:eq(3)").text() == "노출" ? 1 : 2;
	  
      $(".adminMoadalBack input[type=radio]").each((index,ele)=>{
        if($(ele).val() == radioVal){
            $(ele).prop("checked",true);
        }
	  })
	  
      $(".adminModal").show();
      $("#eventBtn").text("수정")
      $("#eventBtn").attr("action","editCategory.do");
  })

  //등록버튼시 모달 띄우기
  $(".addCategoryBtn > button").click((e)=>{
      $("#eventBtn").text("등록");
      $("#eventBtn").attr("action","addCategory.do")
      $(".adminModal").show();
  });
  
// 배경 선택시 모달 닫기
  $(".adminMoadalBack").click((e)=>{
      if($(e.target).hasClass("adminMoadalBack")){
    	  modalClose();
      }
  })    
//취소버튼시 모달 닫기
  $("#cancelBtn").click(()=>{
      modalClose();
  })
//모달 닫기
  function modalClose(){
      $(".adminModal").hide();
      let $modalEles = $(".adminMoadalBack input:not(input[type=radio])");
      $modalEles.val("");
  }
//모달 이벤트버튼 클릭시
  $(".adminModal").on("click","#eventBtn",()=>{
	  eventCategory($("#eventBtn").attr("action"))
  })
  
  let contextPath = window.location.pathname.substr(0,window.location.pathname.indexOf("/",2));
  
  //최초 로딩
  search();
  
  
  //성공시
  function success(result){

			console.log(result)
			let $tbody = $("<tbody></tbody>")
			
			if(result.list.length == 0){
				$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='6'>검색결과가 없습니다.</td></tr>"));
				pg.print($(".adminContent"),result.pr);
				return;
			}
			
			for(let i = 0; i < result.list.length; i++){				
				let cat = result.list[i]
				let display = cat.categoryDisplay == 1 ? "노출" : "비노출";
				$("#dataCount").text(cat.categoryCnt)
				
				let $tr = $("<tr></tr>")
				$tr.append($(`<td><input type="checkbox" name="removeCategory" value="${cat.categoryCode}"></td>`));
				$tr.append($(`<td>${cat.categoryName}</td>`));
				$tr.append($(`<td>${cat.categoryOrder}</td>`));
				$tr.append($(`<td>${display}</td>`));
				$tr.append($(`<td>${cat.categoryAuctionCnt}</td>`));
				$tr.append($(`<td><button class="editBtn">관리</button></td>`));
				$tbody.append($tr);
			}
			
			$(".dataContent tbody").html($tbody.html())		
			pg.print($(".adminContent"),result.pr);
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
  
// 등록 및 수정  ajax
  function eventCategory(url) {	  
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
  
//카테고리 삭제=============================================================================================================
  $(".removeCategoriesBtn").click(()=>{
	  removeCategories();
  })

  function removeCategories(){
  	let data = {};
  	let categoryCodes = new Array;
  	$(".dataContent input[type=checkbox]:gt(0):checked").each((index,ele)=>{
  		categoryCodes.push($(ele).val());
  	});
  	console.log(categoryCodes);
	
  	
  	$.ajax({
  		url:"removeCategories.do",
  		type:"POST",
  		data:JSON.stringify(categoryCodes),
  		contentType:"application/json",
  		success: ()=>{
  			 search();
			 modalClose();
  		}
  	});
  } 
  
  
  
  
  
