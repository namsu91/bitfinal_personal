function auctionCount($target, limitDate) {
	let target_date = new Date(limitDate);
	let days, hours, minutes, seconds;
	
	// update the tag with id "countdown" every 1 second
	setInterval(function() {
	
	  target_date.getTime();
	  
	  // find the amount of "seconds" between now and target
	  var current_date = new Date().getTime();
	  
	  // check for match
	  if (current_date === target_date){
	    announcement.innerHTML = "¡¡¡Happy New Year!!!";
	  }
	  
	  let seconds_left = (target_date - current_date) / 1000;
	
	  // do some time calculations
	  days = parseInt(seconds_left / 86400);
	  seconds_left = seconds_left % 86400;
	
	  hours = parseInt(seconds_left / 3600);
	  seconds_left = seconds_left % 3600;
	
	  minutes = parseInt(seconds_left / 60);
	  seconds = parseInt(seconds_left % 60);
	
	  // format countdown string + set tag value
	  $target.text(days + "일 " + hours + "시간 " + minutes + "분")
	
	}, 1000);
}
