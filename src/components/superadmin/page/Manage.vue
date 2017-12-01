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
    :data="tableList"
    style="width: 100%">
    <el-table-column
      prop="lastLoginTime"
			:formatter="dateFormat"
      label="最后登录时间">
    </el-table-column>
		<el-table-column
		  prop="user.detailInformation.username"
			label="用户名">
		</el-table-column>
    <el-table-column
		  prop="user.phone"
			label="登录账号">
		</el-table-column>
	<!--	<el-table-column
		  prop="password"
			label="登录密码">
		</el-table-column>-->
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
       <el-button type="text" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<p class="state_tips"><a href="javascript:void(0)" @click="dialogFormVisible1 = true" type="primary"><i class="el-icon-plus"></i>添加管理员</a></p>
        </div>
    <!--添加管理员begin-->
		<el-dialog title="新增管理员" :visible.sync="dialogFormVisible1">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>用户名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="modaldata1.name" placeholder="请输入用户名" ></el-input>
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
      username:'111111111',
			password:'12312313211'
		}, {
			id:'2',
			time:1515406028000,
      name:'admin2',
      username:'2222222',
			password:'212111111'
		}],
    dialogFormVisible1:false,
    modaldata1:{
      name:'',
      username:'',
      password:''
    },
		// 后台获取数据
		tableList:[]
      };
    },
		mounted:function(){
			document.title = "管理员信息";
			var self = this;
			// 管理员信息的表格初始化
			self.$http({
								method: 'get',
								url: '/turingcloud/superAdmin/list'
						}).then(function(res){
							if(res.data.success == false){
								self.$message.error(res.data.message);
							}else if(res.data.success == true){
                self.tableList = res.data.body;
								// 页面布局初始化
							}
						}).catch(function(err){
								console.log("AJAX失败");
								self.$router.push('/system/superadmin/');
						});
		},		
    methods: {
        // 表格删除按钮
        handleDelete(index, row) {
						var self = this;
					self.$confirm('此操作将永久删除该管理员账号, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						self.$http({
										method: 'delete',
										url: '/turingcloud/superAdmin/delete/'+row.id
								}).then(function(res){
									  self.$message({
														type: 'success',
														message: '该管理员账号永久删除!',
														onClose:function(){
																// 删除成功刷新
															 self.$router.go(0);
														}
													});
								}).catch(function(err){
										console.log("AJAX失败");
										self.$router.push('/system/superadmin');
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
				return moment(date).format("YYYY-MM-DD HH:mm:ss");  
			},
			// 新增管理员
			add(){
				var self = this;
				if(self.modaldata1.name == ''){
					self.$message({
          message: '用户名不能为空',
          type: 'warning'
          });
				}else if(self.modaldata1.username == ''){
					self.$message({
          message: '登录账号不能为空',
          type: 'warning'
          });
				}else if(self.modaldata1.password == ''){
					self.$message({
          message: '登录密码不能为空',
          type: 'warning'
          });
				}else{
					self.$http({
										method: 'post',
										url: '/turingcloud/superAdmin/addAdmin?username='+self.modaldata1.name+'&phone='+self.modaldata1.username+'&password='+self.modaldata1.password,
									}).then(function(res){
									if(res.data.success == true){
										self.$message({
											message: '添加管理员成功',
											type: 'success',
											onClose:function(){
													// 提交修改成功关闭模态框
													self.$router.go(0);
											}
										});
									}else if(res.data.success == false){
										self.$message.error(res.data.message);
									}
						    	}).catch(function(err){
										console.log("AJAX失败");
										self.$router.push('/system/superadmin');
						    	});
				}
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