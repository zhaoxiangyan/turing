<template>
    <div class="add">
        <div class="box" v-show="all">
            <div id="add_title">
                <span>填写个人资料</span>
            </div>
            <div class="add_div">
                <div class="add_box">
                    <div>
                        <div class="add_personal">
                            <!--用户个人信息填写--> 
                           <form  @submit.prevent="confirm">
                            <p><span class="input_title">姓名：</span> <input class="input_content" type="text" id="name" placeholder="请输入真实姓名" v-model="name" name="username"></p>
                            <div><span class="error" v-show="error.name1">*请输入正确的姓名</span></div>
                            <p><span class="input_title">邮箱：</span> <input class="input_content" type="text" id="email" placeholder="请输入邮箱地址" v-model="email" name="email"></p>
                            <div><span class="error" v-show="error.email1">*请输入正确的邮箱</span></div>
                            <p><span class="input_title">身份证号码：</span> <input class="input_content" type="text" id="card" placeholder="请输入身份证号码" v-model="card" name="idcard"></p>
                            <div><span class="error" v-show="error.card1">*请输入正确的身份证号码</span></div>
                            <p class="file_box">
                               <span class="input_title">身份证正面：</span>
                               <a href="javascript:void(0)">{{file_name1}}</a>
                               <input class="input_content" type="file" name='idcardPic' id="file1" @change="uploadCard1()" accept="image/png, image/jpeg, image/gif, image/jpg" >
                            </p>
                            <!--如果在input file标签里写成accept='image/*'会造成点击按钮后等待时间稍长-->
                            <div>
                                <img id="img1" >
                                <span class="error" v-show="error.file11">*请上传身份证正面照</span>
                            </div>
                            <p class="file_box">
                                <span class="input_title">身份证反面：</span>
                                <a href="javascript:void(0)">{{file_name2}}</a>
                                <input class="input_content" type="file" name='idcardPic' id="file2" @change="uploadCard2()" accept="image/png, image/jpeg, image/gif, image/jpg">
                            </p>
                            <div>
                                <img id="img2" >
                                <span class="error" v-show="error.file21">*请上传身份证反面照</span>
                            </div>
                            <p class="file_box">
                                <span class="input_title">手持身份证正面：</span>
                                <a href="javascript:void(0)">{{file_name3}}</a>
                                <input class="input_content" type="file" name='idcardPic' id="file3" @change="uploadCard3()" accept="image/png, image/jpeg, image/gif, image/jpg">
                            </p>
                            <div>
                                <img id="img3" >
                                <span class="error" v-show="error.file31">*请上传手持身份证正面照</span>
                                <span class="tips">注意事项：上传的图片格式为jpg/jpeg/gif/png,大小不要超过2M；否则影响审核！</span>
                            </div>
                            <div class="checked_div">
                                <input type="checkbox" id="checkbox" v-model="checked"> 同意并接受
                                <a href="/system/protocol" class="" target="_blank">图灵用户协议</a>
                            </div>
                            <div class="confirm-submit">
                                <input type="submit" id="submit" value="确认提交" v-if="checked" >
                                <input type="submit" id="submit" disabled="disabled" value="确认提交" v-else>
                            </div>
                            <div id="http_message" class="error" v-show="http_mess">
                                {{http_message}}
                            </div>
                           </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Add',
        data() {
            return {
                all:false,
                phone:'',
                password:'',
                code:'',
                userId: '',
                detailInforId:'',
                name: '',
                email: '',
                card: '',
                file_name1:'点击选择图片上传',
                file1: false,
                file_name2:'点击选择图片上传',
                file2: false,
                file_name3:'点击选择图片上传',
                file3:false,
                checked:false,
                http_mess:false,
                http_message:'',
                error: {
                    name1:false,
                    email1:false,
                    card1:false,
                    file11:false,
                    file21:false,
                    file31:false
                }
            }
        },
        mounted: function() {
            document.title = "填写个人资料";
            var self = this;
            if(sessionStorage.getItem("password")){
                self.phone = sessionStorage.getItem("phone1");
                self.password = sessionStorage.getItem("password")
                self.$http({
                        method: 'post',
                        url: '/turingcloud/userInfor/byPassword?username='+self.phone+'&password='+self.password
                    }).then(function(res){
                        // console.log(res);
                        var storage = window.sessionStorage; 
                        storage.setItem("userid",res.data.body.id);
                        if(res.data.body.detailInformation != null){
                                   storage.setItem("detailInforId",res.data.body.detailInformation.id);
                        }
                        self.updatesession();
                    }).catch(function(err){
                       console.log("AJAX失败");
                    }); 
            }else if(sessionStorage.getItem("msmCode")){
                self.phone = sessionStorage.getItem("phone2");
                self.code = sessionStorage.getItem("msmCode");
                self.$http({
                        method: 'post',
                        url: '/turingcloud/userInfor/byMsm?phone='+self.phone+'&msmCode='+self.code
                    }).then(function(res){
                        // console.log(res);
                        var storage = window.sessionStorage; 
                        storage.setItem("userid",res.data.body.id);
                        if(res.data.body.detailInformation != null){
                                   storage.setItem("detailInforId",res.data.body.detailInformation.id);
                        }
                        self.updatesession();
                    }).catch(function(err){
                       console.log("AJAX失败");
                    }); 
            }else {
               self.updatesession();
            }
  
        },
        watch:{
            name:function(){
               var self = this;
               var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
                if(self.name === '' || !nameReg.test(self.name)){
                     self.error.name1 = true;
                }else{
                    self.error.name1 = false;
                }
            },
            card:function(){
                var self = this;
                var cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(self.card === '' || !cardReg.test(self.card)){
                     self.error.card1 = true;
                }else{
                    self.error.card1 = false;
                }
            },
            file1:function(){
                var self = this;
                if(self.file1 == false){
                     self.error.file11 = true;
                }else{
                    self.error.file11 = false;
                }
            },
            file2:function(){
                 var self = this;
                if(self.file2 == false){
                     self.error.file21 = true;
                }else{
                    self.error.file21 = false;
                }
            },
            file3:function(){
                 var self = this;
                if(self.file3 == false){
                     self.error.file31 = true;
                }else{
                    self.error.file31 = false;
                }
            }
        },
        methods: {
            updatesession(){ 
            var self = this;
            if(!sessionStorage["userid"]){
                self.$router.push('/system/register');
            }else{
                self.all = true;
                self.userId = sessionStorage.getItem("userid");    
                self.detailInforId = sessionStorage.getItem("detailInforId");
            }
            },
            // 检测图片格式大小符合
            testIMG(img){
                var path = img.value;
                var fileExt = path.substring(path.lastIndexOf(".")).toLowerCase();
                if (!fileExt.match(/.jpg|.jpeg|.gif|.png|.bmp/i)) {
                    // 上传的文件不是图片，请重新上传
                   return false;
                }
                var size = (img.files[0].size / 1024).toFixed(0);
                if(size>2048){
                    //   图片文件大于2M
                    return false;
                }
                return true;
                // alert('你选择的文件大小' + (img.files[0].size / 1024).toFixed(0) + "kb");
            },
            uploadCard1(){
                var self = this;
                var reader = new FileReader();
                var fileID = document.getElementById("file1");
                if(!this.testIMG(fileID)){
                    self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
                }else{
                    var file = document.getElementById("file1").files[0];
                    self.file_name1 = file.name;
                    //读取文件过程方法
                    reader.onload = function (e) {
                        // console.log("成功读取....");
                        var img = document.getElementById("img1");
                        img.style.display = 'inline-block';
                        img.src = e.target.result;
                        self.file1 = true;
                        //或者 img.src = this.result;  //e.target == this
                    }
                    reader.readAsDataURL(file)
                }
            },
            uploadCard2(){
                var self = this;
                var reader = new FileReader();
                var fileID = document.getElementById("file2");
                if(!this.testIMG(fileID)){
                    self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
                }else{
                    var file = document.getElementById("file2").files[0];
                    self.file_name2 = file.name;
                    //读取文件过程方法
                    reader.onload = function (e) {
                        // console.log("成功读取....");
                        var img = document.getElementById("img2");
                        img.style.display = 'inline-block';
                        img.src = e.target.result;
                        self.file2 = true;
                        //或者 img.src = this.result;  //e.target == this
                    }
                    reader.readAsDataURL(file)
                }
            },
            uploadCard3(){
                var self = this;
                var reader = new FileReader();
                var fileID = document.getElementById("file3");
                if(!this.testIMG(fileID)){
                    self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
                }else{
                    var file = document.getElementById("file3").files[0];
                    self.file_name3 = file.name;
                    //读取文件过程方法
                    reader.onload = function (e) {
                        // console.log("成功读取....");
                        var img = document.getElementById("img3");
                        img.style.display = 'inline-block';
                        img.src = e.target.result;
                        self.file3 = true;
                        //或者 img.src = this.result;  //e.target == this
                    }
                    reader.readAsDataURL(file)
                }
            },
            confirm() {
                var self = this;
                // var nameReg = /^([\u4E00-\u9FA5]{2,}+|[a-zA-Z]+)$/;
                var nameReg = /^[\u4e00-\u9fa5]{2,4}$/;
                // var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                var cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(self.name === '' || !nameReg.test(self.name)){
                     self.error.name1 = true;
                     return false;
                } else if(self.email === '' || !emailReg.test(self.email)){
                     self.error.email1 = true;
                     return false;
                } else if(self.card === '' || !cardReg.test(self.card)){
                     self.error.email1 = false;
                     self.error.card1 = true;
                     return false;
                } else if(self.file1 == false){
                      self.error.file11 = true;
                      return false;
                } else if(self.file2 == false){
                      self.error.file21 = true;
                      return false;
                } else if(self.file3 == false){
                      self.error.file31 = true;
                      return false;
                } else {
                    var image = new FormData();
                    image.append('userId',self.userId);
                    if(self.detailInforId){
                       image.append('detailInforId',self.detailInforId);
                    }
                    image.append('username',self.name);
                    image.append('email',self.email);
                    image.append('idcard',self.card);
                    image.append('multipartFile1',document.getElementById("file1").files[0]);
                    image.append('multipartFile2',document.getElementById("file2").files[0]);
                    image.append('multipartFile3',document.getElementById("file3").files[0]);
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/userInfor',
                        data:image
                    }).then(function(res){
                        if(res.data.success == false){
                            self.$message.error(res.data.message);
                        }else{
                            self.$message({
                                    showClose: true,
                                    // message: res.data.message,
                                    message:"您提交的信息客服会在24小时内进行审核，请您耐心等待！",
                                    type: 'success',
                                    onClose:function(){
                                        self.$router.push('/system/login');
                                    }
                            });
                        }
                    }).catch(function(err){
                       console.log("AJAX失败");
                    });
                }
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
.add{
    width:100%;
    /*height:100%;*/
    background:#324157;
    /*min-height:800px;*/
    /*min-height:1100px;*/
    min-height:100%;
    min-width:450px;
    padding:60px 0;
}
.add div.box{
    width:420px;
    /*position:relative;*/
    margin:0px auto;
    background:#fff;
    border-radius:5px;
    border:1px solid #fff;
    /*top:60px;*/
}
#add_title{
    width:100%;
    text-align:center;
    border-bottom:1px solid #e8e8e8;
    height:50px;
}
#add_title span{
   display:inline-block;
   padding:0 5px;
   height:50px;
   line-height:50px; 
   color:#333;
   border-bottom:2px solid #000;
}
.add_div{
    width:420px;
    margin:0 auto;
    overflow:hidden;
}
.add_box{
    width:360px;
    /*min-height:370px;*/
    margin:0 auto;
    padding:20px 0;
}
/*手机用户注册*/
.add_personal{
    
}
.add_personal p{
    margin:10px 0;
    border:1px solid #ddd;
    padding:0 15px;
    border-radius:20px;
    background:#fff;
}
.input_title{
    width:120px;
    color:#000;
}
.input_title{
    display:inline-block;
    height:40px;
    line-height:40px;
    font-size:14px;
    text-align:right;
}
.input_content{
    display:inline-block;
    height:40px;
    line-height:40px;
    font-size:14px;
    width:200px;
}
#img1,#img2,#img3{
    display:none;
    max-width:100%;
    max-height:150px;
}
.file_box{
    position:relative;
}
.file_box input{
    opacity:0;
}
.file_box a{
    position:absolute;
    color:#3175d1;
    display:inline-block;
    width:200px;
    height:40px;
    text-align:left;
    line-height:40px;
    font-size:15px;
    overflow:hidden;
}
span.tips{
    display:block;
    font-size:14px;
    text-align:left;
    color: #76838f;
}
.checked_div{
    padding-left:15px;
    font-size:14px;
    color:#666;
    margin:10px 0;
    text-align:left;
}
#checkbox{
    width:15px;
    height:15px;
    display:inline-block;
    background:#fff;
    vertical-align:-3px;
}
.checked_div a{
    color:#3175d1;
    font-size:14px;
}
.confirm-submit{
    width:100%;
}
#submit{
    display: inline-block;
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

</style>