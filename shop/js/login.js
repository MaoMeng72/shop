
function Login(option){
    this.sub = option.sub;
    this.txt = option.txt;
    this.pass = option.pass;
    this.code = option.code;
    this.span = option.span;
    this.box = option.box;
    
    // 初始状态的随机验证码
    this.span.innerHTML = this.randomCode();

    // 接口 
    this.loginUrl = "http://localhost/shop/php/login.php";

    // 绑定事件
    this.init();
}

// 绑定事件
Login.prototype.init = function(){
    var that = this;
    // 随机验证码
    this.span.onclick = function(){
        that.span.innerHTML = that.randomCode();
    }

    // 提交按钮的点击事件
    this.sub.onclick = function(){
        that.sign();
    }
}


// 获取数据库中的数据
Login.prototype.sign = function(){
    var that = this;
    ajaxGet(this.loginUrl).then(function(res){
        that.res = JSON.parse(res);
        // console.log(that.res)
        if(that.res.code == 0){
            alert("数据加载失败，错误信息为：" + that.res.msg);
        }else{
            // 将获取的数据与登陆信息作比对，与数据库中一致则登陆成功
            that.contrast(that.res);
        }
    })
}

// 比较数据库与自己填写的登录数据
Login.prototype.contrast = function(res){
    console.log(res);
    var onoff = false;
    if(!this.txt.value && !this.pass.value){
        this.modal(2);
    }else{
        for(var i in res){
            if(res[i].username == this.txt.value && res[i].password == this.pass.value){
                this.obj = {name:res[i].username,pass:res[i].password,onoff:1};
                setCookie("obj",JSON.stringify(this.obj));
                onoff = true;
            }
        }
        if(onoff == true){
            if(this.span.innerHTML != this.code.value){
                this.modal(3)
            }else{
                this.modal(1);
            }
        }else{
            this.modal(0);
        }
    }
}

// 模态框
Login.prototype.modal = function(type){
    if(type == 1){
        location.href = "http://localhost/shop/index.html";
    }else if(type == 2){
        this.box.style.display = "block";
        this.box.innerHTML = "用户名或密码不能为空";
        setTimeout(() => {
        this.box.style.display = "none";            
        }, 1000);
    }else if(type == 0){
        this.box.style.display = "block";
        this.box.innerHTML = "用户名或密码错误";
        setTimeout(() => {
        this.box.style.display = "none";            
        }, 1000);
    }else{
        this.box.style.display = "block";
        this.box.innerHTML = "验证码错误";
        setTimeout(() => {
        this.box.style.display = "none";            
        }, 1000);
    }
}


// 随机数
Login.prototype.randomCode = function(){
    function random(max,min){
        return Math.round(Math.random()*(max-min)+min);
    }

    var str = "";
    for(var i=0;i<4;i++){
        var AZ = String.fromCharCode(random(65,90));
        var az = String.fromCharCode(random(97,122));
        var s = Math.random() < 0.5 ? AZ : az;
        str += s;
    }
    return str;
}


new Login({
    sub:document.getElementById("sub"),
    txt:document.getElementById("txt"),
    pass:document.getElementById("pass"),
    code:document.getElementById("code"),
    span:document.querySelector("span"),
    box:document.querySelector(".box")
});

