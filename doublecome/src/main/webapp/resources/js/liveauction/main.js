

let key;
let cnt = 0;

let limit = new Date($('.counter-class').data('date'));
let now = new Date($('.counter-class').data('now')) 
//해당글 리밋시간 지날시 모든이벤트 off

let timer = limit.getTime() - now.getTime() - 1000;
if (timer > 0) {
	setTimeout(() => {
		endAuction("기한 마감으로")
	}, timer)
}


$("#openModalBtn").click(() => {
	$(".realTModal").show();
})

$(".closeModalBtn").click(() => {
	$(".realTModal").hide();
})

$(document).ready(function(){
    loopcounter('counter-class');
});

function play(){
	cnt++;
	if(cnt == 4){
		setTimeout((cnt) => {
				video.play();
		}, 100);
	}		
}

$("#video").mousemove(()=>{
	if(key){
		clearTimeout(key);
	}
	$(".btns").fadeIn();
	key = setTimeout(() => {
		$(".btns").fadeOut(80);
	}, 2600);
})


$("#video").mouseout(()=>{
	setTimeout(() => {
		$(".btns").fadeOut(100);
	}, 100)
})


function sleep(num){	//[1/1000초]
	let now = new Date();
	let stop = now.getTime() + num;
	while(true){
		now = new Date();
		if(now.getTime() > stop)return;
	}
}

$("#endBroadCastBtn").click(()=>{
	stop();
})




