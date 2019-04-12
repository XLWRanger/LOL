require(["require_config"] , () => {
    require(["jquery","template","header","footer"] , ($,template,Header) => {
        class Cart{
            constructor() {
                this.getData();
                this.settlementFixed();
                this.checkAll();
                this.check();
                this.addNum();
                this.reduceNum();
                this.deleteShop();
                this.closeCollect();
                this.collect();
                this.inputNum();
                this.okDelete();
                this.cancelDelete();
                this.sumMoney();
                this.sumNum();
                this.warningModalCenter();
                this.cleanAll();
                new Header().init().then(() => {
                    //头部隐藏
                    $("#header-bottom").hide();
                });
            }
            //取商品
            getData() {
                let cart = localStorage.getItem("cart");
                if(cart){
                    console.log(1);
                    cart = JSON.parse(cart);
                    let html = template("shop-cart", {list:cart});
                    $("#list-container").html(html);
                }else{
                    //不存在
                    this.blankCar();
                }
                //warning居中                                                                                                                                                                                                                                                                                                                                                                     
                $("#warning").css({"left" : $(window).width()/2, "top" : $(window).height()/2});
                $("#modal-warning").css({
                    "width" : $(window).width(),
                    "height" : $(window).height()
                });
                this.count = $(".check").length;
            }
            //结算界面定位
            settlementFixed() {
                $(window).on("scroll", () => {
                    if($(document).scrollTop() > 18){
                        $("#total").css({"position":"fixed"});
                    }else{
                        $("#total").css({"position":"static"});
                    }
                })
            }
            //全选
            checkAll() {
                let _this = this;
                $("#left").on("click",".checkAll" ,function(){
                        //记得用prop才能取到布尔值
                        $(".check").prop("checked",$(this).prop("checked"));
                        //保证两个全选按钮值一致
                        $(".checkAll").prop("checked",$(this).prop("checked"));
                        _this.count = $(this).prop("checked") ? $(".check").length : 0;
                        //算钱
                        _this.sumMoney();
                        _this.sumNum();
                })
            }
            //单选采用事件委托
            check() {
                let _this = this;
                $("#left").on("click",".check", function(){
                    _this.count += $(this).prop("checked") ? 1 : -1;
                    console.log(_this.count);
                    $(".checkAll").prop("checked",_this.count === $(".check").length);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                })
            }
            //增加数量
            addNum() {
                let _this = this;
                $("#left").on("click",".addNum", function(){
                    //设置输入框的值
                    $(this).prev().val(Number($(this).prev().val())+1);
                    let price = $(this).parent().prev().html().slice(1),
                        num = $(this).prev().val();
                    $(this).parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().attr("data-id"),num);
                })
            }
            //减少数量
            reduceNum() {
                let _this = this;
                $("#left").on("click",".reduceNum", function(){
                    $(this).next().val(Number($(this).next().val())-1);
                    //输入框数量最少为1
                    if($(this).next().val() < 1)
                        $(this).next().val(1);
                    let price = $(this).parent().prev().html().slice(1),
                        num = $(this).next().val();
                    $(this).parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().attr("data-id"),num);
                })
            }

            //直接输入值
            inputNum() {
                let _this = this;
                $("#left").on("change",".inputNum", function(){
                    if($(this).val() < 1) $(this).val(1);
                    let price = $(this).parent().prev().html().slice(1),
                        num = $(this).val();
                    $(this).parent().next().html("￥"+num*price);
                    //算钱
                    _this.sumMoney();
                    _this.sumNum();
                    _this.storage($(this).parent().parent().attr("data-id"),num);
                })
            }

            //删除商品警告
            deleteShop() {
                $("#left").on("click",".delete", function(){
                   $("#warningTitle").html("你确定要删除&nbsp;&nbsp;"+$(this).parent().parent().find("h2").html());
                   $("#okBtn").attr("data-id",$(this).parent().parent().attr("data-id"));
                   $("#tips").show();
                   $("#okBtn").show();
                   $("#cancelBtn").show();
                   $("#okCollect").hide();
                })
            }

            //确认删除商品
            okDelete() {
                let _this = this;
                $("#okBtn").on("click", function(){
                    $("#tips").hide();
                    let cart = JSON.parse(localStorage.getItem("cart"));
                    //删除localstorage
                    cart = cart.filter((item) => {
                        return item.id != $(this).attr("data-id");
                    })
                    //判断是否全部清空了
                    if(cart.length === 0){
                        _this.blankCar();
                        //同时记得清空localStorage,不然刷新页面，
                        //上面判断cart(虽然为空，但是是字符串类型)，会为true
                        localStorage.removeItem("cart");
                    }else{
                        localStorage.setItem("cart",JSON.stringify(cart));
                    }
                    //删除列表显示
                    $.each($(".shop-list"),(i,item) => {
                        if($(item).attr("data-id") == $(this).attr("data-id"))
                            item.remove();
                    })
                    _this.sumMoney();
                    _this.sumNum();
                })
            }

            //取消删除商品
            cancelDelete() {
                $("#cancelBtn").on("click", function(){
                    $("#tips").hide();
                })
            }

            //清空购物车
            cleanAll() {
                $("#cleanCar").on("click",() => {
                    $("#warningTitle").html("您确定要清空购物车吗？");
                    $("#tips").show();
                    $("#okBtn").show();
                    $("#cancelBtn").show();
                    $("#okCollect").hide();
                    $("#okBtn").on("click",() => {
                        localStorage.removeItem("cart");
                        this.blankCar();
                        this.sumMoney();
                        this.sumNum();
                    })
                })
            }

            //收藏商品
            collect() {
                $("#left").on("click", ".collect",function(){
                    $("#warningTitle").html("亲，商品&nbsp;&nbsp;"+$(this).parent().parent().find("h2").html()+"&nbsp;&nbsp;收藏成功");
                    $("#tips").show();
                    $("#okBtn").hide();
                    $("#cancelBtn").hide();
                    $("#okCollect").show();
                    //存
                    let like = localStorage.getItem("like"),
                        id = $(this).parent().parent().attr("data-id");
                    //先判断是否有
                    if(like){
                        like = JSON.parse(like);
                        //判断是否有相同id,有则不push
                        if(!like.some(item => {return item === id})){
                            like.push(id);
                            localStorage.setItem("like", JSON.stringify(like));
                        }
                    }else{
                        localStorage.setItem("like", JSON.stringify([id]));
                    }
                })
            }

            //收藏框关闭
            closeCollect() {
                $("#okCollect").on("click", function(){
                    $("#tips").hide();
                })
            }

            //判断是否满足包邮
            isfreeSpan() {
                if($("#totalMoney").html() >= 199){
                    $("#noShop").addClass("active");
                    $("#isSatisfy").html("已满足");
                    $("#isFreeSpan").hide();
                }else{
                    $("#noShop").removeClass("active");
                    $("#isSatisfy").html("未满足");
                    $("#isFreeSpan").show();
                }
            }

            //算总价
            sumMoney() {
                let money = 0;
                $.each($(".money"), (i,item) =>{
                    //这个遍历出来是原生对象,计算被选中的
                    if(item.parentNode.children[0].checked)
                        money += Number(item.innerHTML.slice(1));
                })
                $("#totalMoney").html(money.toFixed(2));
                this.isfreeSpan();
            }

            //算数量
            sumNum() {
                let num = 0;
                $.each($(".inputNum"), (i,item) => {
                    if(item.parentNode.parentNode.children[0].checked)
                        num += Number(item.value);
                })
                $("#numCount").html(num);
                $("#car-num").html(num);
            }

            //存localstorage
            storage(id,num) {
                let cart = JSON.parse(localStorage.getItem("cart")),
                    index = 0;
                cart.some((item,i) => {
                    index = i;
                    return item.id == id;
                })
                cart[index].num = Number(num);
                localStorage.setItem("cart",JSON.stringify(cart));
            }

            //warning-modal居中
            warningModalCenter() {
                $(window).resize(() => {
                    $("#warning").css({"left" : $(window).width()/2, "top" : $(window).height()/2});
                    $("#modal-warning").css({
                        "width" : $(window).width(),
                        "height" : $(window).height()
                    });
                })
            }

            //空购物车
            blankCar() {
                let p = $("<p>您的购物车中还没有商品， <a href='/html/list.html?type=2'>去逛逛吧</a></p>").addClass("blank");
                    $("#left").css({"width":"880px","height":"312px"}).html(p);
                    $("#noShop").hide();
                    $("#isFreeSpan").hide();
                    $("#settlement").css({"background":"#666","color":"#999"});
            }
        }
        new Cart();
    })
})