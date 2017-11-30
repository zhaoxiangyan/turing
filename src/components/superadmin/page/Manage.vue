<template>
	<div class="manage">
	    <div class="page_title">
		    <span><i class="el-icon-edit"></i>管理员信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/superadmin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>管理员信息</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<!--个人信息表格table-->
<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="time"
			:formatter="dateFormat"
      label="最后登录时间">
    </el-table-column>
		<el-table-column
		  prop="name"
			label="姓名">
		</el-table-column>
    <el-table-column
		  prop="username"
			label="用户名">
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
<p class="state_tips"><a href="javascript:void(0)" @click="dialogFormVisible1 = true" type="primary"><i class="el-icon-plus"></i>添加管理员</a></p>
        </div>
    <!--管理管理员信息编辑页面begin-->
		<el-dialog title="管理员信息" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>姓名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata.name" placeholder="请输入姓名" ></el-input>
          </el-col>
				</el-row>	
        <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>登录账号：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata.username" placeholder="请输入登录账号" ></el-input>
          </el-col>
				</el-row>	
        <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>登录密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata.password" placeholder="请输入登录密码" ></el-input>
          </el-col>
				</el-row>	
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="modify()" >提交修改</el-button>
			<el-button type="danger" @click="delete_setting()">删除</el-button>
			<el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
		</el-dialog>
    <!--编辑管理员信息页面end-->
    <!--添加管理员begin-->
		<el-dialog title="管理员信息" :visible.sync="dialogFormVisible1">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>姓名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata1.name" placeholder="请输入姓名" ></el-input>
          </el-col>
				</el-row>	
        <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>登录账号：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata1.username" placeholder="请输入登录账号" ></el-input>
          </el-col>
				</el-row>	
        <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>登录密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata1.password" placeholder="请输入登录密码" ></el-input>
          </el-col>
				</el-row>	
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="add()" >新增</el-button>
			<el-button @click="dialogFormVisible1 = false">取 消</el-button>
    </div>
		</el-dialog>
    <!--添加管理员end-->
		<div class="page_footer">
		   <span>交易有风险，入市须谨慎！</span>
		</div>
	</div>	
</template>
<script>
 import moment from 'moment'
 export default {
    name: 'Manage',
    data() {
      return {
		// 表格数据
		tableData: [{
			id:'1',
			time:1511404528000,
      name:'admin1',
      username:'111111111'
		}, {
			id:'2',
			time:1515406028000,
      name:'admin2',
      username:'2222222'
		}],
		dialogFormVisible: false,
    modaldata:{
      name:'赵相炎',
      username:'15179820718',
      password:'yan151798'
    },
    dialogFormVisible1:false,
    modaldata1:{
      name:'新增管理员',
      username:'1200000000',
      password:'5145454545'
    },
		// 后台获取数据
		tablebody:[],
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
		}
      };
    },
		mounted:function(){
			document.title = "管理员信息";
			var self = this;
			// 管理用户个人信息的表格初始化
			// self.$http({
			// 					method: 'get',
			// 					url: '/turingcloud/admin/user/list'
			// 			}).then(function(res){
			// 				if(res.data.success == false){
			// 					self.$message.error(res.data.message);
			// 				}else if(res.data.success == true){
      //           self.tablebody = res.data.body;
			// 					// 页面布局初始化
			// 				}
			// 			}).catch(function(err){
			// 					console.log("AJAX失败");
			// 					self.$router.push('/system/admin/login');
			// 			});
		},		
    methods: {
        // 表格编辑按钮
        handleEdit(index, row) {
						var self = this;
						// self.rowid = row.user.id;
						// self.$http({
						// 			method: 'get',
						// 			url: '/turingcloud/admin/user/detail/'+row.user.id
						// 	}).then(function(res){
						// 			if(res.data.success == true){
						// 				// console.log(res.data.body);
						// 				self.modalbody = res.data.body;
						// 				// 返回数据放进个人信息编辑模态框
						// 			}else if(res.data.success == false){
						// 				self.$message.error(res.data.message);
						// 			}
						// 	}).catch(function(err){
						// 			console.log("AJAX失败");
						// 			self.$router.push('/system/admin');
						// 	});
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
									self.$router.push('/system/admin');
							});
				},							
				// 删除交易配置
				delete_setting() {
					var self = this;
					self.$confirm('此操作将永久删除该管理员账号, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						self.$http({
										method: 'delete',
										url: '/turingcloud/admin/user/'+self.rowid
								}).then(function(res){
										if(res.data.success == true){
													self.$message({
														type: 'success',
														message: '该管理员账号永久删除!',
														onClose:function(){
																// 删除成功关闭模态框
																self.dialogFormVisible = false;
														}
													});
										}else if(res.data.success == false){
											self.$message.error(res.data.message);
										}
								}).catch(function(err){
										console.log("AJAX失败");
										self.$router.push('/system/admin');
								});
					}).catch(() => {
						self.$message({
							type: 'info',
							message: '已取消删除'
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
			}
    }
}
</script>
<style scoped>
.manage{
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

/*编辑管理员信息页面begin*/
.edit_content{
  /*padding-bottom:35px;*/
}
.edit_content  .li{
	margin-top:20px;
	/*padding:0 30px;*/
	height:35px;
	text-align:left;
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
/*编辑管理员信息页面end*/


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

.page_content .state_tips{
	padding-right:30px;
	text-align:right;
}
.page_content .state_tips a{
	font-size:15px;
    display: inline-block;
    width: 120px;
    height: 35px;
    margin: 10px 0;
    background: #21b548;
    color: #fff;
    text-align: center;
    line-height: 35px;
    border-radius: 4px;
}
.page_content .state_tips a i{
	margin-right:5px;
	font-size:14px;
}

</style>