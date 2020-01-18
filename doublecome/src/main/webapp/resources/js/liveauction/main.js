let key;
let cnt = 0;
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




