<template>
	<div class="three" v-show="all">
	<div v-title>个人信息</div>
	    <div class="page_title">
		    <span>个人信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人信息</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
		<el-row class="page_content">
          <el-col :span="24">
            <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">真实姓名：</span>
              </el-col>
              <el-col  :span="16">
                <el-input v-model="body.username" placeholder="请输入真实姓名" :disabled="true"></el-input>
              </el-col>
            </el-row>
             <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">身份证号码：</span>
              </el-col>
              <el-col  :xs="16" :sm="16" :md="16" :lg="16">
                <el-input v-model="body.idcard" placeholder="请输入身份证号码" :disabled="true"></el-input>
              </el-col>
            </el-row>
            <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">居住地址：</span>
              </el-col>
              <el-col  :span="16"> 
<!--确定修改居住地址-->
<el-popover
  ref="popover5"
  placement="top"
  width="160"
  v-model="visible2">
  <p>确定修改居住地址吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
    <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
  </div>
</el-popover>                           
<el-input v-model="body.addr" placeholder="如：广东深圳">
    <el-button slot="append" icon="edit" v-popover:popover5 ></el-button>
</el-input>
<!--<v-distpicker></v-distpicker>-->
              </el-col>
            </el-row>
            <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">手机号码：</span>
              </el-col>
              <el-col  :span="16">
               <!-- <el-input v-model="input3" placeholder="1388888888"></el-input>-->
<el-input placeholder="请输入手机号码" v-bind:value="body.phone">
<el-tooltip slot="append" content="修改手机号码" placement="top">
    <el-button  icon="edit" @click="dialogFormVisible1 = true" ></el-button>
</el-tooltip>    
</el-input>                
              </el-col>
            </el-row>
            <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">邮箱：</span>
              </el-col>
              <el-col  :span="16">
                <!--<el-input v-model="input2" placeholder="989746@qq.com"></el-input>-->
<el-input placeholder="请输入邮箱" v-bind:value="body.email">
<el-tooltip slot="append" content="修改邮箱" placement="top">
    <el-button  icon="edit" @click="dialogFormVisible = true" ></el-button>
</el-tooltip>    
</el-input>
              </el-col>
            </el-row>
            <el-row class="li">
              <el-col  :xs="7" :sm="6" :md="5" :lg="5">
                 <span class="title">最近登录时间：</span>
              </el-col>
              <el-col  :span="16">
                <el-input v-bind:value="body.lastLoginTime | timeFilter" placeholder="2017/11/02" :disabled="true"></el-input>
              </el-col>
            </el-row>
          </el-col>
		</el-row>
        <div class="page_footer">
		      <a href="javascript:void(0)"  @click="dialogFormVisible2 = true" >修改登录密码</a>
			    <!--<a href="javascript:void(0)" class="fr">保存修改</a>-->
		</div>
<!--修改邮箱模态框-->
<el-dialog title="修改用户邮箱" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="原邮箱：" :label-width="formLabelWidth">
      <el-input v-bind:value="body.email"  placeholder="请输入旧的邮箱地址" :disabled="true"></el-input>
    </el-form-item>
    <el-form-item label="新邮箱：" :label-width="formLabelWidth">
      <el-input v-model="form.newemail"  placeholder="请输入新的邮箱地址"></el-input>
    </el-form-item>
    <el-form-item label="是否收到邮件：" :label-width="formLabelWidth">
      <template>
								<el-radio class="radio" v-model="form.radio" label="2">已接收邮件</el-radio>
								<el-radio class="radio" v-model="form.radio" label="1">邮件未收到</el-radio>
			</template>
      <el-button  type="text" @click="sendEmail()" :disabled="form.sendstatus" >{{form.sendtext}}</el-button>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyEmail()" :disabled="form.radio ==1 ? true:false ">确 定</el-button>
  </div>
</el-dialog>
<!--修改手机号码模态框-->
<el-dialog title="修改手机号码" :visible.sync="dialogFormVisible1">
  <el-form :model="form1">
    <el-form-item label="旧的手机号码：" :label-width="formLabelWidth1">
      <el-input v-bind:value="body.phone" placeholder="请输入旧的手机号码" :disabled="true" ></el-input>
    </el-form-item>
    <el-form-item label="短信验证码：" :label-width="formLabelWidth1">
      <el-input class="code_box"  v-model="form1.oldcode" placeholder="请输入短信验证码"></el-input>
      <el-button  type="text" @click="sendoldCode()" :disabled="form1.sendoldstatus">{{form1.sendoldtext}}</el-button>
    </el-form-item>
    <el-form-item label="新的手机号码：" :label-width="formLabelWidth1">
      <el-input v-model="form1.newphone" placeholder="请输入新的手机号码" ></el-input>    
    </el-form-item>
    <el-form-item label="短信验证码：" :label-width="formLabelWidth1">
      <el-input class="code_box"  v-model="form1.newcode" placeholder="请输入短信验证码"></el-input>
      <el-button  type="text" @click="sendnewCode()" :disabled="form1.sendnewstatus">{{form1.sendnewtext}}</el-button>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="modifyPhone()" :disabled="!modifyphone_button" >确 定</el-button>
  </div>
</el-dialog>
<!--修改密码模态框-->
<el-dialog title="修改登录密码" :visible.sync="dialogFormVisible2">
  <el-form :model="form2">
    <el-form-item label="旧的登录密码：" :label-width="formLabelWidth2">
      <el-input v-model="form2.oldpassword" placeholder="请输入旧的登录密码"  type="password"></el-input>
    </el-form-item>
    <el-form-item label="新的登录密码：" :label-width="formLabelWidth2">
      <el-input   v-model="form2.newpassword" placeholder="请输入新的登录密码" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认登录密码：" :label-width="formLabelWidth2">
      <el-input v-model="form2.repassword" placeholder="请再次输入新的登录密码" type="password"></el-input>    
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
    <el-button type="primary" @click="modifyPassword()" :disabled="!modifypassword_button">确 定</el-button>
  </div>
</el-dialog>
	</div>	
</template>
<script>
// import VDistpicker from 'v-distpicker'
// Vue.component('v-distpicker',VDistpicker)
 export default {
    data() {
      return {
        userid:'',
        all:false,
        body:{
          addr:'',
          email:'',
          idcard:'',
          lastLoginTime:'',
          phone:'',
          username:''
        },
        // 修改邮箱模态框
        dialogFormVisible: false,
        form: {
          radio: '1',
          newemail: '',
          sendtext: '发送邮件至新邮箱',
          sendstatus: false
        },
        formLabelWidth: '120px',
        // 修改手机号码模态框
        dialogFormVisible1: false,
        form1: {
          oldcode: '',
          sendoldstatus:false,
          sendoldtext:'发送短信验证码至旧手机号码',
          newphone: '',
          newcode: '',
          sendnewstatus:false,
          sendnewtext:'发送短信验证码至新手机号码'
        },
        formLabelWidth1: '120px',
        // 修改密码模态框
        dialogFormVisible2: false,
        form2: {
          oldpassword:'',
          newpassword:'',
          repassword:''
        },
        formLabelWidth2: '120px',
        // 确定修改居住地址
        visible2: false
      }
    },
    components:{
      // VDistpicker
    },
    computed:{
       modifyphone_button:function(){
          var self = this;
          if(self.form1.oldcode === ''||self.form1.newphone === ''||self.form1.newcode === ''){
            return false;
          }else{
            return true;
          }
       },
       modifypassword_button:function(){
          var self = this;
          if(self.form2.oldpassword === ''||self.form2.newpassword === ''||self.form2.repassword === ''){
            return false;
          }else{
            return true;
          }
       }
    },
    mounted:function(){
      var self = this;
      if(localStorage["userid"]){
        self.userid = localStorage.getItem("userid");
      }else{
        self.$router.push('/system/');
      }
      if(self.userid === ''){
        return false;
      }else{
      self.$http({
          method: 'get',
          url: '/turingcloud/user/'+self.userid,
          }).then(function(res){
            if(res.data.success == true){
              self.body = res.data.body;
              self.all = true;
            }else{
              // self.$message.error('用户登录失效，请重新登录！');
                self.$router.push('/system/');
            }
          }).catch(function(err){
              console.log("AJAX失败");
          }); 
      }
    },
    filters: {
      // 时间过滤器
      timeFilter:function(value){
          var date = new Date(value);
          var Y = date.getFullYear()+'-';
          var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes() + ':';
          var s = date.getSeconds();
            return Y+M+D+h+m+s; 
      }
    },
    methods: {
      // 发送邮件倒计时
      countdownEmail(){
          var self = this;
          self.form.sendtext = '重新发送(59)';
          var _step = 58;
          var _res = setInterval(function(){
              self.form.sendtext = '重新发送('+_step+')';
              _step-=1;
              if(_step<=0){
                  self.form.sendstatus = false;
                  self.form.sendtext = '发送邮件至新邮箱';
                  clearInterval(_res);
              }else{
                    self.form.sendstatus = true;
              }
          },1000);
      },
      // 发送邮件至新邮箱
      sendEmail(){
           var self = this;
           var emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
           if(self.form.newemail === ''|| !emailReg.test(self.form.newemail)){
             self.$message({
                message: '请输入有效的邮箱地址',
                type: 'warning'
              });
              return false;
           }else{
           self.$http({
                    method: 'post',
                    url: '/turingcloud/'+self.userid+'/validateEmail?email='+self.form.newemail
                    }).then(function(res){
                      if(res.data.success == true){
                        self.countdownEmail();
                      }
                    }).catch(function(err){
                        console.log("AJAX失败");
                    }); 
           }
      },
      //  确定修改邮箱地址
      modifyEmail:function(){
        var self = this;
         self.$http({
                  method: 'post',
                  url: '/turingcloud/'+self.userid+'/midifyEmail?email='+self.form.newemail
                  }).then(function(res){
                    console.log(res.data);
                    if(res.data.success == false){
                      self.$message({
                        message: res.data.message,
                        type: 'warning'
                      });
                    }else if(res.data.success == true){
                      self.$message({
                        message: '邮箱修改成功',
                        type: 'success'
                      });
                    }
                    // if(res.data.success == true){
                    // }
                  }).catch(function(err){
                      console.log("AJAX失败");
                  }); 
      },
      // 发送旧手机验证码倒计时
      countdownoldCode(){
          var self = this;
          self.form1.sendoldtext = '重新发送(59)';
          var _step = 58;
          var _res = setInterval(function(){
              self.form1.sendoldtext = '重新发送('+_step+')';
              _step-=1;
              if(_step<=0){
                  self.form1.sendoldstatus = false;
                  self.form1.sendoldtext = '发送短信验证码至旧手机号码';
                  clearInterval(_res);
              }else{
                    self.form1.sendoldstatus = true;
              }
          },1000);
      },
      // 发送验证码至旧手机号码
      sendoldCode(){
           var self = this;
           self.$http({
                    method: 'post',
                    url: '/turingcloud/phone/oldPhone/sendMsm?phone='+self.body.phone
                    }).then(function(res){
                      if(res.data.success == true){
                        self.countdownoldCode();
                      }else if(res.data.success == false){
                        self.$message.error(res.data.message);
                      }
                    }).catch(function(err){
                        console.log("AJAX失败");
                    }); 
      },
      // 发送新手机验证码倒计时
      countdownnewCode(){
          var self = this;
          self.form1.sendnewtext = '重新发送(59)';
          var _step = 58;
          var _res = setInterval(function(){
              self.form1.sendnewtext = '重新发送('+_step+')';
              _step-=1;
              if(_step<=0){
                  self.form1.sendnewstatus = false;
                  self.form1.sendnewtext = '发送短信验证码至新手机号码';
                  clearInterval(_res);
              }else{
                    self.form1.sendnewstatus = true;
              }
          },1000);
      },
      // 发送验证码至新手机号码
      sendnewCode(){
           var self = this;
           var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
           if(self.form1.newphone === ''|| !phoneReg.test(self.form1.newphone)){
             self.$message({
                message: '请输入有效的新手机号码',
                type: 'warning'
              });
              return false;
           }else{
           self.$http({
                    method: 'post',
                    url: '/turingcloud/phone/newPhone/sendMsm?phone='+self.form1.newphone
                    }).then(function(res){
                      if(res.data.success == true){
                        self.countdownnewCode();
                      }else if(res.data.success == false){
                        self.$message.error(res.data.message);
                      }
                    }).catch(function(err){
                        console.log("AJAX失败");
                    }); 
           }
      },
      // 确定修改手机号码
      modifyPhone(){
        var self = this;
        var phoneReg = /^1[3|4|5|7|8][0-9]\d{4,8}$/;
        if(self.form1.newphone === ''||phoneReg.test(self.form1.newphone)){
          self.$message({
                message: '请输入有效的新手机号码',
                type: 'warning'
              });
              return false;
        }else{
           self.$http({
                    method: 'post',
                    url: '/turingcloud/phone/'+self.userid+'/modifiedPhone?newPhone='+self.form1.newphone+'&newMsm='+self.form1.newcode+'&oldPhone='+self.body.phone+'&oldMsm='+self.form1.oldcode
                    }).then(function(res){
                      if(res.data.success == true){
                        self.$message({
                          message: '手机号码修改成功',
                          type: 'success'
                        });
                      }else if(res.data.success == false){
                        self.$message.error(res.data.message);
                      }
                    }).catch(function(err){
                        console.log("AJAX失败");
                    }); 
        }
      },
      // 修改登录密码
      modifyPassword(){
        var self = this;
        var pswReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (self.form2.oldpassword === '' || !pswReg.test(self.form2.oldpassword)) {
                self.$message({
                      message: '请输入旧的登录密码',
                      type: 'warning'
                    });
                return false;
        } else if(self.form2.newpassword === ''|| !pswReg.test(self.form2.newpassword)){
              self.$message({
                      message: '请输入格式正确的新登录密码（8-16位字母和数字的组合）',
                      type: 'warning'
                    });
                return false;
        } else if(self.form2.repassword != self.form2.newpassword ){
              self.$message({
                      message: '两次密码不一致',
                      type: 'warning'
                    });
                return false;
        } else {
           self.$http({
                    method: 'post',
                    url: '/turingcloud/user/'+self.userid+'/modifiedPassword?oldPassword='+self.form2.oldpassword+'&newPassword='+self.form2.newpassword
                    }).then(function(res){
                      if(res.data.success == true){
                        self.$message({
                          message: '登录密码修改成功',
                          type: 'success'
                        });
                      }else if(res.data.success == false){
                        self.$message.error(res.data.message);
                      }
                    }).catch(function(err){
                        console.log("AJAX失败");
                    }); 
        }
      }
    }
}
</script>
<style scoped>
.three{
	/*position:relative;*/
	/*min-height:100%;*/
	height:auto;
	background:#fff;
	border-bottom:1px solid #d2d6de;
    border-left:1px solid #e7ebf0;
	border-right:1px solid #e7ebf0;
	border-radius:4px;
}
.page_title{
	height:40px;
	border-bottom:1px solid #f4f4f4;
	text-align:left;
	padding:0 10px;
}
.page_title span{
	display:inline-block;
	height:40px;
	line-height:40px;
}
.page_title span i{
	font-style:normal;
	font-size:14px;
	margin-left:5px;
	color:#77779e;
}
.el-breadcrumb{
	display:inline-block;
	float:right;
}

.page_content{

}
.page_content .li{
    /*height:36px;*/
    margin:15px 0;
}
.page_content .li div{
    /*height:36px;*/
}
.li div span.title{
    display: block;
    /*height: 36px;*/
    line-height: 36px;
    text-align: right;
    padding-right: 10%;
}

.alignl{
    text-align:left;
}
.page_content .li div.file_box,.page_content .li input,.page_content .file_box span{
	display:inline-block;
	padding:0px;
	width:120px;
	height:36px;
	line-height:36px;
	border-radius:2px;
	border:1px solid #cecdcd;
	text-align:center;
    box-sizing:border-box;
    background:#21b548;
    color:#fff;
}
.page_content .li div.file_box{
	position:relative;
	border:none;
	cursor:pointer;
}
.page_content .li input[type='file']{
	opacity:0;
	position:absolute;
	filter:alpha(opacity=0);
    -moz-opacity:0;
	top:0px;
    left:0px;
	cursor:pointer;
}


.page_footer{
	height: 55px;
  border-top: 1px solid #f4f4f4;
  text-align: left;
  padding: 0 10px;
}
.page_footer a{
	display:inline-block;
	width:110px;
	height:35px;
	margin-top:10px;
	background:#21b548;
	color:#fff;
	text-align:center;
	line-height:35px;
	border-radius:4px;
}
.page_footer a.fr{
    float:right;
}
/*模态框element样式*/
.el-input.code_box{
  width:150px;
}
</style>