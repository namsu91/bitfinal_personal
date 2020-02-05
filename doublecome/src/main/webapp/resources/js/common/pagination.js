let pg = {print: print,
                          movePage: function($ele,func){
                            $ele.on("click",".page",(e)=>{
                                func($(e.target).text());
                            })
                          },

                          movePrevTab: function($ele,func){
                        	  $ele.on("click",".pageArrowPrev",(e)=>{
                                func($(e.target).closest("div").data("pageno"));
                            })
                          },

                          moveNextTab: function($ele,func){
                        	  $ele.on("click",".pageArrowNext",(e)=>{
                                func($(e.target).closest("div").data("pageno"));
                            })
                          }
                };                   

        function print($ele,pr) {
            let $pageContent = $("<div></div"); 

            if(pr == undefined){
                $data = $("data")
                prev = $data.data("prev");
                next = $data.data("next");
                beginPage = $data.data("beginpage");
                endPage = $data.data("endpage");
                pageNo = $data.data("pageno")
            } else {
                prev = pr.prev;
                next = pr.next;
                beginPage = pr.beginPage;
                endPage = pr.endPage;
                pageNo = pr.pageNo;
            }

            for(let i = beginPage; i <= endPage; i++){
                let $pageEle = $(`<div><span>${i}</span></div>`);
                
                if(i == pageNo){
                    $pageEle.addClass("clickedPage");
                } else {
                    $pageEle.addClass("page");
                }

                $pageContent.append($pageEle);
            }

            if(prev == true){
                $pageContent.prepend($(`<div class="pageArrowPrev" data-pageNo=${beginPage-1}><i class="fas fa-chevron-left"></i></div>`));

            }

            if(next == true) {
                $pageContent.append($(`<div class="pageArrowNext" data-pageNo=${endPage+1}><i class="fas fa-chevron-right"></i></div>`));
            }
            console.log($pageContent)
            $ele.find(".pagination").html($pageContent)
        }
        
        