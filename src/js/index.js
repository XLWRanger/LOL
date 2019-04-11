require(["require_config"], function () {
    require(["jquery","Swiper","template","url","header","footer"], function ($,Swiper,template,url,Header) {
       class Index{
            constructor(){
                this.swiper();
                this.login();
                this.variety();
                new Header().init();
            }
            //登录
            login(){
                
            }
            // 轮播图
            swiper(){
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    // 自动播放
                    autoplay:true,
                    //淡入淡出
                    effect : 'fade',
                    autoplay: {
                        delay: 2000,//3秒切换一次
                      },
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true,
                    },
                  })   
            }
            //种类渲染
            variety(){
                $.ajax({
                    url : url.baseUrl+"monopoly",
                    method : "GET",
                    dataType : "json",
                    success : function(res) {
                        if(res.res_code === 1){
                            let list = res.res_body.data;
                            // template 是模块提供的方法，用它来渲染模板引擎
							// 第一个参数是模板引擎的script标签的id名（不用加#）
                            // 第二个参数是个对象，传模板里需要的数据
                            var html = template("list-monopoly",{list : list});
                            $("#list-container").html(html);
                        }
                    }
                })
            }
       } 
       new Index();
    })
})