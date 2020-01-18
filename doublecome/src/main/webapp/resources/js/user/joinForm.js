jQuery.ajaxSetup({cache:false});

function avtiveBtn() {
  if($('input').val() !== "")
  $('#joinBtn').attr( 'disabled', false )
}

function inAvtiveBtn() {
  $('#joinBtn').attr( 'disabled', true )
}

function nullCheck() {
  if( $('#userEmail').val()==""){ $('#userEmail').next().text('메일을 입력하세요.'); return false; }
  if( $('#userPass').val()==""){  $('#userPass').next().text('비밀 번호를 입력하세요.'); return false; }
  if( $('#userPassConfirm').val()==""){  $('#userPassConfirm').next().text('비밀 번호를 한번더 입력하세요.'); return false; }
  if( $('#userPhnum').val()==""){  $('#userPhnum').next().text('핸드폰 번호를 입력하세요.'); return false; }
  if( $('#userNickname').val()==""){  $('#userNickname').next().text('별명을 입력하세요.'); return false; }

  return true;
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


inAvtiveBtn();




$('#userEmail').keyup( (e) => {
    let emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
    
    if(!emailRule.test($("input[id='userEmail']").val()) ) {            
      //경고
      $('#userEmail').next().text('잘못된 이메일 형식입니다.');
      inAvtiveBtn();
      console.log($("input[id='userEmail']").val() ,'email.val()')
      console.log(uniqueCheck("/doublecome/user/checkEmail.do", $("input[id='userEmail']").val()));
      
    }else if( uniqueCheck("/doublecome/user/checkEmail.do", $("input[id='userEmail']").val() ) == 1) {
      $('#userEmail').next().text('이미 등록된 이메일입니다.'); inAvtiveBtn();
    }else { $('#userEmail').next().text(""); avtiveBtn(); }
  });
  
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
    

  


  