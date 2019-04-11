define(["jquery","template"],($,template) => {
    class ShopItem{
        constructor(container,url,listData,totalPages,pageIndex){
            this.container = container;
            this.url = url;
            this.listData = listData;
            this.totalPages = totalPages;
            this.pageIndex = pageIndex;
            this.load();
        }
        load() {
            this.container.load("/html/module/shopItem.html", () => {
                if(this.listData){
                    this.render(this.listData);
                }else{
                    this.getData();
                }
            })
        }
        getData() {
            $.get(this.url, res => {
                if(res.res_code === 1){
                    this.totalPages = res.res_body.data.totalPages;
                    this.render(res.res_body.data.list);
                }
            })
        }
        render(data) {                                                                                                                                                                                                                                                                                                                                                                                                        ;
            this.container.html(template("shop-list", {list : data}));
            this.paging();
            this.changes();
        }
        paging() {
            //分页渲染
            $(".page-box").empty();//清空
            for(let i =1 ; i <=this.totalPages ;i++){
                $("<span>").addClass("page-list").html(i).appendTo(".page-box");
            }
            $.each($(".page-box"), (i,item) => {
                console.log(item);
            })
        }
        //当划过图片时，图片切换
        changes(){
            $(".list-imgs").each((i,item) => {
                //得到的item是js原生对象
                item.onmouseenter = ()=> {
                    let temp = item.src;
                    item.src = item.getAttribute("data-hover");
                    item.setAttribute("data-hover",temp);
                }
                item.onmouseleave = ()=> {
                    let temp = item.src;
                    item.src = item.getAttribute("data-hover");
                    item.setAttribute("data-hover",temp);
                }
            })
        }
    }
    return ShopItem;
})