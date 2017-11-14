<template>
	<div class="one">
	<div v-title>签约协议</div>
	    <div class="page_title">
		    <span>签约协议<i>Sign Contract</i></span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>签约协议</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
		<el-row class="page_content">
		  <el-col class="li_box" :xs="24" :sm="24" :md="24" :lg="12">
		    <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>合作协议：</span>
			  </el-col>
			  <el-col  :span="16">
		        <a class="preview" href="http://192.168.0.133/system/file/agreement.pdf" target="_blank"><i class="el-icon-document"></i>三方合作协议</a>
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col :span="16">
			     <a class="download" href="http://192.168.0.133/system/file/agreement.zip">下载协议</a>
			  </el-col>  
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议上传方式：</span>
			  </el-col>
			  <el-col :span="16" class="li_right radio35">
                <el-switch  v-model="switch1"  off-color="#13ce66" on-text="PDF文件"  off-text="图片文件" :width='90'></el-switch>
			  </el-col>
			</el-row>  
		    <form v-if="switch1">	 		
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file" accept="application/pdf" @change="uploadUser()" name="cooperationPdf">
				<span class="mask user_mask">{{user}}</span>
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col  :span="16">
				<!--<input type="submit" value="提交">-->
				<el-button type="primary" @click="uploadUserPDF" >确定上传</el-button>
				<em class="error" v-show="error.user">{{error.user_text}}</em>
			  </el-col> 
			</el-row>  
			</form>
			<form v-else>
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file1" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser1()" name="cooperationPic">
				<span class="mask user_mask1">{{user1}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file1">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img1">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议第二页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file2" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser2()" name="cooperationPic">
				<span class="mask user_mask2">{{user2}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file2">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img2">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议第三页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="user_file3" accept="image/png, image/jpeg, image/gif, image/jpg"  @change="uploadUser3()" name="cooperationPic">
				<span class="mask user_mask3">{{user3}}</span>
			  </el-col>
			</el-row>
			<el-row class="li"  v-show="user_file3">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col  :span="16">
				<img id="user_img3">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col  :span="16">
				<!--<input type="submit" value="提交">-->
				<el-button type="primary" @click="uploadUserIMG" >确定上传</el-button>
				<em class="error" v-show="error.user1">{{error.user_text1}}</em>
			  </el-col> 
			</el-row>  
			</form>			
			  <p>*您如果同意签约，请先下载协议，打印后签名，再扫描上传已签约的协议，再提交审核</p>
		  </el-col>
		  <el-col class="li_box"  :xs="24" :sm="24" :md="24" :lg="12">
		    <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>扣款协议：</span>
			  </el-col>
			 <el-col  :span="16">
		      <a class="preview" href="http://192.168.0.133/system/file/agreement.pdf" target="_blank"><i class="el-icon-document"></i>委托扣款协议</a>
			 </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col  :span="16" class="li_right">
			   <a class="download" href="http://192.168.0.133/system/file/agreement.zip">下载协议</a>
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议上传方式：</span>
			  </el-col>
			  <el-col    :span="16" class="li_right radio35">
                  <el-switch  v-model="switch2"  off-color="#13ce66" on-text="PDF文件"  off-text="图片文件" :width='90'></el-switch>
			  </el-col>			 
			</el-row>
			<form  v-if="switch2">
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
				<span class="mask user_mask">{{debit}}</span>
			  </el-col>  
			</el-row>
			<el-row class="li">
			   <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>关联MT4账号：</span>
			   </el-col>
               <el-col :span="16" class="mt4_box  li_right">
					<!--<input class="mt4_input" type="text" v-for="account in accounts" v-model="account.value" placeholder="请输入协议相关联的MT4账号">-->
					<el-input class="mt4_input" type="text" v-for="account in accounts" :key="account.index" v-model="account.value"  placeholder="请输入协议相关联的MT4账号"></el-input>
			   </el-col>
			</el-row>	
			<el-row class="li">
			   <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>操作：</span>
			   </el-col>
               <el-col :span="16" class="mt4_box li_right">
			        <el-button  @click="addMT4" >新增</el-button>
			    	<el-button @click="removeMT4" >删除</el-button>
					<!--<i  @click="addMT4">新增</i><i  @click="removeMT4">删除</i>-->
			   </el-col>
			</el-row>	
		    <el-row class="li">
			   <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span></span>
			   </el-col>
			   <el-col :span="16">
			    <el-button type="primary" @click="uploadDebitPDF" >确定上传</el-button>
				<!--<input type="submit" value="提交">-->
				<em class="error" v-show="error.debit">{{error.debit_text}}</em>
			   </el-col> 
			</el-row>  
			</form>
			<form   v-else>
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="debit_file1" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit1()" name="withholdPic">
				<span class="mask user_mask1">{{debit1}}</span>
			  </el-col>
			</el-row>
			<el-row class="li" v-show="debit_file1">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col :span="16">
			    <img id="debit_img1">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>协议第二页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box">
				<input type="file" id="debit_file2" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit2()" name="withholdPic">
				<span class="mask user_mask2">{{debit2}}</span>
			  </el-col>
			</el-row>
			<el-row class="li" v-show="debit_file2">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col :span="16">
			     <img id="debit_img2">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			     <span>关联MT4账号：</span>
			  </el-col>
			  <el-col :span="16" class="mt4_box">
					<!--<input class="mt4_input" type="text" v-for="account in accounts" v-model="account.value" placeholder="请输入协议相关联的MT4账号">-->
             	    <el-input class="mt4_input" type="text" v-for="account in accounts" :key="account.index" v-model="account.value"  placeholder="请输入协议相关联的MT4账号"></el-input>
		  	  </el-col>	
			</el-row>
		    <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			      <span>操作：</span>
			  </el-col>
			  <el-col :span="16" class="mt4_box">
			       <el-button  @click="addMT4" >新增</el-button>
				   <el-button @click="removeMT4" >删除</el-button>
                   <!--<i  @click="addMT4">新增</i><i  @click="removeMT4">删除</i>-->
		  	  </el-col>	
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="6" :lg="8" class="li_left">
			      <span></span>
			  </el-col>
			  <el-col  :span="16">
				<!--<input type="submit" value="提交">-->
				<el-button type="primary" @click="uploadDebitIMG" >确定上传</el-button>
				<em class="error" v-show="error.debit1">{{error.debit_text1}}</em>
			  </el-col> 
			</el-row>  
			</form>
			  <p>*您如果同意签约，请先下载协议，打印后签名，再扫描上传已签约的协议，再提交审核</p>
		  </el-col>
		</el-row>	  
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
	    },
        // 委托扣款协议pdf文件
		uploadDebit(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("debit_file").files[0];
			self.debit = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.debit_file = true;
			}
			reader.readAsDataURL(file)
		},
		uploadDebitPDF() {
			var self = this;
		      self.error.debit = false;
			if(self.debit_file == false){
					self.error.debit_text = '上传协议出错';
					self.error.debit = true;
					return false;
			}else {
				var userid = window.sessionStorage['userId']; 
				var image = new FormData();
				image.append('withholdPdf',document.getElementById("debit_file").files[0]);
				self.$http({
					method: 'post',
					url: '/turingcloud/user/'+userid+'/contract/pdf/addWithhold',
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
		// 委托扣款协议img文件
		uploadDebit1(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("debit_file1").files[0];
			self.debit1 = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.debit_file1 = true;
				var img = document.getElementById("debit_img1");
                    img.style.display = 'inline-block';
                    img.src = e.target.result;
			}
			reader.readAsDataURL(file)
		},
		uploadDebit2(){
			var self = this;
			var reader = new FileReader();
			var file = document.getElementById("debit_file2").files[0];
			self.debit2 = file.name;
			//读取文件过程方法
			reader.onload = function (e) {
				console.log("成功读取....");
				self.debit_file2 = true;
				var img = document.getElementById("debit_img2");
                    img.style.display = 'inline-block';
                    img.src = e.target.result;
			}
			reader.readAsDataURL(file)
		},
		uploadDebitIMG() {
			var self = this;
		      self.error.debit1 = false;
			if(self.debit_file1 == false){
					self.error.debit_text1 = '上传协议第一页出错';
					self.error.debit1 = true;
					return false;
			} else if(self.debit_file2 == false){
					self.error.debit_text1 = '上传协议第二页出错';
					self.error.debit1 = true;
					return false;
			} else {
				var image = new FormData();
				image.append('withholdPic',document.getElementById("debit_file1").files[0]);
				image.append('withholdPic',document.getElementById("debit_file2").files[0]);
				self.$http({
					method: 'post',
					url: '/turingcloud/upload/withholdPic',
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
	    },
		// 添加MT4账号
        addMT4(){
			var self = this;
			self.accounts.push({
				value:''
			})
		},
		removeMT4(){
			var self = this;
			var index = self.accounts.length-1;
			if(index !== 0){
			 self.accounts.splice(index,1)
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

}
.page_content .li_box{
	margin:30px 0 45px;
	padding:0 30px;
	text-align:left;
}
.page_content .li_box a.preview{
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
.page_content .li_box a.download,.page_content .li_box div.file_box,.page_content .li_box input,.page_content .li_box .file_box span{
	/*display:inline-block;*/
	/*margin:0 10px 10px 0;*/
	padding:0;
    /*min-width:90px;*/
	height:35px;
	line-height:35px;
	border-radius:4px;
	text-align:center;
}
.page_content .li_box .file_box span{
	display:block;
	color:rgb(32, 160, 255);
	font-size:15px;
}
.page_content .li_box div.file_box{
	border:1px solid #bfcbd9;
	box-sizing:border-box;
	position:relative;
	cursor:pointer;
	vertical-align:middle;
}
.page_content .li_box .file_box:hover{
	border-color: #20a0ff;
}
.page_content .li_box a.download{
	display:block;
	box-sizing:border-box;
	color:#20a0ff;
	vertical-align:middle;	
	border: 1px solid #bfcbd9;
}
.page_content .li_box a.download:hover{
    border-color: #20a0ff;
}
.page_content .li_box input.mt4_input{
	width:200px;
	font-size:13px;
	text-align:left;
	padding:0 10px;
}
.page_content .li_box .mt4_box i{
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
.page_content .li_box .mt4_box i:hover{
	color:#20a0ff;
	border:1px solid #20a0ff;
}
.page_content .li_box input[type='file']{
	opacity:0;
	position:absolute;
	filter:alpha(opacity=0);
    -moz-opacity:0;
	top:0px;
    left:0px;
	cursor:pointer;
	width:100%;
}
.page_content .li_box .file_box span{
	cursor:pointer;
    box-sizing:border-box;
   	overflow:hidden;
}
.page_content .li_box span.mask_user1{
}
.page_content .li_box span.mask_user2{}
.page_content .li_box span.mask_user3{}
.page_content .li_box input[type='submit']{
	background:#fff;
	cursor:pointer;
	vertical-align:middle;
}
.page_content .li_box p{
	margin-top:10px;
	color:#797878;
	font-size:15px;
}

.li .el-col{
	margin:10px 0;
}
.li  div img{
	display:none;
	vertical-align:bottom;
	max-width:100%;
}


.radio35{
    line-height: 35px;
}


em.error{
	font-style:normal;
	color:red;
}
@media screen and (max-width: 1230px) {
    
}


</style>