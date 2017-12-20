<template>
   <div class="login">
   	  <div class="title">图灵智能交易管理系统</div>
   	  <div class="login-form">
         <ul class="switch">
           <li  class="active">管理员登录</li>
         </ul>
   	  	 <form class="password_form" >
   	  	 	<div class="required phone1_div">
            <img src="../../../assets/img/login_01.png">
   	  	 		<input type="text" name="phone1"  v-model="phone" placeholder="请输入手机号" id="phone1">
   	  	 	</div>
   	  	 	<div class="required password_div">
            <img src="../../../assets/img/login_02.png">
   	  	 		<input type="password" name="password"  v-model="password" placeholder="请输入密码" id="password">
   	  	 	</div>
          <div id="login_message" class="error" v-show="empty">
             {{message}}
          </div>
   	  	 	<div class="login_div">
   	  	 		<input type="button" value="登录" id="submit1" @click="login">
   	  	 		</input>
   	  	 	</div>
   	  	 </form>
   	  </div>
   </div>	
</template>
<script>
	export default {
  name: 'Login',
  data () {
    return {
      // 密码登录
      phone: '',
      password: '',
      // repassword: false,
      empty:false,
      message:'请填写完整',
    }
  },
  mounted:function(){
    document.title = "管理员登录";
  },
  watch:{

  },
  methods: {
    login () {
      var self = this;
      self.empty = false;
      // var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
      // var pswReg = /^\w{6,16}$/;
      if (self.phone === '' || self.password === '') {
         self.message = "请填写完整";
         self.empty = true;
         return false;
      // }else if(!phoneReg.test(self.phone)){
      //      self.message = "请输入正确的手机号码";
      //      self.empty = true;
      //      return false;
      // }else if(!pswReg.test(self.password)){
      //      self.message = '请输入格式正确的密码（6-16位字母、数字和下划线）';
      //      self.empty = true;
      //      return false;
      }else {
         // 此处加入后台AJAX验证
          var formdata = new FormData();
              formdata.append('username',self.phone);
              formdata.append('password',self.password);
          self.$http({
                method: 'post',
                url: '/turingcloud/login',
                data:formdata
          }).then(function(res){
            if(res.data.principal.roles[0].id == 1){
              var storage = window.localStorage; 
              if(storage["adminid"]){
                storage.setItem("adminid",res.data.principal.id);
              }else{
                storage.setItem("adminid",res.data.principal.id);
              }
              if(storage["adminname"]){
                storage.setItem("adminname",res.data.principal.detailInformation.username);
              }else{
                storage.setItem("adminname",res.data.principal.detailInformation.username);
              }
              self.$message({
                message: '登录成功',
                type: 'success',
                duration: '2000',
                onClose:function(){
                    self.$router.push('/system/admin/home');
                }
              });
            }else{
              self.$message.error('请使用管理员账号登录');
            }
          }).catch(function(err){
              // 手机号密码错误统一500错误，需要改接口
              self.message = err.response.data.message;
              self.empty = true;
          });
      }
    }
  }
	}
</script>
<!-- scoped  样式只对当前组件起作用 -->
<style scoped>
*{
  box-sizing:border-box;
}
ul,ol,li{
    list-style:none;
}
.login{
	position:relative;
	width:100%;
	height:100%;
	background:#324157;
      min-height:800px;
    min-width:500px;
}
.login .title{
  	position: absolute;
    top: 150px;
    width: 100%;
    /*margin-top: -230px;*/
    text-align: center;
    font-size: 30px;
    color: #fff;
}
/*.login .login-form{
	position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}*/
.login .login-form{
    width: 456px;
    background-color: #fff;
    border-radius: 7px;
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    transition: all .3s ease;
    position: absolute;
    font-family: Helvetica,Arial,sans-serif;
    top: 250px;
    left: 0;
    right: 0;
    margin: auto;
}
.switch{
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #e8e8e8;
  height: 50px;
}
.switch li{
   display:inline-block;
   padding:0 5px;
   height:50px;
   line-height:50px; 
   color:#999;
   cursor:pointer;
}
.switch li.code_switch{
  margin-left:30px;
}
.switch li.active{
    color:#333;
    border-bottom:2px solid #000;
}
.login-form form{
  margin:40px 0;
  padding:0;
}
form div.phone1_div,form div.password_div{
  width:310px;
  font-size:14px;
  padding-right:20px;
  margin:10px auto;
  border:1px solid #d8d8d8;
  border-radius:20px;
  height:40px;
}
form div img{
  margin:10px 10px 0 20px;
}
#password,#phone1,#submit1{
  background-color:transparent;
  outline:0;
}
.phone1_div input,.password_div input{
  width:240px;
  float:right;
  border-radius:4px;
  height:38px;
  line-height:38px;
}
form div.re{
  width:310px;
  margin:15px auto;
  padding:0 10px;
  text-align:left;
  font-size:14px;
}
.re label{
  color:#858b97;
}
.re input{
  width:13px;
  height:13px;
  margin-right:5px;
  display:inline-block;
  vertical-align:-2px;
}
.password_form .re a{
  float:right;
  color:#333;
}
.login_div input#submit1{
  width:315px;
  display:block;
  margin:0 auto 8px;
  background-color:#3175d1;
  color:#fff;
  border-radius:20px;
  height:40px;
  border:0;
  cursor:pointer;
  font-size:14px;
}
.error{
  color:red;
}
#login_message{
  margin:10px;
  font-size:14px;
}
p.error{
  text-align:center;
}
/*短信验证码*/
form div.phone2_div,form div.code_div{
  width:310px;
  font-size:14px;
  padding-right:20px;
  margin:10px auto;
  border:1px solid #d8d8d8;
  border-radius:20px;
  height:40px;
}
#code,#phone2,#submit2{
  background-color:transparent;
  outline:0;
}
.phone2_div input{
  width:240px;
  float:right;
  border-radius:4px;
  height:38px;
  line-height:38px;
}
.code_div input{
  width:120px;
  height:38px;
  line-height:38px;
  float:right;
}
#send{
  background:#fff;
  cursor:pointer;
  text-align:right;
}
#send:hover{
  color:#3175d1;
}
.code_form .re{
  text-align:right;
}
.code_form .re a{
  color:#333;
}
.login_div input#submit2{
  width:315px;
  display:block;
  margin:0 auto 8px;
  background-color:#3175d1;
  color:#fff;
  border-radius:20px;
  height:40px;
  border:0;
  cursor:pointer;
  font-size:14px;
}
#code_message{
  margin:10px;
  font-size:14px;
}
/*立即注册公用*/
.register_div p{
  text-align:center;
  margin:20px auto;
  color:#858b97;
  font-size:14px;
}
.register_div p a{
  color:#3175d1;
}
</style>
