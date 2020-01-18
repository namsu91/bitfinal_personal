let chatWs = null;

$(() => {
  // 접속할 주소를 설정 : 웹소켓 핸들러 구현 클래스와 연결된 URL
  chatWs = new WebSocket("wss://192.168.0.36:8443/doublecome/chat.do");
  chatWs.onopen = () => {
    console.log("연결성공");
  };

  chatWs.onmessage = evt => {
    let dataObj = JSON.parse(evt.data);
    
    switch (dataObj.type) {
	case 'message':		
		message(dataObj);
		break;
		
	case 'entrance':
		console.log(dataObj.count + "명")
		$(".btns > div > span").text(dataObj.count)
		break;

	default:
		break;
	}
    
  };

  chatWs.onerror = evt => {
    console.log("웹소켓 에러 발생 : " + evt.data);
  };

  chatWs.onclose = () => {
    console.log("연결종료");
  };
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
    chatWs.send(value);
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