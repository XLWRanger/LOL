require(["require_config"], function(){
    require(["jquery","shopItem","url","header","footer"], function($,ShopItem,url,Header){
        class List{
            constructor(type){
                //暂时赋值为1
                this.type = type;//传过来的是字符串
                this.dir = document.querySelector("#dir");
                new Header().init();
                this.shopItem();
                this.navTitles();
                this.adesc();
                this.desc();
                this.saleNum();
                this.popularity();
                this.limit();
                this.storage();
                this.paging();
                this.prev();
                this.next();
            }
            //渲染商品列表
            shopItem(){
                new ShopItem($("#shopItem"),url.baseUrl+"shop-items?type="+this.type,"",0);
            }
            //升序排列
            adesc() {
                $("#adesc").on("click", () => {
                    $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                        if(res.res_code){
                            let data = res.res_body.data;
                            let list = data.list.sort((a,b) => {
                                return a.price - b.price;
                            });
                            new ShopItem($("#shopItem"),"",list,data.totalPages);
                            $("#rank-name").html("价格升序").css("padding-left" ,"25px");
                        }
                    })
                })    
            }
            //降序排列
            desc() {
                $("#desc").on("click", () => {
                    $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                        if(res.res_code){
                            let data = res.res_body.data;
                            let list = data.list.sort((a,b) => {
                                return b.price - a.price;
                            });
                            new ShopItem($("#shopItem"),"",list,data.totalPages);
                            $("#rank-name").html("价格降序").css("padding-left" ,"25px");
                        }
                    })
                })    
            }
            //销量排序
            saleNum() {
                $("#sale-num").on("click", () => {
                    $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                        if(res.res_code){
                            let data = res.res_body.data;
                            let list = data.list.sort((a,b) => {
                                return a.saleNum - b.saleNum;
                            });
                            new ShopItem($("#shopItem"),"",list,data.totalPages);
                            $("#rank-name").html("销量").css("padding-left" ,"40px");
                        }
                    })
                })    
            }
            //人气排序
            popularity() {
                $("#popularity").on("click", () => {
                    $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                        if(res.res_code){
                            let data = res.res_body.data;
                            let list = data.list.sort((a,b) => {
                                return a.popularity - b.popularity;
                            });
                            new ShopItem($("#shopItem"),"",list,data.totalPages);
                            $("#rank-name").html("人气").css("padding-left" ,"40px");
                        }
                    })
                })
                //默认人气排序
                $("#popularity").click();
            }
            //限定筛选
            limit() {
                $("#new-product").on("click", () => {
                    $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                        if(res.res_code){
                            let data = res.res_body.data;
                            let list = data.list.filter((item) => {
                                return item.new;
                            })
                            new ShopItem($("#shopItem"),"",list,data.totalPages);
                            $("#rank-name").html("人气").css("padding-left" ,"40px");
                        }
                    })
                }) 
            }
            //仅显示有货
            storage() {
                $("#storage").on("change", () => {
                    if($("#storage").get(0).checked){
                        $.get(url.baseUrl+"shop-items?type="+this.type, res => {
                            if(res.res_code){
                                let data = res.res_body.data;
                                let list = data.list.filter((item) => {
                                    return item.storage;
                                })
                                new ShopItem($("#shopItem"),"",list,data.totalPages);
                            }
                        })
                    }else{
                        $("#popularity").click();
                    }
                }) 
            }
            //分页
            paging() {
                $("#list-box").on("click",".page-list",() => {
                    this.shopItem();
                })
            }

            //上一页
            prev() {
                $("#list-box").on("click",".prev-page",() => {
                    this.shopItem();
                })
            }

            //下一页
            next() {
                $("#list-box").on("click",".next-page",() => {
                    this.shopItem();
                })
            }

            //导航标题
            navTitles(){
                switch (location.search.slice(6)) {
                    case "2":
                        $("#nav-title").html("雕塑手办");
                        break;
                    case "3":
                        $("#nav-title").html("毛绒玩具");
                        this.dir.innerHTML = `
                        <h2><a href="javascript:;">毛绒玩具</a></h2>
                        <p><a href="javascript:;">玩偶</a></p>
                        <p><a href="javascript:;">帽子</a></p>`;
                        break;
                    case "4":
                        $("#nav-title").html("男女服饰");
                        this.dir.innerHTML = `
                        <h2><a href="javascript:;">男女服饰</a></h2>
                        <p><a href="javascript:;">T恤</a></p>
                        <p><a href="javascript:;">其他</a></p>
                        <p><a href="javascript:;">卫衣&夹克</a></p>`;
                        break;
                    case "5":
                        $("#nav-title").html("LPL周边");
                        this.dir.innerHTML = `
                        <h2><a href="javascript:;">LPL周边</a></h2>
                        <p><a href="javascript:;">周边服饰</a></p>
                        <p><a href="javascript:;">周边首饰</a></p>
                        <p><a href="javascript:;">周边彩蛋</a></p>
                        <p><a href="javascript:;">周边皮肤</a></p>`;
                        break;
                    case "6":
                        $("#nav-title").html("珠宝首饰");
                        this.dir.innerHTML = `
                        <h2><a href="javascript:;">珠宝首饰</a></h2>
                        <p><a href="javascript:;">幸运珠</a></p>
                        <p><a href="javascript:;">吊坠</a></p>
                        <p><a href="javascript:;">手链</a></p>
                        <p><a href="javascript:;">配件</a></p>`;
                        break;
                    case "7":
                        $("#nav-title").html("其他");
                        this.dir.innerHTML = `
                        <h2><a href="javascript:;">其他</a></h2>
                        <p><a href="javascript:;">其他</a></p>
                        <p><a href="javascript:;">鼠标垫</a></p>
                        <p><a href="javascript:;">手机壳</a></p>`;
                        break;
                    default:
                        break;
                }
            }
        }
        
        new List(location.search.slice(6));
    })
})