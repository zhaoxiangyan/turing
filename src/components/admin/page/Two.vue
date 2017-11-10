<template>
	<div class="two">
	<div v-title>管理用户个人信息</div>
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
		  <el-option label="所有"   value="0"></el-option>
      <el-option label="用户姓名" value="1"></el-option>
      <el-option label="手机号码" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="search"></el-button>
</el-input>
<!--个人信息表格table-->
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="最后登录时间">
    </el-table-column>
		<el-table-column
		  prop="name"
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
      prop="card"
      label="身份证号码">
    </el-table-column>		
		<el-table-column
      prop="address"
      label="居住地址">
    </el-table-column>
		<el-table-column
      prop="state_text"
      label="是否处理"
      width="150"
      :filters="[{ text: '未处理', value: '未处理' }, { text: '已处理', value: '已处理' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.state_text === '未处理' ? 'primary' : 'success'"
          close-transition>{{scope.row.state_text}}</el-tag>
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
      审核通过，可登录<span class="one"></span>
			审核不通过，还需提交个人资料<span class="two"></span>
			Three<span class="three"></span>
			Four<span class="four"></span>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="110">
</el-pagination>
</p>
        </div>
        <!--管理用户个人信息编辑页面begin-->
		<el-dialog title="个人信息" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>真实姓名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="name" placeholder="用户真实姓名" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>手机号码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="phone" placeholder="用户手机号码" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>性别：</span>
				  </el-col>
				  <el-col :span="16" class="li_right  radio35">
					   <el-switch on-text="男" off-text="女" off-color="#ff4949" v-model="sex" :width="80" ></el-switch>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>身份证号码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="card" placeholder="用户身份证号码"  ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>身份证正面：</span>
				  </el-col>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>身份证正面照</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>身份证反面：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>身份证反面照</a>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>邮箱：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input v-model="email" placeholder="请输入邮箱" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>居住地址：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="text" v-model="address" placeholder="如：广东深圳"  ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>用户审核：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="examine"  on-text="通过"  off-text="不通过" :width='80'></el-switch>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>是否发送信息：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="switch6"  on-text="发送"  off-text="不发送" :width='80'></el-switch>
          </el-col>
				</el-row>
				<el-row class="li textarea_box" v-show="switch6" >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>反馈信息：</span>
				  </el-col>
				  <el-col :span="16" class="li_right textarea_div" >
					  <el-input type="textarea" v-model="value2"></el-input>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>是否处理：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="switch4"  on-text="已处理"  off-text="未处理" :width='80'></el-switch>
          </el-col>
				</el-row>
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="dialogFormVisible = false">提交修改</el-button>
			<!--<el-button type="success" @click="stop">停止挂机</el-button>-->
			<el-button type="danger" @click="delete_setting">删除</el-button>
			<el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
		</el-dialog>
        <!--编辑交易配置页面end-->
		<div class="page_footer">
		   <span>交易有风险，入市须谨慎！</span>
		</div>
	</div>	
</template>
<script>
 export default {
    name: 'Four',
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
    select: '0',
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
		}, {
			id:'3',
			date: '2016-05-02',
			name:'err',
			phone:'15212345678',
			email: '41546546@qq.com',
			card: '304457188617581245',
			address: '江西九江',
			state:'3',
			state_text:'已处理'
		}, {
			id:'4',
			date: '2016-05-02',
			name:'fss',
			phone:'15212345678',
			email: '41546546@qq.com',
			card: '304457188617581245',
			address: '江西九江',
			state:'4',
			state_text:'未处理'
		}],
		dialogFormVisible: false,
		// 表格分页
		currentPage:4
      };
    },
    methods: {
        // 获取数据状态，类名表格
	      tableRowClassName(row, index) {
						if(row.state == '1'){
							return 'one-row';
						}else if(row.state == '2'){
							return 'two-row';
						}else if(row.state == '3'){
							return 'three-row';
						}else if(row.state == '4'){
							return 'four-row';
						}
        },
        // 表格编辑按钮
        handleEdit(index, row) {
					 var self = this;
           console.log(index, row);
					 self.dialogFormVisible = true;
        },
				// 删除交易配置
				delete_setting() {
        this.$confirm('此操作将永久删除该交易配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '信息已永久删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
			// 处理状态筛选
			filterTag(value, row) {
        return row.state_text === value;
      },
			// 分页
			handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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

</style>