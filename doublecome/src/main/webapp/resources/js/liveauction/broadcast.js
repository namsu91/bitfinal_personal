/*
 * (C) Copyright 2014-2015 Kurento (http://kurento.org/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var ws = new WebSocket("wss://" + "doublecome.shop:20443" + "/one2many");

var video;
var webRtcPeer;

window.onload = function() {
	video = document.getElementById("video");
	if(type == "presenter"){
		presenter();	  
	} else if(type == "viewer"){
		viewer();		
	}
//  document.getElementById("call").addEventListener("click", function() {
//	  presenter();
//  });
//	document.getElementById("viewer").addEventListener("click", function() {
//		viewer();
//	});
//	document.getElementById("terminate").addEventListener("click", function() {
//		stop();
//	});
};


//var checkUnload = true;
//$(window).on("beforeunload", function(){
//    if(checkUnload) return "이 페이지를 벗어나면 작성된 내용은 저장되지 않습니다.";
//    closeBroadCast();
//    ws.close();
//});

//$(window).on("beforeunload", function() { 
//
//    if(type == "presenter"){
//    	if(confirm('방송을 종료하시겠습니까?')){
//    		ws.close();
//    		return true;
//    	}
//    }
//
//}) 

window.onbeforeunload = function() {  
	if(type == 'presenter'){
		closeBroadCast();
		setTimeout(() => {
			Swal.fire("방송이 종료되었습니다.")		
		}, 0);
	}
	
    ws.close();
	
};

ws.onmessage = function(message) {
  var parsedMessage = JSON.parse(message.data);
  console.info("Received message: " + message.data);

  switch (parsedMessage.id) {
    case "presenterResponse":
      presenterResponse(parsedMessage);
      break;
    case "viewerResponse":
      viewerResponse(parsedMessage);
      break;
    case "stopCommunication":
      dispose();
      break;
    case "iceCandidate":
      webRtcPeer.addIceCandidate(parsedMessage.candidate);
      break;
    default:
      console.error("Unrecognized message", parsedMessage);
  }
};

function presenterResponse(message) {
  if (message.response != "accepted") {
    var errorMsg = message.message ? message.message : "Unknow error";
    console.warn("Call not accepted for the following reason: " + errorMsg);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function viewerResponse(message) {
  if (message.response != "accepted") {
    var errorMsg = message.message ? message.message : "Unknow error";
    console.warn("Call not accepted for the following reason: " + errorMsg);
    dispose();
  } else {
    webRtcPeer.processAnswer(message.sdpAnswer);
  }
}

function presenter() {
  if (!webRtcPeer) {
    showSpinner(video);

    var options = {
      localVideo: video,
      onicecandidate: onIceCandidate
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options, function(
      error
    ) {
      if (error) return onError(error);

      this.generateOffer(onOfferPresenter);
    });
  }
}

function onOfferPresenter(error, offerSdp) {
  if (error) return onError(error);

  var message = {
    id: "presenter",
    sdpOffer: offerSdp
  };
  sendMessage(message);
}

function viewer() {
  if (!webRtcPeer) {
    showSpinner(video);

    var options = {
      remoteVideo: video,
      onicecandidate: onIceCandidate
    };

    webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(
      error
    ) {
      if (error) return onError(error);

      this.generateOffer(onOfferViewer);
    });
  }
}

function onOfferViewer(error, offerSdp) {
  if (error) return onError(error);

  var message = {
    id: "viewer",
    sdpOffer: offerSdp
  };
  sendMessage(message);
}

function onIceCandidate(candidate) {
	sleep(300)
		console.log("Local candidate" + JSON.stringify(candidate));
	  
		var message = {
		  id: "onIceCandidate",
		  candidate: candidate
		};
		sendMessage(message);
		play();
}

function stop() {
  if (webRtcPeer) {
    var message = {
      id: "stop"
    };
    sendMessage(message);
    dispose();
  }
}

function dispose() {
  if (webRtcPeer) {
    webRtcPeer.dispose();
    webRtcPeer = null;
  }
  hideSpinner(video);
}

function sendMessage(message) {
  var jsonMessage = JSON.stringify(message);
  console.log("Sending message: " + jsonMessage);
  ws.send(jsonMessage);
}

function showSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].poster = createPath('resources/images/liveauction/transparent-1px.png');
    arguments[i].style.background =
      `center transparent url({createPath('resources/images/liveauction/spinner.gif')}) no-repeat`;
  }
}

function hideSpinner() {
  for (var i = 0; i < arguments.length; i++) {
    arguments[i].src = "";
    arguments[i].poster = createPath('resources/images/liveauction/webrtc.png');
    arguments[i].style.background = "";
  }
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', "click", function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

function closeBroadCast(){
	$.ajax({
		url : 'close.do',
		type : "post",
		data : {
			auctionNo : auctionNo
		}
	})
}

function createPath(path){
	let hostIndex = location.href.indexOf( location.host ) + location.host.length;
	let oripath = location.href.substring( 0, location.href.indexOf('/', hostIndex + 1));
	return oripath + '/' + path
}