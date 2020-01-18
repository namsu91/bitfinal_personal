search();

function success(result){
	console.log(result)
	let $tbody = $("<tbody></tbody>")
	if(result.list.length == 0){
		$(".dataContent tbody").html($("<tr><td style=text-align:center colspan='6'>검색결과가 없습니다.</td></tr>"));
		pg.print($(".adminContent"),result.pr);
		return;
	}
	result.list.forEach((user)=>{
		$("#dataCount").text(user.userCnt)
		let $tr = $("<tr></tr>")
		$tr.append($(`<td>${user.userEmail}</td>`));
		$tr.append($(`<td>${user.userNickname}</td>`));
		$tr.append($(`<td>${user.userPhnum}</td>`));
		$tr.append($(`<td>${user.userDealCnt}</td>`));
		$tr.append($(`<td>${user.userScore}</td>`));
		$tr.append($(`<td>${user.userReviewCnt}</td>`));
		$tbody.append($tr);
	})
		
	$(".dataContent tbody").html($tbody.html())
	
	pg.print($(".adminContent"),result.pr);
}





