<template>
    <div class="find">
      <div v-title>找回密码</div>
        <div class="box">
            <div id="find_title">
                <span>找回密码</span>
            </div>
            <div class="find_div">
                <div class="find_box">
                    <div>
                        <div class="phone-find">
                            <!--手机用户注册-->
                            <p><span class="country">中国(+0086)</span> <input type="text" id="phone" placeholder="请输入手机号码" v-model="phone"></p>
                            <div class="error_div"><span class="error" v-show="error.phone1">*请输入正确的手机号码</span></div>
                            <p><input type="text" id="imgCode" placeholder="请输入图形验证码" v-model="img_code"> <img src="http://192.168.0.119/turingcloud/captcha/gen" id="veriImg" class="areaNum graph" onclick="this.src='http://192.168.0.119/turingcloud/captcha/gen?random='+Math.random()"></p>
                            <div class="error_div"><span class="error" v-show="error.img_code1">*图形验证码错误</span></div>
                            <p><input type="text" id="messageCode" placeholder="请输入短信验证码" v-model="code"> <input type="submit" v-model="sendMessage" :disabled='disabled' id="send" @click="sendCaptcha"></p>
                            <div class="error_div"><span class="error" v-show="error.code1">*短信验证码错误</span></div>
                            <p><input type="password" id="psw" placeholder="请输入密码" v-model="password"> </p>
                            <div class="error_div"><span class="error" v-show="error.password1">*请输入格式正确的密码（8-16位字母和数字的组合）</span></div>
                            <p><input type="password" id="repsw" placeholder="请再次输入密码" v-model="repassword"> </p>
                            <div class="error_div"><span class="error" v-show="error.repassword1">*两次密码不一致</span></div>
                            <div class="phone-submit">
                                <input type="submit" id="submit" value="提交" @click="find">
                            </div>
                            <div id="http_message" class="error" v-show="http_mess">
                                {{http_message}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'find',
        data() {
            return {
                phone: '',
                img_code: '',
                code:'',
                password:'',
                repassword:'',
                disabled: false,
                sendMessage: '发送短信验证码',
                error: {
                    phone1:false,
                    img_code1:false,
                    code1:false,
                    password1:false,
                    repassword1:false
                },
                http_mess:false,
                http_message:''
            }
        },
        watch:{
            // 手机号码
            phone:function(){
                var self = this;
                var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
                if(self.phone!=''&&phoneReg.test(self.phone)){
                    self.error.phone1 = false;
                }else{
                     self.error.phone1 = true;
                }
            }
            // 图形验证码
            // img_code:function(){
            //     /*var pswReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;*/
            //     var self = this;
            //     if(self.img_code.length!=4){
            //        self.error.img_code1 = true;
            //     }else{
            //     this.$http({
            //             method: 'post',
            //             url: '/turingcloud/captcha/validate?captcha='+self.img_code,
            //         }).then(function(res){
            //            if(res.data.rcode == '0'){
            //                self.error.img_code1 = false;
            //            }else{
            //                self.error.img_code1 = true;
            //            }
            //         }).catch(function(err){
            //            alert("AJAX失败");
            //         });  
            //     }
            // }
        },
        methods: {
            // 发送验证码倒计时
            countDown(){
                var self = this;
                self.sendMessage = '重新发送(59)';
                var _step = 58;
                var _res = setInterval(function(){
                    self.sendMessage = '重新发送('+_step+')';
                    _step-=1;
                    if(_step<=0){
                        self.disabled = false;
                        self.sendMessage = '发送短信验证码';
                        clearInterval(_res);
                    }else{
                          self.disabled = true;
                    }
                },1000);
            },
            // 点击发送验证码
            sendCaptcha(){
                var self = this;
                var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
                self.http_mess = false;
                if (self.phone === '' || !phoneReg.test(self.phone)) {
                    self.http_message = '*请输入正确的手机号码';
                    self.http_mess = true;
                    //  self.error.phone1 = true;
                     return false;
                } else if(self.img_code.length!=4){
                    //   self.error.img_code1 = true;
                    self.http_message = '*图形验证码错误';
                    self.http_mess = true;
                      return false;
                } else {
                     self.$http({
                         method: 'post',
                         url: '/turingcloud/msmCode/send?phone='+self.phone+'&imageCode='+self.img_code
                     }).then(function(res){
                        if(res.data.success == true){
                            self.countDown();
                        }else{
                            self.http_message = res.data.message;
                            self.http_mess = true;
                        }  
                     }).catch(function(err){
                        self.http_mess = true;
                        self.http_message = err.response.data.message;
                     });
                }
            },
            // 提交
            find() {
                var self = this;
                var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
                var pswReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
                // 8-16位字母和数字的组合
                if (self.phone === '' || !phoneReg.test(self.phone)) {
                     self.error.phone1 = true;
                     return false;
                } else if(self.password === ''|| !pswReg.test(self.password)){
                     self.error.password1 = true;
                     return false;
                } else if(self.repassword != self.password ){
                    self.error.repassword1 = true;
                    return false;
                } else {
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/findBackPassword?phone='+self.phone+'&msmCode='+self.code+'&password='+self.password
                    }).then(function(res){
                        if(res.data.success == true){
                            self.$message({
                                    showClose: true,
                                    message: res.data.message,
                                    type: 'success',
                                    onClose:function(){
                                        self.$router.push('/system/');
                                    }
                            });
                        }else if(res.data.success == false){
                            self.http_message = res.data.message;
                            self.http_mess = true; 
                        }
                    }).catch(function(err){
                        console.log(err);
                       alert("AJAX失败");
                    });
                    // self.$router.push('/add')
                    // alert('注册成功');
                }
            }
        }
    }
</script>
<!-- scoped  样式只对当前组件起作用 -->
<style scoped>
 * {
      box-sizing: border-box;
}
ul,ol,li{
    list-style:none;
}
.find{
    width:100%;
    height:100%;
    background:#324157;
    min-height:800px;
    min-width:500px;
}
.find div.box{
    width:420px;
    position:relative;
    margin:0 auto;
    background:#fff;
    border-radius:5px;
    border:1px solid #fff;
    top:160px;
}
#find_title{
    width:100%;
    text-align:center;
    border-bottom:1px solid #e8e8e8;
    height:50px;
}
#find_title span{
   display:inline-block;
   padding:0 5px;
   height:50px;
   line-height:50px; 
   color:#333;
   border-bottom:2px solid #000;
}
.find_div{
    width:420px;
    margin:0 auto;
    overflow:hidden;
}
.find_box{
    width:360px;
    /*min-height:370px;*/
    margin:0 auto;
    padding-bottom:40px;
    padding-top:20px;
}
/*手机用户注册*/
.phone-find{
    
}
.phone-find p{
    margin:10px 0;
    border:1px solid #ddd;
    padding:0 15px;
    border-radius:20px;
    background:#fff;
}
.phone-find div.error_div{
    text-align:left;
    padding-left:15px;
}
.country{
    width:100px;
    color:#000;
}
#phone,.country{
    display:inline-block;
    height:40px;
    line-height:40px;
    font-size:14px;
}
#phone{
    width:220px;
}
#imgCode{
    width:150px;
    height:40px;
}
#imgCode,#send{
    display:inline-block;
    line-height:40px;
    font-size:14px;
}
.areaNum{
    margin-top:0;
    height:30px;
    width:165px;
    cursor:pointer;
    vertical-align:-10px;
    display:inline-block;
}
#messageCode,#nickname,#repsw,#psw{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width: 100%;
}
#send{
    width:100px;
    float:right;
    background:#fff;
    cursor:pointer;
    text-align:right;
}
#send:disabled{
    color:#666;
}
#messageCode{
    width:220px;
}
.phone-submit{
    width:100%;
    /*height:40px;*/
}
#submit-find{
    line-height: 40px;
    display: inline-block;
    font-size: 16px;
    background: #3175d1;
    color: #fff;
    text-align: center;
    border-radius: 20px;
    border: 1px solid #fff;
    width: 100%;
    cursor: pointer;
}
#submit-find:disabled {
    background: #ddd;
    color: #999;
}
/*邮箱用户*/
.email-find{
   display:none;
}
.email-find p{
    margin:10px 0;
    border:1px solid #ddd;
    padding:0 15px;
    border-radius:20px;
    background:#fff;
}
#email,#nickname,#repsw,#psw,#submit{
    line-height: 38px;
    height: 38px;
    width: 100%;
    display: inline-block;
    font-size: 14px;
}
#submit{
    background: #3175d1;
    color: #fff;
    margin: 10px 0;
    border: 1px solid #ddd;
    padding: 0 15px;
    border-radius: 20px;
    line-height: 40px;
    height: 40px;
    font-size: 16px;
    width: 100%;
    cursor: pointer;
}
#submit:disabled {
    background: #ddd;
    color: #999;
}
.error{
    color:red;
    font-size:14px;
}
.email-find>div{
    text-align:left;
}
.email-find div span{
    padding:0 15px;
    display:inline-block;
}
</style>