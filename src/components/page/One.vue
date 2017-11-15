<template>
	<div class="one">
	<div v-title>签约合作协议</div>
	    <div class="page_title">
		    <span>签约合作协议<i>*您如果想和我们合作，请先下载协议，打印后签名，再扫描上传已签约的协议，再提交审核</i></span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>签约合作协议</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
		<el-row class="page_content">
		  <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>合作协议：</span>
			  </el-col>
			  <el-col  :span="16">
		        <a class="preview" href="http://192.168.0.133/system/file/agreement.pdf" target="_blank"><i class="el-icon-document"></i>三方合作协议</a>
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col :span="16">
			     <a class="download" href="http://192.168.0.133/system/file/agreement.zip">下载协议</a>
			  </el-col>  
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议上传方式：</span>
			  </el-col>
			  <el-col :span="16" class="li_right radio35">
                <el-switch  v-model="switch1"  off-color="#13ce66" on-text="PDF文件"  off-text="图片文件" :width='90'></el-switch>
			  </el-col>
			</el-row>  
		  <div v-if="switch1">	 		
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file" accept="application/pdf" @change="uploadUser()" name="cooperationPdf">
				<span class="mask user_mask">{{user}}</span>
			  </el-col>
			</el-row> 
			</div>
			<div v-else>
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file1" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser1()" name="cooperationPic">
				<span class="mask user_mask1">{{user1}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file1">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img1">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第二页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file2" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser2()" name="cooperationPic">
				<span class="mask user_mask2">{{user2}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file2">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img2">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第三页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file3" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser3()" name="cooperationPic">
				<span class="mask user_mask3">{{user3}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file3">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img3">
			  </el-col>
			</el-row>
			<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用的平台：</span>
				  </el-col>
				  <el-col :span="16" class="li_right platform select100">
					    <template>
								<el-select v-model="value1" placeholder="请选择">
									<el-option
									v-for="item in options1"
									:key="item.value1"
									:label="item.label1"
									:value="item.value1">
									</el-option>
								</el-select>
					  	</template>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>MT4账号：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="input2" placeholder="请输入MT4账号" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="password" v-model="password" placeholder="请输入MT4密码" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>确认MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="password" v-model="repassword" placeholder="请再次输入MT4密码" ></el-input>
          </el-col>
				</el-row>	
			</div>		
		</el-row>	  
		<div class="page_footer">
		   <span>交易有风险，入市须谨慎！</span>
			 <a href="javascript:void(0)">提交</a>
		</div>
	</div>	
</template>
<script>
 export default {
    data() {
      return {
    //   协议上传方式选择
		  radio:'0',
		  switch1:false,
		  radio1:'0',
		  switch2:false,
    //    三方协议pdf
	   user:'选择PDF文件',
		 user_file:false,
	  //    三方协议img
     user1:'上传协议第一页',
		 user2:'上传协议第二页',
		 user3:'上传协议第三页',
		 user_file1:false,
		 user_file2:false,
		 user_file3:false,
		 // 使用的平台select
		options1: [{
          value1: '1',
          label1: 'GQ-capital'
        }],
    value1: '',
		// MT4账号
		input2: '',
		// MT4密码
		password:'',
		repassword:'',
	//    扣款协议pdf
	   debit:'上传协议pdf文件',
		 debit_file:false,
	//    扣款协议img
     debit1:'上传协议第一页',
		 debit2:'上传协议第二页',
		 debit_file1:false,
		 debit_file2:false,
		//  上传出错
		 error:{
			//  扣款协议pdf
            user:false,
			user_text:'协议上传错误',
			//  扣款协议img
            user1:false,
			user_text1:'协议上传错误',
			//  扣款协议pdf
            debit:false,
			debit_text:'协议上传错误',
			//  扣款协议img
            debit1:false,
			debit_text1:'协议上传错误'
		 },
		//  添加MT4账号
		accounts:[
			{value:''}
		]
		
      };
    },
    methods: {
		// 三方合作协议pdf文件
		uploadUser(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("user_file").files[0];
			self.user = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.user_file = true;
			}
			reader.readAsDataURL(file)
		},
		uploadUserPDF() {
			var self = this;
		      self.error.user = false;
			if(self.user_file == false){
					self.error.user_text = '上传协议出错';
					self.error.user = true;
					return false;
			}else {
				var userid = window.sessionStorage['userId'];
				var image = new FormData();
				image.append('cooperationPdf',document.getElementById("user_file").files[0]);
				self.$http({
					method: 'post',
					url: '/turingcloud/user/'+userid+'/contract/pdf/addCooperation',
					data:image
				}).then(function(res){
			    	if(res.status == '201'){
						alert('协议上传成功，请等待审核');
					}else if(res.status == '400'){
						alert('用户数据获取错误，请重新登录');
					}else if(res.status == '500'){
						alert('文件因服务器内部存储失败');
					}else{
						alert('Error：协议上传出错');
					}
				}).catch(function(err){
					alert("AJAX失败");
				});
			}
	    },		
		// 三方合作协议img文件
		uploadUser1(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("user_file1").files[0];
			self.user1 = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.user_file1 = true;
				var img = document.getElementById("user_img1");
                    img.style.display = 'inline-block';
                    img.src = e.target.result;
			}
			reader.readAsDataURL(file)
		},
		uploadUser2(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("user_file2").files[0];
			self.user2 = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.user_file2 = true;
				var img = document.getElementById("user_img2");
                    img.style.display = 'inline-block';
                    img.src = e.target.result;
			}
			reader.readAsDataURL(file)
		},
		uploadUser3(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("user_file3").files[0];
			self.user3 = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.user_file3 = true;
				var img = document.getElementById("user_img3");
                    img.style.display = 'inline-block';
                    img.src = e.target.result;
			}
			reader.readAsDataURL(file)
		},
		uploadUserIMG() {
			var self = this;
		      self.error.user1 = false;
			if(self.user_file1 == false){
					self.error.user_text1 = '上传协议第一页出错';
					self.error.user1 = true;
					return false;
			} else if(self.user_file2 == false){
					self.error.user_text1 = '上传协议第二页出错';
					self.error.user1 = true;
					return false;
			} else if(self.user_file3 == false){
					self.error.user_text1 = '上传协议第三页出错';
					self.error.user1 = true;
					return false;
			} else {
				var image = new FormData();
				image.append('cooperationPic',document.getElementById("user_file1").files[0]);
				image.append('cooperationPic',document.getElementById("user_file2").files[0]);
				image.append('cooperationPic',document.getElementById("user_file3").files[0]);
				self.$http({
					method: 'post',
					url: '/turingcloud/user/upload/cooperationPic',
					data:image
				}).then(function(res){
				//    alert(res.data);
					if(res.data == true){
						alert('协议上传成功，请等待审核');
					}else{
						alert('Error：协议上传出错');
					}
				}).catch(function(err){
					alert("AJAX失败");
				});
			}
	    }
    }
}
</script>
<style scoped>
.one{
	/*position:relative;*/
	min-height:100%;
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
	/*margin:30px 0 45px;
	padding:0 30px;
	text-align:left;*/
	padding-bottom:35px;
}
.page_content .li{
	margin-top:35px;
	text-align:left;
}
.page_content a.preview{
	box-sizing:border-box;
	display:inline-block;
	width:100%;
	height:35px;
	color:#fff;
	background:#21b548;
	border-radius:3px;
	border:1px solid #1a913a;
	line-height:35px;
	text-align:left;
	/*margin-right:30px;*/
}
.el-icon-document{
	display:inline-block;
	color:#fff;
	height:100%;
	width:35px;
	border-right:1px solid #1a913a;
	line-height:35px;
	font-size:25px;
	text-align:center;
	float:left;
	margin-right:20px;
}
.li_left span{
    display: block;
    height: 35px;
    line-height: 35px;
    text-align: right;
    padding-right: 10%;
}
.page_content  a.download,.page_content  div.file_box,.page_content  input,.page_content  .file_box span{
	/*display:inline-block;*/
	/*margin:0 10px 10px 0;*/
	padding:0;
    /*min-width:90px;*/
	height:35px;
	line-height:35px;
	border-radius:4px;
	text-align:center;
}
.page_content  .file_box span{
	display:block;
	color:rgb(32, 160, 255);
	font-size:15px;
}
.page_content  div.file_box{
	border:1px solid #bfcbd9;
	box-sizing:border-box;
	position:relative;
	cursor:pointer;
	vertical-align:middle;
}
.page_content  .file_box:hover{
	border-color: #20a0ff;
}
.page_content  a.download{
	display:block;
	box-sizing:border-box;
	color:#20a0ff;
	vertical-align:middle;	
	border: 1px solid #bfcbd9;
}
.page_content  a.download:hover{
    border-color: #20a0ff;
}
.page_content  input.mt4_input{
	width:200px;
	font-size:13px;
	text-align:left;
	padding:0 10px;
}
.page_content  .mt4_box i{
	display:inline-block;
	width:78px;
	text-align:center;
	margin-right:20px;
	height:33px;
	line-height:33px;
	font-style:normal;
	border-radius:2px;
	border:1px solid #b4b1b2;
	vertical-align:middle;
	cursor:pointer;
}
.page_content  .mt4_box i:hover{
	color:#20a0ff;
	border:1px solid #20a0ff;
}
.page_content  input[type='file']{
	opacity:0;
	position:absolute;
	filter:alpha(opacity=0);
    -moz-opacity:0;
	top:0px;
    left:0px;
	cursor:pointer;
	width:100%;
}
.page_content  .file_box span{
	cursor:pointer;
    box-sizing:border-box;
   	overflow:hidden;
}
.page_content  span.mask_user1{
}
.page_content  span.mask_user2{}
.page_content  span.mask_user3{}
.page_content  input[type='submit']{
	background:#fff;
	cursor:pointer;
	vertical-align:middle;
}
.page_content  p{
	margin-top:10px;
	color:#797878;
	font-size:15px;
}

.li  div img{
	display:none;
	vertical-align:bottom;
	max-width:100%;
}


.radio35{
    line-height: 35px;
}
.select100 .el-select{
    width: 100%;
}

em.error{
	font-style:normal;
	color:red;
}
@media screen and (max-width: 1230px) {
    
}


.page_footer{
	height: 55px;
  border-top: 1px solid #f4f4f4;
  text-align: left;
  padding: 0 10px;
}
.page_footer span{
	display: inline-block;
  height: 55px;
  line-height: 55px;
}
.page_footer a{
	float:right;
	display:inline-block;
	width:80px;
	height:35px;
	margin-top:10px;
	background:#21b548;
	color:#fff;
	text-align:center;
	line-height:35px;
	border-radius:4px;
}

</style>