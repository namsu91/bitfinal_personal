let data = {
	'신규 가입자' : [ 30, 200, 100, 400, 150, 250 ],
	'신규 경매' : [ 50, 20, 10, 40, 15, 25 ],
	'신규 거래' : [ 100, 40, 230, 120, 150, 125 ]
}

var chart = c3.generate({
	bindto : "#lineChart",
	data : {
		json : data
	},
	axis : {
		x : {
			type : 'category',
			categories : [ '1월', '2월', '3월', '4월', '5월', '6월' ]
		}
	},

	zoom : {
		enabled : true
	},

	transition : {
		duration : 1000
	}
});