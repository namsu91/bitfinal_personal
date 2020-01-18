        let pie1 = {url: "retrieveUserStaticsAc.do", 
                    target: "#pieChart1",
                    color: ['#1f77b4', '#aec7e8', '#ffbb78', '#2ca02c'],
                    title: "신고수별 유저 비율"}
        let pie2 = {url: "retrieveUserStaticsDc.do", 
                    target: "#pieChart2",
                    color: ['#d62728', '#ff9896', '#9467bd', '#c5b0d5'],
                    title: "거래수별 유저 비율"}
        let pie3 = {url: "retrieveUserStaticsRp.do", 
                    target: "#pieChart3",
                    color: ['#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d'],
                    title: "경매수별 유저 비율"}
        // ==========================================================================================================

    

        printPie(pie1);
        printPie(pie2);
        printPie(pie3);

        printChart({})

        $(".lineChartType > span").click((e) => {
            $(".lineChartType > span").removeClass("clickedType")
            $(e.target).addClass("clickedType");
            printChart(data2);
        })


    function printPie(pie) {

        $.ajax({
            url: pie.url,
            success: (result)=>{
                let data = [];
                Object.keys(result).map(function(key){
                    let innerArr = [key,result[key]]
                    data.push(innerArr);
                });

                c3.generate({
                    bindto: pie.target,
                    data: {
                        columns: data,
                        type: 'donut',
                        onclick: function (d, i) { console.log("onclick", d, i); },
                        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                        onmouseout: function (d, i) { console.log("onmouseout", d, i); }
                    },
                    color: {
                        pattern: pie.color
                    },
                    donut: {
                        title: pie.title
                    }
                });
            }
        })
    }

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

    $(".lineChartType button").click(()=>{
        let data = makeDate()
        console.dir(data)
        
        let date = ["x"];
        let cnt = ["일자별 경매 등록수"]; 
        $.ajax({
            url:"retrieveUserStaticsRegDate.do",
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