let bidWs = null;

$(() => {
  // 접속할 주소를 설정 : 웹소켓 핸들러 구현 클래스와 연결된 URL
  bidWs = new WebSocket("wss://192.168.0.36:8443/doublecome/bid.do");
  bidWs.onopen = () => {
    console.log("연결성공");
  };

  bidWs.onmessage = evt => {
    console.log("데이터 옴");
    let dataObj = JSON.parse(evt.data);
    
    if (dataObj.msgType == "solo") {
      soloMessage(dataObj);
      return;
    }
    groupMessage(dataObj);
    
  };

  bidWs.onerror = evt => {
    console.log("웹소켓 에러 발생 : " + evt.data);
  };

  bidWs.onclose = () => {
    console.log("연결종료");
  };
});

function bid() {
  let $bid = $(".mSuggestBid input");
  let price = $bid.val().replace(",","");
  let bidType = "bidding";
  
  if(checkPrice($bid) == false) return
  
  if (price != "") {
    bidWs.send(JSON.stringify({ bidType, price }));
    $bid.val("");
  }
}

function purchase() {
  let price = $(".nowBid span:eq(1)").text();
  let bidType = "purchase";
 console.log(price);
  if (price != "") {
    bidWs.send(JSON.stringify({ bidType, price }));
  }
}

// 입찰이벤트
$("#sendBidBtn").click(() => {
  bid();
  $(".realTModal").hide();
});

$("#sendPurchaseBtn").click(() => {
  if (confirm("즉시구매하시겠습니까?")) {
    purchase();
  }
});

// 입찰알림 삭제
function bidRemove($bid) {
  $bid.remove();
}

function soloMessage(dataObj) {
  if (dataObj.access == "denied") {
	  switch (dataObj.code) {
	case '1':
		alert("로그인 후에 이용하실 수 있습니다.");
		break;
	case '2':
		alert("최소 입찰 금액보다 낮은 금액으로 입찰 하실 수 없습니다.");		
		break;
	case '3':
		alert("즉시구매 금액과 다른 금액으로 구매 하실 수 없습니다.");		
		break;
	}
    return;
  }

  if (dataObj.bidType == "bidding") {
    alert("입찰에 성공하셨습니다.");
  } else {
    alert("즉시구매에 성공하셨습니다.");
  }
}

function groupMessage(dataObj){
	if (dataObj.bidType == "bidding") {
	      
	      $bidSpace = $(".bidSpace");
	      $bid = $(`<div class="bid">
							<span>${dataObj.userId}님이 ${dataObj.maxPrice}원 입찰!</span>
						</div>`);
	      $bidSpace.append($bid);
	      setTimeout(() => {
	        bidRemove($bid);
	      }, 5000);

	      $(".maxBidPrice").each((i, ele) => {
	        $(ele).text(dataObj.maxPrice);
	      });
	    } else {
	      $(".auctionInfo").html(
	        $(`      <div style="width: 100%;">
	        <h2>즉시구매로</h2>
	      </div>
	      <div style="width: 100%;">
	        <h2>경매종료</h2>
	      </div>`)
	      );

	      
	      $(".realTModal").remove();

	      $bidSpace = $(".bidSpace");
	      $bid = $(`<div class="bid">
							<span>${dataObj.userId}님이 ${dataObj.maxPrice}원으로 즉시 구매!</span>
						</div>`);
	      $bidSpace.append($bid);
	      setTimeout(() => {
	        bidRemove($bid);
	      }, 5000);
	    }
}

// 입찰가 입력시
$(".mSuggestBid input").focusout((e)=>{
	$(e.target).val(addCommas($(e.target).val()));
})

$(".mSuggestBid input").keyup((e)=>{
	v = $(e.target).val();
	$(e.target).val(v.replace(/[^0-9]/gi,''));
})

// 컴마 넣고 1000원단위 검사
function addCommas(x) {
	 let val = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 console.dir(val)
	 if(!val.endsWith("000")) {
		 alert("입력은 천원단위 입니다.")
		 return "";
	 }
	 return val;
}

function checkPrice($bid) {
	 let minPrice = $(".maxBidPrice").text();
	 if($bid.val() > minPrice){
		 return true;
	 }
	 alert("최고 입찰가보다 큰 금액을 입력해주세요.");
	 $bid.val("");
	 return false;
}


