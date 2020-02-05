//방송 컨텐츠 클릭시 함수
$(".onAir").click((e)=>{
	e.preventDefault();
	submit($(e.target).closest("a"));
})

//폼객체 만들어서 전송하는 함수
function submit($aEle) {

        var form = document.createElement("form");

        form.setAttribute("charset", "UTF-8");

        form.setAttribute("method", "POST");  //Post 방식

        form.setAttribute("action", $aEle.attr("href")); //요청 보낼 주소



        var hiddenField = document.createElement("input");

        hiddenField.setAttribute("type", "hidden");

        hiddenField.setAttribute("name", "auctionNo");

        hiddenField.setAttribute("value", $aEle.attr("data-auctionNo"));

        form.appendChild(hiddenField);



        hiddenField = document.createElement("input");

        hiddenField.setAttribute("type", "hidden");

        hiddenField.setAttribute("name", "type");

        hiddenField.setAttribute("value", "viewer");

        form.appendChild(hiddenField);

        document.body.appendChild(form);

        form.submit();

}