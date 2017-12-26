<template>
	<div class="transaction">
	  <div class="page_title">
		    <span><i class="el-icon-edit"></i>账户交易配置</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>账户交易配置</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
		<el-row class="page_content">
			  <!--<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>三方合作协议：</span>
				  </el-col>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>您已签约三方合作协议</a>
          </el-col>
				</el-row>-->
				<!--<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>委托扣款协议：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>您已签约委托扣款协议</a>
          </el-col>
				</el-row>	-->

		  <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>扣款协议：</span>
			  </el-col>
			 <el-col  :span="16" class="li_right">
		      <a class="preview" href="https://turingtechcn.com/file/委托扣款三方协议.pdf" download="委托扣款三方协议.pdf" ><i class="el-icon-document"></i>委托扣款协议</a>
			 </el-col>
			</el-row>
			<!--<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col  :span="16" class="li_right">
			   <a class="download" href="https://turingtechcn.com/file/委托扣款三方协议.zip">下载协议</a>
			  </el-col>
			</el-row>-->
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议上传方式：</span>
			  </el-col>
			  <el-col    :span="16" class="li_right radio35">
                  <el-switch  v-model="switch0"  off-color="#13ce66" on-text="PDF文件"  off-text="图片文件" :width='90'></el-switch>
									<i v-if="switch0">（*请上传pdf格式的文件，大小不要超过2M）</i>
									<i v-else>（*请上传jpg/png/jpeg/gif格式的图片，大小不要超过2M）</i>
			  </el-col>			 
			</el-row>
			<el-row class="li margintop20">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col    :span="16" class="li_right radio35">
									<i v-if="switch0" class="red_text">*如果您需要上传图片格式，请点击一下按钮。</i>
									<i v-else class="red_text">*如果您需要上传PDF格式，请点击一下按钮。</i>
			  </el-col>			 
			</el-row>
			<div v-if="switch0">
			<el-row class="li margintop0">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
					<span class="mask user_mask">{{debit}}</span>
			  </el-col>  
			</el-row>
			</div>
			<div v-else>
			<el-row class="li margintop0" >
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<input type="file" id="debit_file1" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit1()" name="withholdPic">
				<span class="mask user_mask1">{{debit1}}</span>
			  </el-col>
			</el-row>
			<el-row class="li" v-show="debit_file1">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col :span="16" class="li_right">
			    <img id="debit_img1">
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第二页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<input type="file" id="debit_file2" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit2()" name="withholdPic">
				<span class="mask user_mask2">{{debit2}}</span>
			  </el-col>
			</el-row>
			<el-row class="li" v-show="debit_file2">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>预览：</span>
			  </el-col>
			  <el-col :span="16" class="li_right">
			     <img id="debit_img2">
			  </el-col>
			</el-row>
			</div>

				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>您的平台：</span>
				  </el-col>
				  <!--<el-col :span="8" class="li_right platform select100">
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
          </el-col>-->
					<el-col :span="16" class="li_right">
					  	<el-input v-model="value1" placeholder="请输入交易平台名字"></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>MT4账号：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="input2"  type="number" placeholder="请输入7位数字的MT4账号" ></el-input>
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
				<!--<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>修改MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
				    	<el-switch on-text="" off-text="" v-model="switch1" :width="80"></el-switch>
          </el-col>
				</el-row>-->
				<el-row class="li" v-show="switch1">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>新的MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="password" v-model="password1" placeholder="请输入新的MT4密码" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li" v-show="switch1">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>确认新的MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="password" v-model="repassword1" placeholder="请再次输入新的MT4密码" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>账户投资资金：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="input1" placeholder="请输入投资金额（美元）"></el-input>
          </el-col>
				</el-row>	
			    <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用挂机模式：</span>
				  </el-col>
				  <el-col :span="16" class="li_right select100">
					    <template>
								<el-select v-model="value3" placeholder="请选择">
									<el-option
									v-for="item in options3"
									:key="item.value3"
									:label="item.label3"
									:value="item.value3">
									</el-option>
								</el-select>
					  	</template>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>同意挂机费用：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="switch2"  on-text="同意"  off-text="不同意" :width='80'></el-switch>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>建议回撤：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35 small_text">
					    <!--<el-switch  v-model="switch3"  on-text="自定义"  off-text="35%" off-color="#13ce66" :width='80' ></el-switch>-->
							<el-radio class="radio" v-model="switch3" label="0">35%</el-radio>
              <el-radio class="radio" v-model="switch3" label="1">自定义</el-radio>
					  	<el-input v-model="input5" placeholder="自定义回撤百分比" :disabled="switch3=='0'?true:false">
							  <template slot="append">%</template>
							</el-input>
          </el-col>
				</el-row>
		</el-row>
		<div class="page_footer clearfix">
		   <span>图灵智能交易系统仅提供软件服务。交易有风险，入市须谨慎！</span>
			 <el-button type="success" @click="submitSetting()" :disabled="!switch2">提交</el-button>
		</div>
	</div>	
</template>
<script>
 export default {
    name: 'Transaction',
    data() {
      return {
		  userid:'',
	  // 上传扣款协议
		 switch0:false,
    // 扣款协议pdf
	   debit:'上传协议pdf文件',
		 debit_file:false,
  	// 扣款协议img
     debit1:'上传协议第一页',
		 debit2:'上传协议第二页',
		 debit_file1:false,
		 debit_file2:false,
		//   账户投资资金select
		input1: '',
		// 使用的平台select
		options1: [{
          value1: 'GQCapital-Live',
          label1: 'GQCapital-Live'
        }],
    value1: '',
		// MT4账号
		input2: '',
		// MT4密码
		password:'',
		repassword:'',
		// 是否修改MT4密码
		switch1:false,
		// 新的MT4密码
		password1:'',
		repassword1:'',
		// 使用挂机模式
		options3: [{
          value3: '1',
          label3: 'pipsbot'
        // },{
        //   value3: '2',
        //   label3: '宏利先锋型'
        // }, {
        //   value3: '3',
        //   label3: '趋势策略型'
        // }, {
        //   value3: '4',
        //   label3: '综合尊享型'
        }],
    value3: '',
		// 同意挂机费用
		switch2:false,
		// 建议回撤
		switch3:'0',
		input5: '',
		retreatRate: '35'
      };
    },
		mounted:function(){
			document.title = "账户交易配置";
      var self = this;
      if(localStorage["userid"]){
        self.userid = localStorage.getItem("userid");
      }else{
        self.$router.push('/system/');
      }   
    },
		watch:{
			 switch3:function(){
				  var self = this;
          if(self.switch3 == "0"){
						self.retreatRate = "35";
					}else if(self.switch3 == "1"){
						self.retreatRate = self.input5;
					}
			 },
			 input5:function(){
				  var self = this;
					self.retreatRate = self.input5;
			 }
		},
    methods: {
			  // 检测图片格式大小符合
				testIMG(img){
						var path = img.value;
						var fileExt = path.substring(path.lastIndexOf(".")).toLowerCase();
						if (!fileExt.match(/.jpg|.jpeg|.gif|.png|.bmp/i)) {	// 上传的文件不是图片，请重新上传
								return false;
						}
						var size = (img.files[0].size / 1024).toFixed(0);
						if(size>2048){ 	//   图片文件大于2M
								return false;
						}
						return true;
				},
				// 检测PDF文件格式大小符合
				testPDF(pdf){
						var path = pdf.value;
						var fileExt = path.substring(path.lastIndexOf(".")).toLowerCase();
						if (!fileExt.match(/.pdf/i)) {	// 上传的文件不是PDF，请重新上传
								return false;
						}
						var size = (pdf.files[0].size / 1024).toFixed(0);
						if(size>2048){	//   PDF文件大于2M
								return false;
						}
						return true;
				},
				// 委托扣款协议pdf文件
				uploadDebit(){
					var self = this;
					var reader = new FileReader();
					var fileID = document.getElementById("debit_file");
					if(!this.testPDF(fileID)){
										self.$message.error('上传文件大小类型不符');
                    fileID.value = "";
                    return false;
          }else{
						var file = document.getElementById("debit_file").files[0];
						self.debit = file.name;
						//读取文件过程方法
						reader.onload = function (e) {
							// console.log("成功读取....");
							self.debit_file = true;
						}
						reader.readAsDataURL(file)
					}
				},
				// 委托扣款协议img文件
				uploadDebit1(){
					var self = this;
					var reader = new FileReader();
					var fileID = document.getElementById("debit_file1");
					if(!this.testIMG(fileID)){
										self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
          }else{
						var file = document.getElementById("debit_file1").files[0];
						self.debit1 = file.name;
						//读取文件过程方法
						reader.onload = function (e) {
							// console.log("成功读取....");
							self.debit_file1 = true;
							var img = document.getElementById("debit_img1");
													img.style.display = 'inline-block';
													img.src = e.target.result;
						}
						reader.readAsDataURL(file)
					}
				},
				uploadDebit2(){
					var self = this;
					var reader = new FileReader();
					var fileID = document.getElementById("debit_file2");
					if(!this.testIMG(fileID)){
										self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
          }else{
						var file = document.getElementById("debit_file2").files[0];
						self.debit2 = file.name;
						//读取文件过程方法
						reader.onload = function (e) {
							// console.log("成功读取....");
							self.debit_file2 = true;
							var img = document.getElementById("debit_img2");
													img.style.display = 'inline-block';
													img.src = e.target.result;
						}
						reader.readAsDataURL(file)
					}
				},
				// 提交交易配置			
				submitSetting(){
					 var self = this;
					//  var mt4Reg = /^\d+$/;
					 var mt4Reg = /^\d{7}$/;
           if(self.switch0 == true){
            // 上传pdf文件方式
						 if(self.debit_file == false){
                 self.$message.error('上传PDF文件出错');
						 }else if(self.value1 === ''){
							  self.$message.error('请选择使用的平台');
						 }else if(self.input2 === ''||!mt4Reg.test(self.input2)){
							  self.$message.error('请填写7位数字的MT4账号');
						 }else if(self.password === ''){
							  self.$message.error('MT4密码不能为空');
						 }else if(self.repassword != self.password){
							  self.$message.error('两次密码不一致');
						 }else if(self.input1 === ''){
							  self.$message.error('账户投资资金不能为空');
						 }else if(self.value3 === ''){
							 self.$message.error('请至少选择一种挂机模式');
						 }else if(self.retreatRate === ''){
							 self.$message.error('建议回撤未填写');
						 }else{
							      var httpform = new FormData();
                    httpform.append('fileType',self.switch0);
                    httpform.append('multipartFile1',document.getElementById("debit_file").files[0]);
                    httpform.append('platform',self.value1);
                    httpform.append('mt4Account',self.input2);
										httpform.append('mt4Password',self.password);
										httpform.append('capital',self.input1);
										httpform.append('mode',self.value3);
										httpform.append('agreeHangupCosts',self.switch2);
										httpform.append('retreatRate',self.retreatRate);
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/trnsaction/'+self.userid,
                        data:httpform
                    }).then(function(res){
                        if(res.data.success == false){
                            self.$message.error(res.data.message);
                        }else{
													  self.$alert('您提交的信息客服会在24小时内进行审核，请您耐心等待！', '图灵智能交易系统', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    self.$router.push('/system/home');
                                }
                            });
                            // self.$message({
                            //         showClose: true,
                            //         message: "您提交的信息客服会在24小时内进行审核，请您耐心等待！",
                            //         type: 'success',
														// 				onClose:function(){
														// 						self.$router.push('/system/home');
														// 				}
                            // });
                        }
                    }).catch(function(err){
                       console.log("AJAX失败");
                    });
						 }
					 }else{
               // 上传图片方式
						 if(self.debit_file1 == false || self.debit_file2 == false){
                 self.$message.error('上传图片文件出错');
						 }else if(self.value1 === ''){
							  self.$message.error('请选择使用的平台');
						 }else if(self.input2 === ''||!mt4Reg.test(self.input2)){
							  self.$message.error('请填写7位数字的MT4账号');
						 }else if(self.password === ''){
							  self.$message.error('MT4密码不能为空');
						 }else if(self.repassword != self.password){
							  self.$message.error('两次密码不一致');
						 }else if(self.input1 === ''){
							  self.$message.error('账户投资资金不能为空');
						 }else if(self.value3 === ''){
							 self.$message.error('请至少选择一种挂机模式');
						 }else if(self.retreatRate === ''){
							 self.$message.error('建议回撤未填写');
						 }else{
							      var httpform = new FormData();
                    httpform.append('fileType',self.switch0);
                    httpform.append('multipartFile1',document.getElementById("debit_file1").files[0]);
										httpform.append('multipartFile2',document.getElementById("debit_file2").files[0]);
                    httpform.append('platform',self.value1);
                    httpform.append('mt4Account',self.input2);
										httpform.append('mt4Password',self.password);
										httpform.append('capital',self.input1);
										httpform.append('mode',self.value3);
										httpform.append('agreeHangupCosts',self.switch2);
										httpform.append('retreatRate',self.retreatRate);
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/trnsaction/'+self.userid,
                        data:httpform
                    }).then(function(res){
                        if(res.data.success == false){
                            self.$message.error(res.data.message);
                        }else{
                            self.$alert('您提交的信息客服会在24小时内进行审核，请您耐心等待！', '图灵智能交易系统', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    self.$router.push('/system/home');
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
}
</script>
<style scoped>
.transaction{
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
.page_title span i.el-icon-edit{
	display:inline-block;
	color:#444;
	height:100%;
	width:35px;
	line-height:40px;
	font-size:18px;
	float:left;
	text-align:center;
}
.el-breadcrumb{
	display:inline-block;
	float:right;
}

.page_content{
  padding-bottom:35px;
}
.page_content .li{
	margin-top:35px;
	/*padding:0 30px;*/
	/*height:35px;*/
	text-align:left;
}
.page_content .li.margintop20{
	margin-top:20px;
}
.page_content .li.margintop0{
	margin-top:0px;
}
.page_content .li a.preview{
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
	margin-right:10px;
}
.page_content .li div{
	/*height:35px;*/
}
.page_content .li_left{}
.li_left span{
	display:block;
	height:35px;
	line-height:35px;
	text-align:right;
	padding-right:10%;
	font-weight:bold;
}
.page_content .li_right{
	/*padding-right:30px;*/
}
.li_right a{}
.capital .el-select{
	width:40%;
}
.capital .el-input{
	float:right;
	width:50%;
}
.select100 .el-select{
	width:100%;
}
.text40 .el-input{
	width:40%;
}
.radio35{
	line-height:35px;
}
.radio35 i{
	color:#76838f;
	font-style:normal;
}
.radio35 i.red_text{
	color:red;
}
.small_text .el-input{
	float:right;
	width:40%;
}



.page_footer{	
	height: 50px;
  border-top: 1px solid #f4f4f4;
  text-align: left;
  padding: 0 10px;
}
.page_footer span{
	display: inline-block;
  /*height: 55px;*/
	height:50px;
  line-height: 50px;
}
.page_footer button{
	float:right;
	width:80px;
	margin:7px 0;
}

/*修改样式*/
.el-radio+.el-radio{
	margin-left:5px;
}
.small_text .el-input{
	width:30%;
}


/*扣款协议上传*/
.li_right a.download,.file_box input,.file_box span,.file_box{
    display: inline-block; */
    /* margin: 0 10px 10px 0; */
    padding: 0;
    /* min-width: 90px; */
    height: 35px;
    line-height: 35px;
    border-radius: 4px;
    text-align: center;
}
.li_right a.download{
   	display: block;
    box-sizing: border-box;
    color: #20a0ff;
    vertical-align: middle;
    border: 1px solid #bfcbd9;
}
.li_right a.download:hover{
    border-color: #20a0ff;
}
.file_box input[type='file']{
    opacity: 0;
    position: absolute;
    filter: alpha(opacity=0);
    -moz-opacity: 0;
    top: 0px;
    left: 0px;
    cursor: pointer;
    width: 100%;
}
.file_box span{
  	display: block;
    color: rgb(32, 160, 255);
    font-size: 15px;
		cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
}
.file_box{
  	border: 1px solid #bfcbd9;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
}
.file_box:hover{
	border-color: #20a0ff;
}
.li div img{
	  display:none;
	  vertical-align: bottom;
    max-width: 100%;
}
</style>