define(["jquery"],function($){
	class Footer{
		constructor() {
			this.init();
		}
		init(){
			//加载html
			$("#footer-container").load("/html/module/footer.html");
		}
	}
	return new Footer();
})