let searchQuery = {};

$(".parentItem").click((e) => {
    let target = $(e.target).closest(".parentItem");
    target.toggleClass("selected");
    target.siblings().toggle();
    target.find("svg:last").toggleClass("fa-chevron-right");
    target.find("svg:last").toggleClass("fa-chevron-down");
})

$(".moveItem").click((e) => {
	location.href = $(e.target).closest(".moveItem").data("action");
})

$($(".moveItem")[$("#innerIndex").val()]).addClass("clicked");


let $parentItem = $($(".moveItem")[$("#innerIndex").val()]).siblings(".parentItem");
$parentItem.toggleClass("selected").siblings().toggle();
$parentItem.find("svg:last").toggleClass("fa-chevron-right").toggleClass("fa-chevron-down");

$("#searchBtn").click(()=>{
	search();
})

//검색 함수
function search(data){
	let $form = $("#searchForm");
	
	if(data == undefined){
		data = makeParams($form);		
	}
	
	let url = $form.data("action");
	
	
	$.ajax({
		url:url,
		type:"POST",
		data:JSON.stringify(data),
		contentType:"application/json",
		success: success
	})
	
	searchQuery = data
	
	resetParams($form)
}




//검색 조건을 객체로 만드는 함수
function makeParams($form){
	let data = {};
	let $formData = $form.find("input[type=text], input[type=date], input[type=hidden], input[type=radio]:checked, select");
	let $formDataCheck = $form.find("input[type=checkbox]:checked");
	

	data["keyword"] = "";
	
	data["categories"] = [-1];
	
	$formData.each((index,ele)=>{
		if(ele.value != ""){
			data[ele.name] = ele.value;			
		}
	});
	
	let names = new Array;
	$formDataCheck.each((index,ele)=>{
		if(ele.name == "") return true;
		if(names.includes(ele.name)){
			data[ele.name].push(ele.value) 
		} else {
			data[ele.name] = [ele.value];
			names.push(ele.name)
		}
	});
	
	
	
	//리스트사이즈 유지
	data.listSize = $("#listSize").val(); 
	
	console.log(data)
	return data;
}

//검색창 리셋
function resetParams($form){
	let $formDataSelect = $form.find("select");
	let $formDataInput = $form.find("input").not("input[type=checkbox], input[type=hidden]");
	let $formDataCheck = $form.find("input[type=checkbox]:checked");
	
	$formDataInput.each((index,ele)=>{
		ele.value = "";
	});
	
	$formDataSelect.each((index,ele)=>{
		ele.selectedIndex = 0;
	});
	

//	$formDataCheck.each((index,ele)=>{
//		$(ele).prop("checked",false);
//	});
}

//페이지 이동
pg.movePage($(".adminContent"),(pageNo) =>{
	searchQuery.pageNo = pageNo;
	search(searchQuery);
})

//리스트사이즈 변경
$("#listSize").on("change",()=>{
	searchQuery.pageNo = 1;
	searchQuery.listSize = $("#listSize").val(); 
	search(searchQuery);
})

//정렬 이벤트
$(".dataFilters li").click((e)=>{
	searchQuery.pageNo = 1;
	searchQuery.sort = $(e.target).data("sort");
	search(searchQuery);
})

