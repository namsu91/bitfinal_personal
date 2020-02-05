let chatWs = null;

$(() => {
  // 접속할 주소를 설정 : 웹소켓 핸들러 구현 클래스와 연결된 URL
  chatWs = new WebSocket(`wss://doublecome.shop:443/doublecome/ws/chat.do?auctionNo=${auctionNo}`);
  chatWs.onopen = () => {};

  chatWs.onmessage = evt => {
    let dataObj = JSON.parse(evt.data);
    
    switch (dataObj.type) {
	case 'message':		
		message(dataObj);
		break;
		
	case 'entrance':
		$(".btns > div > span").text(dataObj.count)
		break;

	default:
		break;
	}
    
  };

  chatWs.onerror = evt => {};

  chatWs.onclose = () => {};
});

$("#sendChatBtn").click(() => {
  // 웹소켓을 이용해서 서버에 데이터 전송
  send();
});

$(".chatInput textarea").keydown(e => {
  if (e.keyCode == 13) {
    if (!event.shiftKey) {
      event.preventDefault();
      send();
    }
  }
});

function send() {
  let $msg = $(".chatInput textarea");
  let value = $msg.val();
  if (value.trim() != "") {
    chatWs.send(XSSFilter(value));
    $msg.val("");
  }
}

function message(dataObj){
	$chatSpace = $(".chatSpace");
    $chatSpace.append(
      $(
        `<div class="chat">			
					<span style="color: ${dataObj.color}; font-weight: bold">${dataObj.userId}</span>
					<span>${dataObj.msg}</span>
					</div>`
      )
    );
    //스크롤다운
    $chatSpace.scrollTop($chatSpace[0].scrollHeight);
}

function XSSFilter(content) {
	  return content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}