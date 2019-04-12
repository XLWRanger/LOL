require(["require_config"], () => {
    require(["jquery","Swiper"], ($,Swiper) => {
        class Register{
            constructor(){
                this.swiper();
                this.register();
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
                        delay: 4000,//2秒切换一次
                      },

                  })   
            }
            //注册
            register() {
                $("#submit").on("click", () => {
                    let username = $("#username").val(),
					password = $("#password").val();
				$.ajax({
					url: "http://localhost/api/v1/register.php",
					method: "POST",
					data: {username,password},
					dataType: "json",
					success : function(res){
						if(res.res_code === 1){
							if(confirm("注册成功，是否前往首页")){
                                location.href = "/index.html";
                                localStorage.setItem("login", JSON.stringify({username}));
                            }
						}else{
							alert(res.res_info);
						}
					}
				})
                })
            }
        }
        new Register();
    })
})