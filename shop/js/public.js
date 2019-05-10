;(function(){
    function Index(option){
        this.goods = option.goods;
        this.server = option.server;
        this.third = option.third;
        this.ul = option.ul;
        this.list = option.list;
        this.add = option.add;
        this.nav = option.nav;
        this.hotT = option.hotT;
        this.hotB = option.hotB;
        this.smallList = option.smallList;
        this.topL = option.topL;
        
        this.i = document.querySelector(".top-l i");
        this.a = document.querySelector(".top-l .te");
        this.car = document.querySelector("#top .car");
        
        for(var i=0;i<this.add.length;i++){
            this.add[i].index = i;
        }

        // 接口
        this.indexUrl = "http://localhost/shop/php/index.php";

        this.arr = [{"时令水果":["苹果","梨子","香蕉","西红柿","石榴","猕猴桃","火龙果","哈密瓜"],"精选肉类":["牛肉","排骨","羊排","五花肉"],"海鲜水产":["鲤鱼","小龙虾","大闸蟹","海参"]},{"蛋糕饼干":["饼干","蛋糕","凤梨酥"],"蜜饯果干":["芒果干","菠萝干","果脯大礼包"]},{"食用油":["豆油","花生油"],"米面杂粮":["大米","小米","玉米面","粗粮"]},{"水/饮料":["饮料","饮用水"],"乳类制品":["牛奶","酸奶"],"中外名酒":["黄酒","红酒","啤酒","葡萄酒"],"饮品冲剂":["奶茶","粗粮"]},{"个人护理":["洗发水","护发素"],"身体护理":["身体乳","沐浴露","香皂","护手霜","洗手液"]},{"收纳用品":["收纳用品"]},{"纸品湿巾":["抽纸"],"厨卫清洁":["杀虫剂","洗洁精","消毒液"],"衣物清洁":["洗衣液","洗衣粉"]},{"洗护喂养":["宝宝护肤"],"孕妈用品":["产后塑身"]},{"个人护理":["面膜水乳"]},{"园艺工具":["花盆花器"],"营养土肥":["营养土"]},{"生活电器":["小型家电","大型家电"],"珠宝首饰":["黄金制品"]},{"灯饰照明":["台灯"]},{"其他健康服务":["室内空气检测"]},{"家具安装":["家具安装"],"家具维修":["水管/下水道疏通","其他家具维修","卫浴维修"]},{"家政保洁":["家电清洁","家政清理工"],"上门服务":["私厨上门"]}];

        this.index = 0;

        // 绑定事件
        this.init();

        this.getDate();  

        this.getCookie();
    }

    // 获取cookie
    Index.prototype.getCookie = function(){
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

    // 绑定事件
    Index.prototype.init = function(){
        var that = this;

        // 对购物车添加点击事件
        this.car.onclick = function(){
            if(that.obj.onoff){
                location.href = "http://localhost/shop/car.html";
            }else{
                location.href = "http://localhost/shop/login.html";
            }

        }

        // 事件委托
        this.list.addEventListener("mouseover",function(eve){
            // this.third.className = "third clear";
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "DD"){
                that.index= target.index;
                target.className = "dd active";
                target.style.color = "#f00";
                that.third.style.display = "block";
                that.top = target.offsetTop/100 + 'rem';
                // 渲染三级菜单页面
                that.listDisplay();
            }
        })
        this.list.addEventListener("mouseout",function(eve){
            // this.third.className = "third clear";
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "DD"){
                target.className = "dd";
                target.style.color = "#fff";
            }
        })

        this.third.onmouseout = function(){
            that.add[that.index].className = "dd";
            that.add[that.index].style.color = "#fff";
            that.third.style.display = "none";
        }

        this.third.onmouseover = function(){
            that.add[that.index].className = "dd active";
            that.add[that.index].style.color = "#f00";
            that.third.style.display = "block";
        }

        this.nav.onmouseout = function(){
            that.add[that.index].className = "dd";
            that.add[that.index].style.color = "#fff";
            that.third.style.display = "none";
        }

        // 热门商品h3事件委托
        this.hotT.addEventListener("mouseover",function(eve){
            for(var i=0;i<that.hotT.children.length;i++){
                that.hotT.children[i].className = "";
            }
            var e = eve || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName == "H3"){
                target.className = "active";
                // 获取商品数据
                that.getDate();               
            }
        })
    }

    // 渲染三级菜单页面
    Index.prototype.listDisplay = function(){
        var str = "";
        for(var i in this.arr[this.index]){
            str += `<li>
                        <div class="title">${i}</div>`
            for(var j=0;j<this.arr[this.index][i].length;j++){
                str += `<a href="goods.html">${this.arr[this.index][i][j]}</a><span>|</span>`;
            }
            str += "</li>";    
        }
        this.third.style.top = this.top;
        this.ul.innerHTML = str;
    }

    // 获取商品数据
    Index.prototype.getDate = function(){
        var that = this;
        ajaxGet(this.indexUrl).then(function(res){
            that.res = JSON.parse(res);
            if(that.res.code == 0){
                alert("数据加载失败，错误信息为：" + that.res.msg);
            }else{
                // 渲染热门商品页面
                that.hotDisplay();
                // 渲染商品分类页面
                    that.bigDisplay();
            }
        })
    }

    // 随机数
    Index.prototype.random = function(max, min){
        return Math.round(Math.random()*(max-min)+min);
    }

    // 给热门商品的渲染页面
    Index.prototype.hotDisplay = function(){
        var str = "";
            for(var j=0;j<6;j++){
                var num = this.random(0,9);
                str += `<li><a href="goods.html">
                            <img src="${this.res[num].src}" alt="">
                            <p>${this.res[num].describe}</p>
                            <p><span>商城价：</span><i>${this.res[num].price}</i></p>
                        </a></li>`;
            }
        this.hotB.innerHTML = str;
    }

    // 渲染商品分类页面
    Index.prototype.bigDisplay = function(){
        var that = this;
        var str = "";
        for(var i in this.res){
            str += `<li index="${this.res[i].id}">
                        <img src="${this.res[i].src}" alt="">
                        <p>${this.res[i].describe}</p>
                        <p class="clear"><i>￥${this.res[i].price}</i><span>加入购物车</span></p>
                    </li>`;
        }
        for(var i=0;i<this.smallList.length;i++){
            this.smallList[i].innerHTML = str;
        }
        for(var i=0;i<this.smallList.length;i++){
            this.smallList[i].addEventListener("click",function(eve){
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if(target.nodeName = "SPAN"){
                    that.id = target.parentNode.parentNode.getAttribute("index");
                    console.log(that.id);
                    // 存储cookie
                    that.setCookie();
                }
            })
        }
    }
    // 存储cookie
Index.prototype.setCookie = function(){
    // 第一次存数据与不是第一次存数据，第一次直接存，之后每次存数据都要先进行判断cookie中是否已经含有该数据了
    this.goods = getCookie("goods");
    if(this.goods == ""){
        this.goods = [{
            id:this.id,
            num:1,
        }];
    }else{
        var onoff = true;
        this.goods = JSON.parse(this.goods);
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                this.goods[i].num++;
                onoff = false;
                break;
            }
        }
        if(onoff){
            this.goods.push({
                id:this.id,
                num:1,
            })
        }
    }
    setCookie("goods",JSON.stringify(this.goods));
}

    
    new Index({
        goods:document.querySelector(".list .goods"),
        server:document.querySelector(".list .server"),
        ul:document.querySelector(".list-b .third ul"),
        third:document.querySelector(".list-b .third"),
        list:document.querySelector(".list .list-b"),
        add:document.querySelectorAll(".list-b dd"),
        banner:document.getElementById("banner"),
        nav:document.querySelector("#nav"),
        hotT:document.querySelector(".hot-t"),
        hotB:document.querySelector(".hot-b"),
        smallList:document.querySelectorAll(".smallList"),
        topL:document.querySelector(".top-l")
    });
})();