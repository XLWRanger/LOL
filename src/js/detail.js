require(["require_config"],() => {
    require(["jquery","template","url","header","footer","zoom"], ($,template,url,Header) => {
        class Detail{
            constructor(){
                this.init();
                new Header().init();
            }
            //初始化获取数据
            init(){
                //获取id,然后请求数据
                let id = location.search.slice(4);
                //带着id请求详情页数据
                $.ajax({
                    url : url.baseUrl+"detail?id="+id,
                    method : "GET",
                    dataType : "json",
                    success : res => {
                        //保存当前商品数据
                        this.detail = res.data.detail;
                        //由于rap2返回的id都一样，所以要手动修改当前数据的id，真是开发中不用写这一行代码
                        this.detail.id = id;
                        //渲染详情页
                        this.render(this.detail);
                    }
                })
            }
            //渲染页面
            render(data) {
                //渲染数据
                $("#detail").html(template("detail-template",{data}));
                //渲染收藏与否
                let like = localStorage.getItem("like");
                if(like){
                    like = JSON.parse(like);
                    if(like.some(item => {
                        return item === this.detail.id;
                    })) $("#collect").addClass("collect");
                }
                 //渲染购物车数量
                 let cart = localStorage.getItem("cart");
                 if(cart){
                    let carNum = JSON.parse(localStorage.getItem("cart")).reduce((num,next) => {
                        num += next.num;
                        return num;
                    },0)
                    $("#car-num").html(carNum);
                 }
                this.input =  $("#inputNum").get(0);

                this.addToCar();
                this.collect();
                this.addNum();
                this.reduceNum();
                this.inputLimit();
                this.zoom();
            }
            //购物车
            addToCar() {
                //加入购物车点击事件
                $("#add-car").on("click", () => {
                    //存之前看是否有记录
                    let cart = localStorage.getItem("cart"),
                    inputNum = $("#inputNum").val()*1;
                    if(cart){
                        cart = JSON.parse(cart);
                        //some判断是否存在相同id
                        let count;
                        if(cart.some((item,index) => {count = index; return item.id === this.detail.id;})){
                            cart[count].num += inputNum;
                        }else{
                            cart.push({...this.detail,num : inputNum});
                        }
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }else{
                        //没有储存过商品
                    localStorage.setItem("cart", JSON.stringify([
                        {...this.detail,num : inputNum}
                        ]));
                    }
                    //购物车显示数量
                    let carNum = JSON.parse(localStorage.getItem("cart")).reduce((num,next) => {
                        num += next.num;
                        return num;
                    },0)
                    $("#car-num").html(carNum);
                    //标记已加入购物车
                    $("#car-tag").show();
                })
                //立即购买点击事件
                $("#buy-now").on("click" ,() => {
                    $("#add-car").click();
                    location.href = "/html/cart.html";
                })
            }
            //收藏功能
            collect () {
                $("#collect").on("click", () => {
                    $("#collect").toggleClass("collect");
                    let like = localStorage.getItem("like");
                    //储存localStorage
                    if($("#collect").get(0).className === "collect"){
                        //先判断是否有
                        if(like){
                            like = JSON.parse(like);
                            //判断是否有相同id,有则不push
                            if(!like.some(item => {return item === this.detail.id;})){
                                like.push(this.detail.id);
                                localStorage.setItem("like", JSON.stringify(like));
                            }
                        }else{
                            localStorage.setItem("like", JSON.stringify([this.detail.id]));
                        }
                    }else{
                        //删除
                        if(like){
                            like = JSON.parse(like);
                            like = like.filter(item => {
                                return item != this.detail.id;
                            }) 
                            localStorage.setItem("like", JSON.stringify(like));
                        }else{
                            return;
                        }
                    }
                })
            }
            //商品添加功能
            addNum() {
                $("#add").on("click", () => {
                    this.input.value++;
                })
            }
            //商品减少功能
            reduceNum() {
                $("#reduce").on("click", () => {
                    if(--this.input.value < 1 ) this.input.value = 1;
                })
            }
            //数量输入框的大小限制
            inputLimit() {
                this.input.onchange = () =>{
                    if(this.input.value < 1 || this.input.value === "") this.input.value = 1;
                }
            }
            //放大镜功能
            zoom () {
                // 放大镜插件
                console.log(1);
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
            }
        }
        new Detail();
    })
})