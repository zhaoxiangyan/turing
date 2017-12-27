<template>
	<div class="information">
	    <div class="page_title">
		    <span><i class="el-icon-edit"></i>用户个人信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/admin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户个人信息</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<!--用户查询-->
<el-input placeholder="请输入内容" v-model="input6">
    <el-select v-model="select" slot="prepend" placeholder="请选择" class="search">
		  <el-option label="所有"   value="all"></el-option>
      <el-option label="用户姓名" value="username"></el-option>
      <el-option label="手机号码" value="phone"></el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="searchButton()"></el-button>
</el-input>
<!--个人信息表格table-->
<template>
  <el-table ref="table"
    :data="tablebody0"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="最后登录时间">
    </el-table-column>
		<el-table-column
		  prop="username"
			label="真实姓名">
		</el-table-column>
		<el-table-column
		  prop="phone"
			label="手机号码">
		</el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="idcard"
      label="身份证号码">
    </el-table-column>		
		<el-table-column
      prop="address"
      label="居住地址">
    </el-table-column>
		<el-table-column
      prop="handle"
      label="是否处理"
			width="95">
<template slot-scope="scope">
      <el-tag
          :type="scope.row.handle === '未处理' ? 'primary' : 'success'"
          close-transition>{{scope.row.handle}}</el-tag>
</template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
       <el-button type="text" size="small"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<!--个人信息状态指示色-->
<p class="state_tips">
<el-button type="primary" size="small" @click="csv_download()">导出Excel</el-button>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="search.size"
      layout="total, sizes, prev, pager, next"
      :total="total">
</el-pagination>
</p>
        </div>
		<!--图片预览页面模态框-->
    <el-dialog title="图片预览" :visible.sync="dialogImgVisible">
       <img  class="modal_img" :src="dialogImgUrl"  />
    </el-dialog>
    <!--管理用户个人信息编辑页面begin-->
		<el-dialog title="个人信息" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>真实姓名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-bind:value="modalbody.user.detailInformation.username" placeholder="用户真实姓名" disabled></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>手机号码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-bind:value="modalbody.user.phone" placeholder="用户手机号码" disabled></el-input>
          </el-col>
				</el-row>	
		<!--		<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>性别：</span>
				  </el-col>
				  <el-col :span="16" class="li_right  radio35">
					   <el-switch on-text="男" off-text="女" off-color="#ff4949" v-model="sex" :width="80" ></el-switch>
          </el-col>
				</el-row>	-->
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>身份证号码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-bind:value="modalbody.user.detailInformation.idcard" placeholder="用户身份证号码"  disabled></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>身份证正面：</span>
				  </el-col>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)" @click="ViewImg(modalbody.user.detailInformation.pic1)"><i class="el-icon-picture"></i>身份证正面照</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>身份证反面：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)" @click="ViewImg(modalbody.user.detailInformation.pic2)"><i class="el-icon-picture"></i>身份证反面照</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>手持身份证正面：</span>
				  </el-col>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)" @click="ViewImg(modalbody.user.detailInformation.pic3)"><i class="el-icon-picture"></i>手持身份证正面照</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>邮箱：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-bind:value="modalbody.user.email" placeholder="请输入邮箱" disabled ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>居住地址：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="text" v-bind:value="modalbody.user.detailInformation.addr" placeholder="如：广东深圳" disabled ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>用户审核：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="modalbody.user.detailInformation.isPass"  on-value="1" off-value="0" on-text="通过"  off-text="不通过" :width='80'></el-switch>
          </el-col>
				</el-row>
				<!--<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>是否发送信息：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="switch6"  on-text="发送"  off-text="不发送" :width='80'></el-switch>
          </el-col>
				</el-row>-->
				<el-row class="li textarea_box" >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>反馈信息：</span>
				  </el-col>
				  <el-col :span="16" class="li_right textarea_div" >
					  <el-input type="textarea" v-model="modalbody.user.detailInformation.handleResultDescription"></el-input>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>是否处理：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="modalbody.user.detailInformation.handleStatus" on-value="1" off-value="0"  on-text="已处理"  off-text="未处理" :width='80'></el-switch>
          </el-col>
				</el-row>
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="modify()" :disabled="modalbody.user.detailInformation.handleStatus == '0'?true:false">提交修改</el-button>
			<!--<el-button type="success" @click="stop">停止挂机</el-button>-->
			<el-button type="danger" @click="delete_setting()">删除</el-button>
			<el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
		</el-dialog>
        <!--编辑交易配置页面end-->
		<div class="page_footer">
		   <span>图灵智能交易系统仅提供软件服务。交易有风险，入市须谨慎！</span>
		</div>
	</div>	
</template>
<script>
 import moment from 'moment'
 import CsvExport from '../../../../src/utils/CsvExport.js'
 export default {
    name: 'Information',
    data() {
      return {
		name:'赵先生',
		phone:'15112345678',
		sex:true,
		card:'360421199312451452',
		// 身份证正面URL数据
		email:'98956@qq.com',
    address:'广东深圳',
		// 用户账号审核
		examine:false,
		// 管理员是否处理
		switch4:false,
		// 是否发送消息
		switch6:false,
		// 反馈信息
		value2:'',
		// 搜索框
		input6: '',
    select: 'all',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02',
			name:'gdf',
			phone:'15212345678',
			email: '41546546@qq.com',
			card: '304457188617581245',
			address: '江西九江',
			state:'1',
			state_text:'已处理'
		}, {
			id:'2',
			date: '2016-05-02',
			name:'tfd',
			phone:'15212345678',
			email: '41546546@qq.com',
			card: '304457188617581245',
			address: '江西九江',
			state:'2',
			state_text:'未处理'
		}],
		dialogFormVisible: false,
		// 表格分页
		currentPage:1,
		// 后台获取数据
		total:2,
		tablebody:[],
		// 过滤之后的json数据
		tablebody0:[],
		// 查询需要提交的数据
		search:{
			page:1,
			size:10,
      type:'all',
			condition:'1993'
		},
		// 编辑的个人信息id
		rowid:1,
		// 编辑个人信息模态框数据
		modalbody:{
			lastLoginTime:null,
      user:{
				id:3,
				email:"ling@vmailx.com",
				phone:"17744570973",
				detailInformation:{
					id:5,
					idcard:"36073119930929762X",
					pic1:"145555555555.jpeg",
					pic2:"111111111111111.jpeg",
					pic3:"111111111111.png",
					addr:null,
					username:"发送",
					isPass:"0",
					handleStatus:"0",
					handleResultDescription:null
				}
			}
		},
		// 图片预览模态框
		dialogImgVisible:false,
		dialogImgUrl:""
      };
    },
		mounted:function(){
			document.title = "管理用户个人信息";
			var self = this;
			// 管理用户个人信息的表格初始化
			self.$http({
								method: 'get',
								url: '/turingcloud/admin/user/list'
						}).then(function(res){
							if(res.data.success == false){
								self.$message.error(res.data.message);
							}else if(res.data.success == true){
								self.total = res.data.totalElements;
                self.tablebody = res.data.body;
								// 页面布局初始化
							}
							// console.log(res.data.body);
						}).catch(function(err){
								console.log("AJAX失败");
								self.$router.push('/system/admin');
						});
		},
		watch:{
			tablebody:function(){
				 var self = this;
				 self.tablebody0.splice(0,self.tablebody0.length);
				 for(var i = 0;i<self.tablebody.length;i++){
					 var date_value = moment(self.tablebody[i].lastLoginTime).format("YYYY-MM-DD");  
					 var handle_value = (function(){
                   if(self.tablebody[i].user.detailInformation.handleStatus == "1"){
											return "已处理";
										}else if(self.tablebody[i].user.detailInformation.handleStatus == "0"){
											return "未处理";
										}else{
											return " ";
										}
					 })(handle_value);
					 self.tablebody0.push({
						 "userid":self.tablebody[i].user.id,
						 "date":date_value,
						 "username":self.tablebody[i].user.detailInformation.username,
						 "phone":self.tablebody[i].user.phone,
					   "email":self.tablebody[i].user.email,
						 "idcard":self.tablebody[i].user.detailInformation.idcard,
						 "address":self.tablebody[i].user.detailInformation.addr,
						 "handle":handle_value
					 });
				 }
			 }
		},		
    methods: {
        // 表格编辑按钮
        handleEdit(index, row) {
						var self = this;
						self.rowid = row.userid;
						self.$http({
									method: 'get',
									url: '/turingcloud/admin/user/detail/'+row.userid
							}).then(function(res){
									if(res.data.success == true){
										// console.log(res.data.body);
										self.modalbody = res.data.body;
										// 返回数据放进个人信息编辑模态框
									}else if(res.data.success == false){
										self.$message.error(res.data.message);
									}
							}).catch(function(err){
									console.log("AJAX失败");
							});
					  self.dialogFormVisible = true;
        },
				// 个人信息提交修改
				modify(){
					var self = this;
					self.$http({
									method: 'put',
									url: '/turingcloud/admin/user/'+self.rowid+'?isPass='+self.modalbody.user.detailInformation.isPass+'&hadleStatus='+self.modalbody.user.detailInformation.handleStatus+'&handleResultDescription='+self.modalbody.user.detailInformation.handleResultDescription,
							    }).then(function(res){
									if(res.data.success == true){
													self.$message({
														message: '提交修改成功',
														type: 'success',
														duration: '1000',
														onClose:function(){
																// 提交修改成功关闭模态框
																// self.dialogFormVisible = false;
																self.$router.go(0);
														}
													});
									}else if(res.data.success == false){
										self.$message.error(res.data.message);
									}
							}).catch(function(err){
									console.log("AJAX失败");
							});
				},				
				// 点击预览图片
				ViewImg(name){
					var self = this;
					// dialogImgVisible
					// 线上地址
          self.dialogImgUrl = '/file/'+self.rowid+'/'+name;
					// 本地测试
					// self.dialogImgUrl = 'https://192.168.0.111/file/'+self.rowid+'/'+name;
					self.dialogImgVisible = true;
				},				
				// 删除用户个人信息
				delete_setting() {
					var self = this;
					self.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
						confirmButtonText: '取消',
						cancelButtonText: '确定',
						confirmButtonClass: 'quxiao',
						cancelButtonClass: 'queding',
						type: 'warning'
					}).then(() => {
							self.$message({
								type: 'info',
								message: '已取消删除'
					  	});
					}).catch(() => {
						self.$http({
										method: 'delete',
										url: '/turingcloud/admin/user/'+self.rowid
								}).then(function(res){
										if(res.data.success == true){
													self.$message({
														type: 'success',
														message: '该用户已永久删除!',
														duration: '1000',
														onClose:function(){
																// 删除成功关闭模态框
																// self.dialogFormVisible = false;
																self.$router.go(0);
														}
													});
										}else if(res.data.success == false){
											self.$message.error(res.data.message);
										}
								}).catch(function(err){
										console.log("AJAX失败");
								});      
					});
      },
			// 日期格式化
			dateFormat:function(row, column) {  
				var date = row[column.property];  
				if (date == undefined) {  
						return "";  
				}  
				return moment(date).format("YYYY-MM-DD");  
			},  
			// 搜索
			searchButton(){
				var self = this;
				if(self.input6 == "" || self.input6.replace(/\s/g, "") == ""){
					return false;
				}else{
					self.search.page = 1;
					self.search.type = self.select;
					self.search.condition = self.input6;
					self.$http({
								method: 'get',
								url: '/turingcloud/admin/user/list?type='+self.search.type+'&condition='+self.search.condition
						}).then(function(res){
							if(res.data.success == false){
								self.$message.error(res.data.message);
							}else if(res.data.success == true){
								self.total = res.data.totalElements;
                self.tablebody = res.data.body;
								self.handleCurrentChange(1);
								// 页面布局初始化
							}
							// console.log(res.data);
						}).catch(function(err){
								console.log("AJAX失败");
						});
				}
			},
			// 分页
			handleSizeChange(val) {
        var self = this;
				self.search.size = val;
        // console.log(`每页 ${val} 条`);
				if(self.input6 == "" || self.input6.replace(/\s/g, "") == ""){
					self.search.page = 1;
					self.$http({
										method: 'get',
										url: '/turingcloud/admin/user/list?size='+self.search.size
								}).then(function(res){
									if(res.data.success == false){
										self.$message.error(res.data.message);
									}else if(res.data.success == true){
										self.total = res.data.totalElements;
										self.tablebody = res.data.body;
										self.handleCurrentChange(1);
										// 页面布局初始化
									}
									// console.log(res.data);
								}).catch(function(err){
										console.log("AJAX失败");
								});
				}else{
						self.$http({
										method: 'get',
										url: '/turingcloud/admin/user/list?type='+self.search.type+'&condition='+self.search.condition+'&size='+self.search.size
								}).then(function(res){
									if(res.data.success == false){
										self.$message.error(res.data.message);
									}else if(res.data.success == true){
										self.total = res.data.totalElements;
										self.tablebody = res.data.body;
										self.handleCurrentChange(1);
										// 页面布局初始化
									}
									// console.log(res.data);
								}).catch(function(err){
										console.log("AJAX失败");
								});
				}  
      },
      handleCurrentChange(val) {
        var self = this;
				self.search.page = val;
        // console.log(`当前页: ${val}`);
				if(self.input6 == "" || self.input6.replace(/\s/g, "") == ""){
					self.$http({
										method: 'get',
										url: '/turingcloud/admin/user/list?size='+self.search.size+'&page='+(self.search.page-1)
								}).then(function(res){
									if(res.data.success == false){
										self.$message.error(res.data.message);
									}else if(res.data.success == true){
										self.total = res.data.totalElements;
										self.tablebody = res.data.body;
										// 页面布局初始化
									}
									// console.log(res.data);
								}).catch(function(err){
										console.log("AJAX失败");
								});
				}else{
						self.$http({
										method: 'get',
										url: '/turingcloud/admin/user/list?type='+self.search.type+'&condition='+self.search.condition+'&size='+self.search.size+'&page='+(self.search.page-1)
								}).then(function(res){
									if(res.data.success == false){
										self.$message.error(res.data.message);
									}else if(res.data.success == true){
										self.total = res.data.totalElements;
										self.tablebody = res.data.body;
										// 页面布局初始化
									}
									// console.log(res.data);
								}).catch(function(err){
										console.log("AJAX失败");
								});
				}  
      },
			// 导出CSV
			csv_download() {
            let columns = this.$refs.table.$children.filter(t => t.prop != null)
            const fields = columns.map(t => t.prop)
            const fieldNames =  columns.map(t => t.label)
            CsvExport(this.tablebody0, fields, fieldNames, '用户个人信息')
      }
    }
}
</script>
<style scoped>
.information{
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
.page_content{}
.page_content .state_tips{
	height:34px;
	line-height:34px;
	text-align:left;
	padding:0 20px;
}
.page_content .state_tips span{
 	display:inline-block;
	width:50px;
	height:22px;
	border-radius:12px;
	vertical-align:middle;
	margin:0 30px 0 10px;
}
.page_content .state_tips .one{
	background: #c9e5f5;
}
.page_content .state_tips .two{
	background: #e2f0e4;
}
.page_content .state_tips .three{
  background:#dee4f7;
}
.page_content .state_tips .four{
  background:#f7dada;
}
/*编辑交易配置页面begin*/
.edit_content{
  /*padding-bottom:35px;*/
}
.edit_content  .li{
	margin-top:20px;
	/*padding:0 30px;*/
	height:35px;
	text-align:left;
}
.edit_content .li a.preview{
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
.el-icon-picture{
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
.edit_content .li div{
	height:35px;
}
.edit_content .li_left{}
.li_left span{
	display:block;
	height:35px;
	line-height:35px;
	text-align:right;
	padding-right:10%;
	font-weight:bold;
}
.edit_content .li_right{
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
/*编辑交易配置页面end*/


.page_footer{
	height:50px;
  border-top: 1px solid #f4f4f4;
  text-align: left;
  padding: 0 10px;
}
.page_footer span{
	display: inline-block;
  height: 50px;
  line-height: 50px;
}


/*修改样式*/
.el-radio+.el-radio{
	margin-left:5px;
}
.small_text .el-input{
	width:30%;
}
.el-input-group{
	padding:0 20px;
	margin:20px 0;
	width:auto;
}

/*textarea样式修改*/
.edit_content .li.textarea_box{
	height:auto;
}
.edit_content .li.textarea_box div{
	height:auto;
}
/*分页*/
.el-pagination{
	float:right;
	height:34px;
	padding:3px 0; 
	box-sizing:border-box;
}
/*图片预览模态框*/
.modal_img{
	max-width:100%;
}
</style>