jQuery.ajaxSetup({cache:false});

let confrim = 0;

function avtiveBtn() {
  if($('input').val() !== "")
  $('#joinBtn').attr( 'disabled', false )
  confrim = 1;
}

function inAvtiveBtn() {
  $('#joinBtn').attr( 'disabled', true )
  confrim = 0;
}

function nullCheck() {
  if( $('#userEmail').val()==""){ $('#userEmail').next().text('메일을 입력하세요.'); return false; }
  if( $('#userPass').val()==""){  $('#userPass').next().text('비밀 번호를 입력하세요.'); return false; }
  if( $('#userPassConfirm').val()==""){  $('#userPassConfirm').next().text('비밀 번호를 한번더 입력하세요.'); return false; }
  if( $('#userPhnum').val()==""){  $('#userPhnum').next().text('핸드폰 번호를 입력하세요.'); return false; }
  if( $('#userNickname').val()==""){  $('#userNickname').next().text('별명을 입력하세요.'); return false; }

  return true;
}



inAvtiveBtn();


          

$('#userPass').keyup( (e) => {
            /* function chkPwd(){ */
              
    var pw = $('#userPass').val();
    
    var num = pw.search(/[0-9]/g);
    
    var eng = pw.search(/[a-z]/ig);
    
    var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi); 
  
    
    if(pw.length < 8 || pw.length > 20 ){
      $('#userPass').next().text("8자리 ~ 20자리 이내로 입력해주세요.");
      inAvtiveBtn();
      
    } else if(pw.search(/₩s/) != -1 ){
      $('#userPass').next().text("비밀번호는 공백업이 입력해주세요.");
      
      inAvtiveBtn();
      
    }else if(num < 0 || eng < 0 || spe < 0  ){
      $('#userPass').next().text("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      inAvtiveBtn();
    }else{ $('#userPass').next().text("");
           avtiveBtn();}
});
  
  
    
$('#userPassConfirm').keyup( (e) => {
  if($('#userPass').val() !== $('#userPassConfirm').val() ) {      
    $('#userPassConfirm').next().text("비밀 번호가 다릅니다");
    inAvtiveBtn();
  }else { $('#userPassConfirm').next().text(""); avtiveBtn(); }
});
    

 $('#joinBtn').click( (e)=> {
	 if(confirm === 0)
	 e.preventDefault
	 
 })


  