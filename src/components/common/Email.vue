<template>
    <div class="email">
      <div v-title>填写邮箱地址</div>
        <div class="box">
            <div id="email_title">
                <span>填写邮箱地址</span>
            </div>
            <div class="email_div">
                <div class="email_box">
                    <div>
                        <div class="email_input">
                            <!--用户邮箱地址-->
                            <p><input type="text" id="email" placeholder="请输入邮箱地址" v-model="email"> <input type="submit" v-model="sendEmail_text" :disabled='error.email' id="send" @click="sendEmail"> </p>
                            <div class="error_div"><span class="error" v-show="error.email">*请输入格式正确的邮箱地址</span></div>
                            <div class="email-submit">
                                <input type="submit" id="submit" value="邮箱已经激活，下一步" @click="next">
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
        name: 'Email',
        data() {
            return {
                email:'',
                sendEmail_text: '发送激活邮件',
                error: {
                    email:false
                }
            }
        },
        watch:{  
            // 监听邮箱input
            email:function(){
                var self = this;
                var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                if(self.email === '' || !emailReg.test(self.email)){
                     self.error.email = true;
                }else{
                    self.error.email = false;
                }
            }
        },
        methods: {
            // 发送激活邮件
            sendEmail(){
               alert('发送邮件click');
            },
            // 邮箱已经激活，下一步
            next(){
                this.$router.push('/system/add');
            }
        }
    }
</script>
<!-- scoped  样式只对当前组件起作用 -->
<style scoped>
*{
    box-sizing: border-box;
}
ul,ol,li{
    list-style:none;
}
.email{
    width:100%;
    height:100%;
    background:#324157;
    min-height:800px;
    min-width:500px;
}
.email div.box{
    width:420px;
    position:relative;
    margin:0 auto;
    background:#fff;
    border-radius:5px;
    border:1px solid #fff;
    top:160px;
}
#email_title{
    width:100%;
    text-align:center;
    border-bottom:1px solid #e8e8e8;
    height:50px;
}
#email_title span{
   display:inline-block;
   padding:0 5px;
   height:50px;
   line-height:50px; 
   color:#333;
   border-bottom:2px solid #000;
}
.email_div{
    width:420px;
    margin:0 auto;
    overflow:hidden;
}
.email_box{
    width:360px;
    /*min-height:370px;*/
    margin:0 auto;
    padding-bottom:40px;
    padding-top:20px;
}
/*填写邮箱地址*/
.email_input p{
    margin:10px 0;
    border:1px solid #ddd;
    padding:0 15px;
    border-radius:20px;
    background:#fff;
}
#email{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    width:220px;
}
#send{
    display:inline-block;
    line-height:40px;
    font-size:14px;
    width:100px;
    float:right;
    background:#fff;
    cursor:pointer;
    text-align:right;
}
.email_input div.error_div{
    text-align:left;
    padding-left:15px;
}
.error{
    color:red;
    font-size:14px;
}
#send:disabled{
    color:#666;
}
.email-submit{
    width:100%;
    height:40px;
}
#submit{
    display:inline-block;
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
</style>