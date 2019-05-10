
function Login(option){
    this.sub = option.sub;
    this.txt = option.txt;
    this.pass = option.pass;
    this.rpass = option.rpass;
    this.box = option.box;

    
    // 接口 
    this.loginUrl = "http://localhost/shop/php/register.php";

    // 绑定事件
    this.init();

}

// 绑定事件
Login.prototype.init = function(){
    var that = this;

    // 提交按钮的点击事件
    this.sub.onclick = function(){
        that.judge();

    }
}

// // 判断输入的用户名或者密码是否规范
Login.prototype.judge = function(){
    var a = b = c = 0;
    if(!this.txt.value || !this.pass.value){
        this.modal();
        this.box.innerHTML = "用户名或密码不能为空";
    }else if(this.txt.value && this.pass.value){
        if(isNaN(this.txt.value)){
            this.modal();
            this.box.innerHTML = "请输入正确的用户名";
            a = 1;
        }
        if(this.pass.value != this.rpass.value){
            this.modal();
            this.box.innerHTML = "密码不一致";
            b = 1;
        }
        if(this.pass.value.length<6 || this.pass.value.length>18 || !isNaN(this.pass.value)){
            this.modal();
            this.box.innerHTML = "密码格式不正确";
            c = 1;
        }
        if(a==0 && b==0 && c==0){
            this.sign();
        }
    }
}

// 设置模态框
Login.prototype.modal = function(){
    var that = this;
    this.box.style.display = "block";
    setTimeout(() => {
        that.box.style.display = "none";            
    }, 2000);
}

// 获取数据库中的数据
Login.prototype.sign = function(a,b,c){
    var that = this;
    ajaxGet(this.loginUrl,{
        username:this.txt.value,
        pass:this.pass.value
    }).then(function(){
        // console.log(1);
        that.box.style.display = "block";
        that.box.innerHTML = "注册成功";
        setTimeout(() => {
            that.box.style.display = "none";            
            location.href = "http://localhost/shop/login.html";         
        }, 2000);
    })
}


new Login({
    sub:document.getElementById("sub"),
    txt:document.getElementById("txt"),
    pass:document.getElementById("pass"),
    rpass:document.getElementById("rpass"),
    box:document.querySelector(".box")
});

