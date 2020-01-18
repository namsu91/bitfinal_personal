$(".topContent>div:nth-child(4)>div:first").mouseover(()=>{
    $(".categoryBar").show();
})
$(".categoryBar").parent().mouseleave(()=>{
    $(".categoryBar").hide()
});
$("#movetomain").click(() => {
	location.href= '/doublecome/main.do';
})

$(() => {
	ws = new WebSocket("wss://192.168.0.36:8443/doublecome/chatting.do");	
	ws.onopen = () => {
	};
	
	ws.onmessage = (evt) => {
		let userEmail = $(".topbar .readsCount").data("id");
		if (userEmail != null) {
			
		  let options = {
				url : "/doublecome/chatting/readsCount.do",
				type : "POST",
				contentType : "application/json",
				data : userEmail
		  }
		  $.ajax(options).done(data => {
			  readsCount(data)
		  }).fail(() => {
				 alert("ajax 처리 에러발생");
		  });
		}
	};
	ws.onerror = (evt) => {
		$("#result").append("<div>웹소켓 에러 발생 : " + evt.data + "</div>");
	};
	ws.onclose = () => {
		$("#result").append("<div>웹소켓 연결 종료</div>");
	};
	
});
$(document).ready(() => {
	let userEmail = $(".topbar .readsCount").data("id");
	if (userEmail != null) {
		
	  let options = {
			url : "/doublecome/chatting/readsCount.do",
			type : "POST",
			contentType : "application/json",
			data : userEmail
	  }
	  $.ajax(options).done(data => {
		  readsCount(data)
	  }).fail(() => {
			 alert("ajax 처리 에러발생");
	  });
	}
})
function readsCount(data) {
	 let sellerCount = 0;
	  let buyerCount = 0;
	  if (data.readsSeller != 0) {
		  sellerCount = data.readsSeller;
	  }
	  if (data.readsBuyer != 0) {
		  buyerCount = data.readsBuyer;
	  }
	  let readsCount = sellerCount + buyerCount;
	  $(".topbar .readsCount").attr("readsCount", readsCount);
	  if ($(".topbar .readsCount").attr("readsCount")) {
		  $(".topbar .readsCount").addClass("hideCount")
	  } else {
		  $(".topbar .readsCount").removeClass("hideCount")
	  }
}
$(".topContent .searchField").keypress((e) =>{
	if ($(e.target).val() != null){
		if(e.keyCode == 13) {
			let value = $(e.target).val();
			location.href = `/doublecome/auction/searchAuction.do?searchKeyWord=${value}`
		}
	}
})
$(".topContent .searchField").next().click(e => {
	let value = $(e.target).prev().val();
	if (value != null) {		
		location.href=`/doublecome/auction/searchAuction.do?searchKeyWord=${value}`
	}
})