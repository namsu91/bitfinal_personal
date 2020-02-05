jQuery(document).ready(function($){
	window.loopcounter = function( idWarp ) {
		if(typeof idWarp!= 'undefined'){
			date = $('.'+idWarp).data('date');
			let endDate = $('.'+idWarp).data('now')
			let start = new Date( date );
			let end   = new Date( endDate );
			let diff  = new Date( start - end );
			let time  = diff/1000/60/60/24;
			let day = parseInt(time);
			let hour = parseInt((diff/1000/60/60)%24 );
			let min = parseInt((diff/1000/60)%60 );
			let sec = parseInt((diff/1000)%60 );
				
			counterDate(idWarp,day,hour,min,sec);

				var interval = setInterval(function () {
					if( sec==0 && min!=0 ){
						min--;
						sec = 60;
					}
					if(min == 0 && sec == 0 && hour!=0 ){
						hour--;
						min = 59;
						sec = 60;
					}
					if(min == 0 && sec == 0 && hour == 0 && day!=0 ){
						day--;
						hour = 23;
						min = 59;
						sec = 60;
					}
					if(min == 0 && sec == 0 && hour == 0 && day==0 ){
						clearInterval(interval);
					}else{
						sec--;
					}
					counterDate(idWarp,day,hour,min,sec);
				}, 1000 );

			function counterDate(id,day,hour,min,sec){
				if (time < 0) { day = hour = min = sec = 0; }
				$( '.'+id+' .counter-days').html( counterDoubleDigit(day) );
				$( '.'+id+' .counter-hours').html( counterDoubleDigit(hour) );
				$( '.'+id+' .counter-minutes').html( counterDoubleDigit(min) );
				$( '.'+id+' .counter-seconds').html( counterDoubleDigit(sec) );
			}
			function counterDoubleDigit( arg ){
				if( arg.toString().length <= 1 ){
					arg = ('0' + arg).slice(-2);
				}
				return arg;
			}
		}
    }
});
