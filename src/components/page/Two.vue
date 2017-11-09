<template>
	<div class="two">
	<div v-title>账户交易配置</div>
	  <div class="page_title">
		    <span><i class="el-icon-edit"></i>账户交易配置</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>账户交易配置</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
		<el-row class="page_content">
			    <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>三方合作协议：</span>
				  </el-col>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>您已签约三方合作协议</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>委托扣款协议：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>您已签约委托扣款协议</a>
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
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>修改MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
				    	<el-switch on-text="" off-text="" v-model="switch1" :width="80"></el-switch>
          </el-col>
				</el-row>
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
					   <el-input v-model="input1" placeholder="请输入投资金额（单位：美元）"></el-input>
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
				    <span>最大回撤选择：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35 small_text">
					<el-switch  v-model="switch3"  on-text="自定义"  off-text="35%" off-color="#13ce66" :width='80' ></el-switch>
					  	<el-input v-model="input5" placeholder="自定义回撤百分比" v-show="switch3"></el-input>
          </el-col>
				</el-row>
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
		//   账户投资资金select
		input1: '',
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
		// 是否修改MT4密码
		switch1:false,
		// 新的MT4密码
		password1:'',
		repassword1:'',
		// 使用挂机模式
		options3: [{
          value3: '选项1',
          label3: '成长型'
        }, {
          value3: '选项2',
          label3: '宏利先锋型'
        }, {
          value3: '选项3',
          label3: '趋势策略型'
        }, {
          value3: '选项4',
          label3: '综合尊享型'
        }],
    value3: '',
		// 同意挂机费用
		switch2:false,
		// 最大回撤选择
		switch3:false,
		input5: ''
      };
    },
    methods: {
	
    }
}
</script>
<style scoped>
.two{
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
.page_content  .li{
	margin-top:35px;
	/*padding:0 30px;*/
	height:35px;
	text-align:left;
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
	height:35px;
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
	padding-right:30px;
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
.small_text .el-input{
	float:right;
	width:40%;
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

/*修改样式*/
.el-radio+.el-radio{
	margin-left:5px;
}
.small_text .el-input{
	width:30%;
}
</style>