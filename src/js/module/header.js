define(["jquery"], function ($) {
	class Header {
		constructor () {

		}
		init () {
			return new Promise(resolve => {
				//加载部分html文件
				$("#header-container").load("/html/module/header.html", ()=>{
					//回调结束后执行的函数
					this.shopNum();
					this.showLogin();
					this.login();
					this.exit();
					this.loginBoxCenter();
					this.closeLoginBox();
					this.weixinLogin();
					this.qqLogin();
					resolve();
				})
			})
		}

		//商品数量渲染
		shopNum() {
			let cart = localStorage.getItem("cart");
                 if(cart){
                    let carNum = JSON.parse(localStorage.getItem("cart")).reduce((num,next) => {
                        num += next.num;
                        return num;
                    },0)
                    $("#car-num").html(carNum);
                 }
		}

		//login
		login(){
			//登录按钮
			$("#login-btn").on("click" , () => {
				//更改样式
				$("#weixin-login").removeClass("active");
				$("#qq-login").addClass("active");
				//加载qq登录模板
				$("#change").removeClass("weixin-box").addClass("qq-box").load("/html/module/login-qq.html", () => {
					$("#login").show();
					$("#modal").show();
					this.submit();
				})
				//登录框居中，同时记得在CSS样式中减去一半宽高
				$("#login").css({"left" : $(window).width()/2 + "px", "top" : $(window).height()/2 + "px"});
			})
		}

		//登录提交
		submit() {
			$("#login-btn1").on("click", () => {
				$("#login").hide();
				$("#modal").hide();
				$("#login-btn").hide();
				$("#after-login").show();
				let username = $("#username").val();
				$("#name").html(username);
				//存
				localStorage.setItem("login", JSON.stringify({username}));
			})
		}

		//登录框居中
		showLogin() {
			let login = localStorage.getItem("login");
			if(login){
				name = JSON.parse(login).username;
				$("#name").html(name);
				$("#login-btn").hide();
				$("#after-login").show();
			}
		}

		//退出登录
		exit() {
			$("#exit").on("click" , () => {
				$("#login-btn").show();
				$("#after-login").hide();
				$("#login").hide();
				$("#modal").hide();
				localStorage.clear("login");
			})
		}

		//关闭登录框
		closeLoginBox() {
			$("#close").on("click", () => {
				$("#login").hide();
				$("#modal").hide();
			})
		}

		//登录框居中
		loginBoxCenter() {
			$(window).resize(() => {
				console.log(1);
				$("#login").css({"left" : $(window).width()/2, "top" : $(window).height()/2});
			})
		}

		//切换为微信登录
		weixinLogin() {
			$("#weixin-login").on("click", () => {0
				//改变login-header样式
				$("#qq-login").removeClass("active");
				$("#weixin-login").addClass("active");
				 //加载微信登录模块
				$("#change").removeClass("qq-box").addClass("weixin-box").load("/html/module/login-weixin.html", () => {

				})
			})
		}

		//切换为qq登录
		qqLogin() {
			$("#qq-login").on("click", () => {
				$("#login-btn").click();
			})
		}
	}
	return Header;
})