

        printChart({})


        function printChart(data) {

            c3.generate({
                bindto: "#lineChart",
                data: {
                    x: 'x',
                    columns: data
                },

                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            count: 5,
                            format: '%Y-%m-%d'
                        }
                    }
                }
            });


            
        }
        // ==========================================================================================================
        
        
   function printPieCon() {

        $.ajax({
            url: "retrieveAuctionStaticsCon.do",
            success: (result)=>{
                let data = [];
                Object.keys(result).map(function(key){
                    let innerArr = [key,result[key]]
                    data.push(innerArr);
                });

                c3.generate({
                    bindto: "#pieChart1",
                    data: {
                        columns: data,
                        type: 'donut',
                        onclick: function (d, i) { console.log("onclick", d, i); },
                        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                    },
                    color: {
                        pattern: ['#2ca02c', '#98df8a']
                    },
                    donut: {
                        title: "상태별 경매 비율"
                    }
                });
            }
        })
   
    }

    function printPieCat() {

        $.ajax({
            url: "retrieveAuctionStaticsCat.do",
            success: (result)=>{
                let data = [];
                result.forEach((ele)=>{
                    let innerArr = [ele.categoryName,ele.categoryAuctionCnt]
                    data.push(innerArr);
                })

                c3.generate({
                    bindto: "#pieChart2",
                    data: {
                        columns: data,
                        type: 'donut',
                        onclick: function (d, i) { console.log("onclick", d, i); },
                        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                    },
                    color: {
                        pattern: ['#1f77b4', '#aec7e8', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf']
                    },
                    donut: {
                        title: "카테고리별 경매 비율"
                    },
                    legend: {
                        position: 'right'
                    }
                });
            }
        })
   
    }

printPieCat();
printPieCon();

$(".lineChartType button").click(()=>{
    let data = makeDate()
    console.dir(data)
    
    let date = ["x"];
    let cnt = ["일자별 경매 등록수"]; 
    $.ajax({
		url:"retrieveAuctionStaticsRegDate.do",
		type:"POST",
		data: data,
		success: (result)=>{
			result.forEach((ele)=>{
                date.push(ele.date);
                cnt.push(ele.cnt);
            })
            let dataArr = [date,cnt];
            console.dir(dataArr);
            printChart(dataArr)
		}
	});
    
})


function makeDate(){
    let $selectEle = $(".lineChartType select")
    let startDate;
    let endDate;
    let year = $($selectEle[0]).val()
    console.log($($selectEle[1]).val());
    switch ($($selectEle[1]).val()) {
	case '1': startDate = year + '-01-01'; endDate = year + '-03-31'; break;

	case '2': startDate = year + '-04-01'; endDate = year + '-06-30';  break;
	
	case '3': startDate = year + '-07-01'; endDate = year + '-09-30';  break;
	
	case '4': startDate = year + '-10-01'; endDate = year + '-12-31';  break;
    }
    return {'startDate':startDate,'endDate':endDate};
}
