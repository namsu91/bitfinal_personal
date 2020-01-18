//localStorage.clear();

function swalAlert(msg) {
	Swal.fire(msg)
}

$(".category").click(() => {
	$(".catg").val($("select[name=catg]").val())
})

$('#summernote').summernote(
	{
		height : 400,
		width : 820,
	    disableResize: true,
	    disableResizeEditor: true,
	    resize: false,
        toolbar: [
            ['Font Style', ['fontname']],
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['paragraph']],
            ['height', ['height']],
            ['Misc', ['fullscreen']]
         ]
});

let sysdate = new Date()
let maxdate = new Date()

sysdate.setHours(sysdate.getHours())
maxdate.setDate(maxdate.getDate() + 7)
maxdate.setHours(maxdate.getHours() + 6)
$(function () {
    $('#datetimepicker').datetimepicker({
    	format: 'YYYY-MM-DD HH:mm',
    	minDate:sysdate,
        maxDate:maxdate,
        defaultDate:sysdate
    });
});
function addCommas(x) {
	 let val = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 if(!val.endsWith("000")) {
		 alert("입력은 천원단위 입니다.")
		 return;
	 }
	 return val;
}
 
function removeCommas(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
}

$(".start, .buy").on("focus", function() {
	    var x = $(this).val();
	    x = removeCommas(x);
	    $(this).val(x);
	}).on("focusout", function() {
	    var x = $(this).val();
	    if(x && x.length > 0) {
	        if(!$.isNumeric(x)) {
	            x = x.replace(/[^0-9]/g,"");
	        }
	        x = addCommas(x);
	        $(this).val(x);
	    }
	}).on("keyup", function() {
	    $(this).val($(this).val().replace(/[^0-9]/g,""));
	});
	
$(".start, .buy").click((e) => {
	   $($(e.target)).val("")
})

//$(".fileUp").hover(() => {
//	$(".hoverNotification").show();
//},() => {
//  $(".hoverNotification").hide();
//})

$(".fileUpIcon").mouseenter(() => {
	$(".hoverNotification").show();
})
$(".fileUpIcon").mouseleave(() => {
	$(".hoverNotification").hide();
})

$(".button").click(() => {
	console.log($(".img_wrap").html())
	$div = $(".start").val().replace(/[^0-9]/g,"")
	$div2 = $(".buy").val().replace(/[^0-9]/g,"")
	if ($(".start").val() == "") {
		swalAlert("경매 시작가를 입력해주세요.")
	} else if ($(".buy").val() == "") {
		swalAlert("즉시 구매가를 입력해주세요.")
	} else if ($("#auctiontitle").val() == "") {
		swalAlert("제목을 입력해주세요.")
	} else if ($(".catg").val() == null || $(".catg").val() == 0) {
		swalAlert("카테고리를 선택해주세요.")
	} else if (parseInt($div) >= parseInt($div2)) {
		swalAlert("즉시 구매가는 경매 시작가보다 높아야 합니다.")
	} else if (localStorage.length == 0) {
		swalAlert("최소한 한장의 사진이 첨부되어야 합니다.")
	} else {
		swalAlert("경매 등록이 완료되었습니다.")
		$(".swal2-confirm").click(() => {
			$.ajax({
				  type: "POST",
				  url: "fileTag.do",
				  data: {
					  data : localStorage.getItem("allImages")
				  },
				  success: () => {
					  $("#insertForm").submit()				  
				  }
				});
		})
	}
})


$(".upload_btn").click(() => {
	if (localStorage.length) {
		localStorage.clear();
		window.open("uploadPhoto.do", "uploadPhoto", "width=1000, height=800, location=no, left=400")
	} else {
		window.open("uploadPhoto.do", "uploadPhoto", "width=1000, height=800, location=no, left=400")
	}
})
		
$(document).on("click", ".imgContent", (e) => {
	console.log(localStorage.length)
	console.log($(e.target).data("filename"))
	console.log(localStorage.getItem("allImages"))
	console.log(localStorage.getItem())
//	localStorage.removeItem($(e.target).data("filename"))
})

$(".note-dropzone").remove();