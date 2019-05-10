function Car(){
    this.tbody = document.querySelector("tbody");
    this.url = "http://localhost/shop/php/index.php";

    this.i = document.querySelector(".top-l i");
    this.a = document.querySelector(".top-l .te");


    this.sum = document.querySelector(".box span");
    this.clear = document.querySelector(".box .clear");

    // 获取初始数据
    this.init();

    this.user();

    // 事件委托
    this.addEvent();

}

Car.prototype.user = function(){
    var that = this;
    this.obj = JSON.parse(getCookie("obj"));
    if(this.obj.onoff){
        this.i.innerHTML = this.obj.name + "，欢迎您来到";
        this.a.innerHTML = "退出";
        this.a.onclick = function(){
            that.obj.onoff = 0;
            setCookie("obj",JSON.stringify(that.obj));
        }
    }

}

Car.prototype.init = function(){
    var that = this;
    ajaxGet(this.url).then(function(res){
        that.res = JSON.parse(res);
        // 拿cookie中的数据
        that.getCookie();
    })
}

// 拿cookie中的数据
Car.prototype.getCookie = function(){
    this.goods = getCookie("goods")!="" ? JSON.parse(getCookie("goods")) : {};
    // 渲染页面
    this.display();
}

// 渲染页面
Car.prototype.display = function(){
    var str = "";
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){
            if(this.res[i].id == this.goods[j].id){
                str += `<tr index="${this.goods[j].id}">
                            <td><img src="${this.res[i].src}"/></td>
                            <td>${this.res[i].describe}</td>
                            <td>${this.res[i].price}</td>
                            <td><input type="number" value="${this.goods[j].num}" min="1" class="num"></td>
                            <td><em id="del">删除</em></td>
                        </tr>`;
            }
        }
    }
    this.tbody.innerHTML = str;
}

// 事件委托
Car.prototype.addEvent = function(){
    var that = this;
    // 改变商品数量的事件委托
    this.tbody.addEventListener("input",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "num"){
            that.id = target.parentNode.parentNode.getAttribute("index");
            that.num = target.value;
            // 将改变的数量重新存放进cookie中
            that.changeCookie(function(i){
                that.goods[i].num = that.num;
            });
        }
    })

    // 删除的事件委托
    this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.id == "del"){
            that.id = target.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.remove();
            // 将该id的商品在购物车删除之后，重新将数据装回cookie
            that.changeCookie(function(i){
                that.goods.splice(i,1);
            })
        }
    })

    // 清空购物车
    this.clear.onclick = function(){
        removeCookie("goods");
    }


}

// 改变商品数量或删除商品对cookie更新
Car.prototype.changeCookie = function(callback){
    for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id == this.id){
            callback(i);
        }
    }
    setCookie("goods",JSON.stringify(this.goods));
}

new Car();