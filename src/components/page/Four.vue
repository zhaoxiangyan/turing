<template>
	<div class="Four">
	<div v-title>我的交易信息</div>
	    <div class="page_title">
		    <span><i class="el-icon-edit"></i>我的交易信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的交易信息</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="platform"
      label="使用的平台"
      width="150">
    </el-table-column>
    <el-table-column
      prop="account"
      label="MT4账号">
    </el-table-column>
		<el-table-column
      prop="capital"
      label="投资资金（单位：美元）"
			width="190">
    </el-table-column>
		<el-table-column
      prop="model"
      label="挂机模式">
    </el-table-column>
		<el-table-column
      prop="retracement"
      label="最大回撤">
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
<p class="state_tips">One<span class="one"></span>Two<span class="two"></span>Three<span class="three"></span>Four<span class="four"></span></p>
        </div>
        <!--编辑交易配置页面begin-->
		<el-dialog title="交易配置" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
			    <!--<el-row class="li">
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
				</el-row>	-->
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
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="dialogFormVisible = false">提交修改</el-button>
			<el-button type="success" @click="stop">停止挂机</el-button>
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
		input5: '',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02',
			platform: 'GQ-capital',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '35%',
			state:'1'
		}, {
			id:'2',
			date: '2016-05-02',
			platform: 'GQ-capital',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '35%',
			state:'2'
		}, {
			id:'3',
			date: '2016-05-02',
			platform: 'GQ-capital',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '35%',
			state:'3'
		}, {
			id:'4',
			date: '2016-05-02',
			platform: 'GQ-capital',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '35%',
			state:'4'
		}],
		dialogFormVisible: false
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
            message: '等待后台删除!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
			// 提交停止挂机
			stop(){
				alert('停止挂机');
			}
    }
}
</script>
<style scoped>
.Four{
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
	height:30px;
	line-height:30px;
	text-align:left;
	padding-left:30px;
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
	margin-top:35px;
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




</style>