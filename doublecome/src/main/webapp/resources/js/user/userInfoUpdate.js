//파일 업로드
(function(){
  let setEventListeners = function(uploadBox) {
    let previewContainer = uploadBox.querySelectorAll('.jst-preview')[0];
    let fileInputs = uploadBox.querySelectorAll('[type="file"]');
    
    let previewImage = function (event) {
      let file = event.target.files[0];
      let imageType = /image.*/;
      
      if(typeof FileReader !== 'undefined' && file.type.match(imageType)) {
        let reader = new FileReader();

        reader.onload = function() {
          previewContainer.style.backgroundImage = 'url(' + reader.result + ')';  
        };
        
        reader.readAsDataURL(file);
      }
    };
    
    for(let k = 0; k < fileInputs.length; k++) {
      fileInputs[k].addEventListener('change', previewImage);
    }
  };

  let uploadBoxes = document.querySelectorAll('.js-fileupload');

  for(let j = 0; j < uploadBoxes.length; j++) {
    let uploadBox = uploadBoxes[j];
    
    setEventListeners(uploadBox);
  }
}());
  
 //validation check
  
  
function avtiveBtn() {
	 /* if($('input').val() !== "")*/
  $('#updateFormBtn').attr( 'disabled', false )
}

function inAvtiveBtn() {
  $('#updateFormBtn').attr( 'disabled', true )
}
	
	
function uniqueCheck(url, val) {
	  let r = 0;
	  $.ajax({
	    url: url,
	    data: { param: val},
	    async: false,
	    cache : false,
	    type: 'POST',
    success: (result) => {
                          console.log(result, "uniqueCheck", typeof(result));
                           
                          r = result;
                        }
  })

  return r;
};

$('#userPhnum').keyup( (e) => {
    let phnumRule = /^\d{3}\d{3,4}\d{4}$/;// 핸드폰 번호 정규식
    
    if(!phnumRule.test($("input[id='userPhnum']").val()) ) {            
    //경고
      $('#userPhnum').next().text('잘못된 번호 형식입니다.');
      inAvtiveBtn();          
    }else if(uniqueCheck("/doublecome/user/checkPhnum.do", $("input[id='userPhnum']").val()) == 1) {
      $('#userPhnum').next().text('이미 등록된 번호입니다.');
      inAvtiveBtn();
    }else { $('#userPhnum').next().text(""); avtiveBtn(); }

});

$('#userNickname').keyup( (e) => {
  let nicknameRule = /^[a-zA-Z0-9]{3,21}|[A-Za-z가-힣0-9]{2,7}$/g;// 별명 입력 체크식
  
  if(!nicknameRule.test($("input[id='userNickname']").val()) ) {            
  //경고
    $('#userNickname').next().text('사용 할 수 없는 별명입니다.');
    inAvtiveBtn();          
  }else if(uniqueCheck("/doublecome/user/checkNickname.do", $("input[id='userNickname']").val()) == 1) {
    $('#userNickname').next().text('이미 등록된 별명입니다.');
    inAvtiveBtn();
  }else { $('#userNickname').next().text(""); avtiveBtn(); }

});


$('#userPass').keyup( (e) => {
    /* function chkPwd(){ */
      
let pw = $('#userPass').val();

let num = pw.search(/[0-9]/g);

let eng = pw.search(/[a-z]/ig);

let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 


if(pw.length < 8 || pw.length > 20 ){
$('#userPassConfirm').next().text("8자리 ~ 20자리 이내로 입력해주세요.");
inAvtiveBtn();

} else if(pw.search(/₩s/) != -1 ){
$('#userPassConfirm').next().text("비밀번호는 공백업이 입력해주세요.");

inAvtiveBtn();

}else if(num < 0 || eng < 0 || spe < 0  ){
$('#userPassConfirm').next().text("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
inAvtiveBtn();
}else{ 
	$('#userPassConfirm').next().text("");
	$('#userPassConfirm').keyup( (e) => {
		if($('#userPass').val() !== $('#userPassConfirm').val() ) {      
		$('#userPassConfirm').next().text("비밀 번호가 다릅니다");
		inAvtiveBtn();
		}else { $('#userPassConfirm').next().text(""); avtiveBtn(); }
		});}
});

//사진 지우기
/*$('.m-upload__preview').click( () => {	
	let result = confirm("등록한 사진을 지웁니다");
	if(result ){		
		$.ajax({
			url:"/doublecome/user/deleteProfile.do",
			data:{ email :$('#userEmail').val()},
			success:(result)=> {
				console.log(result ,"result");
				console.log($('#userEmail').val(), "$('#userEmail').val()" )
				alert("사진을 지우셨습니다")
				$('.m-upload__preview jst-preview').attr('style', "background-image:url(/doublecome/file/downLoadFile.do?fileNo=1);" )
			}
		});
	}
} )*/
$('.m-upload__preview').click( () => {	
	Swal.fire({
        title: '사진을 지우시겠습니까',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.value) {
        	$.ajax({
    			url:"/doublecome/user/deleteProfile.do",
    			data:{ email :$('#userEmail').val()},
    			success:(result)=> {
    				console.log(result ,"result");
    				console.log($('#userEmail').val(), "$('#userEmail').val()" )
    				Swal.fire("사진을 지우셨습니다")
    				$('.m-upload__preview jst-preview').attr('style', "background-image:url(/doublecome/file/downLoadFile.do?fileNo=1);" )
    			}
    		});
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        	return false;
        }
      })
})

  