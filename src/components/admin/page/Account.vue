<template>
	<div class="account" >
	    <div class="page_title">
		    <span><i class="el-icon-edit"></i>用户交易信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/admin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>用户交易信息</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<!--用户查询-->
<!--旧的搜索查询-->
<el-input placeholder="请输入内容" v-model="input6">
    <el-select v-model="select" slot="prepend" placeholder="请选择" class="search">
		  <!--<el-option label="所有"   value="all"></el-option>-->
      <el-option label="MT4账号" value="mt4Account"></el-option>
      <el-option label="用户姓名" value="username"></el-option>
      <el-option label="手机号码" value="phone"></el-option>
    </el-select>
    <el-button slot="append" icon="search" @click="searchButton()"></el-button>
</el-input>
<!--新的筛选查询-->
<el-row class="screen_div">
<!--<el-select v-model="value44"  clearable placeholder="使用的平台" size="120" @change="screen" @clear="screen">
      <el-option label="GQCapital-Live"   value="GQCapital-Live"></el-option>
</el-select>-->
<!--<el-select v-model="value40"  clearable placeholder="挂机模式" size="120" @change="screen" @clear="screen" >
      <el-option label="成长型"   value="1"></el-option>
      <el-option label="宏利先锋型" value="2"></el-option>
      <el-option label="趋势策略型" value="3"></el-option>
      <el-option label="综合尊享型" value="4"></el-option>
</el-select>-->
<el-select v-model="value41"  clearable placeholder="是否挂机" size="120" @change="screen" @clear="screen">
      <el-option label="否"   value="1"></el-option>
      <el-option label="是" value="0"></el-option>
</el-select>
<el-select v-show="value43 == '1'" v-model="value42"  clearable placeholder="是否通过" size="120" @change="screen" @clear="screen">
      <el-option label="是"   value="1"></el-option>
      <el-option label="否" value="0"></el-option>
</el-select>
<el-select v-model="value43"  clearable placeholder="是否处理" size="120" @change="screen" @clear="screen">
      <el-option label="已处理"   value="1"></el-option>
      <el-option label="未处理" value="0"></el-option>
</el-select>
</el-row>
<!--交易信息表格table-->
<template>
  <el-table ref="table"
    :data="tablebody0"
    style="width: 100%"
		@sort-change="timesort">
    <el-table-column
      prop="date"
      label="日期"
			sortable="custom">
    </el-table-column>
		<el-table-column
		  prop="username"
			label="用户姓名">
		</el-table-column>
		<el-table-column
		  prop="phone"
			label="手机号码">
		</el-table-column>
    <el-table-column
      prop="mt4account"
      label="MT4账号">
    </el-table-column>
    <el-table-column
      prop="platform"
      label="使用的平台">
    </el-table-column>		
		<el-table-column
      prop="capital"
      label="投资资金（美元）"
			width="190">
    </el-table-column>
		<el-table-column
      prop="mode"
      label="挂机模式">
    </el-table-column>
		<el-table-column
      prop="retreate"
      label="最大回撤">
    </el-table-column>
    <el-table-column
      prop="hangup"
      label="是否挂机"
			width="95">
<template slot-scope="scope">
			<el-tag
          :type="scope.row.hangup === '否' ? 'danger' : 'success'"
          close-transition>{{scope.row.hangup}}</el-tag>
</template>
    </el-table-column>
		<el-table-column
      prop="pass"
      label="是否通过"
			width="95">
<template slot-scope="scope">
			<el-tag
          :type="scope.row.pass === '否' ? 'danger' : 'success'"
          close-transition>{{scope.row.pass}}</el-tag>
</template>
    </el-table-column>
		<el-table-column
      prop="handle"
      label="是否处理"
			width="120">
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
<!--交易信息状态指示色-->
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
       <img class="modal_img" :src="dialogImgUrl"  />
    </el-dialog>				
    <!--编辑交易配置页面begin-->
		<el-dialog title="交易配置" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
			    <!--<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5"  class="li_left">
				    <span>三方合作协议：</span>
				  </el-row>
				  <el-col :span="16"  class="li_right">
				    	<a class="preview" href="javascript:void(0)"><i class="el-icon-document"></i>您已签约三方合作协议</a>
                  </el-col>
				</el-row>	-->
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>真实姓名：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input :value="modalbody.user.detailInformation.username" placeholder="用户真实姓名" disabled ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>手机号码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input :value="modalbody.user.phone" placeholder="用户手机号码" disabled ></el-input>
          </el-col>
				</el-row>	
				<template v-if="modalbody.contract.filetype == 'pdf'">
				<el-row class="li"  >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>委托扣款协议：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" :href="'/file/'+userid+'/'+modalbody.contract.file1"  :download="modalbody.user.detailInformation.username+'的委托扣款协议.pdf'" ><i class="el-icon-document"></i>用户委托扣款协议</a>
          </el-col>
				</el-row>
				</template>
				<template v-else>
				<el-row class="li" >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>委托扣款协议：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)"  @click="ViewImg(modalbody.contract.file1)"><i class="el-icon-picture"></i>协议第一页</a>
          </el-col>
				</el-row>
				<el-row class="li" >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span></span>
				  </el-col>
				  <el-col :span="16" class="li_right">
				     	<a class="preview" href="javascript:void(0)" @click="ViewImg(modalbody.contract.file2)"><i class="el-icon-picture"></i>协议第二页</a>
          </el-col>
				</el-row>
				</template>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>扣款协议是否通过：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
				    	<el-switch  v-model="modalbody.contract.isPass"  on-value="1" off-value="0" on-text="已通过"  off-text="未通过" :width='80'></el-switch>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用的平台：</span>
				  </el-col>
				  <el-col :span="16" class="li_right platform select100">
								<el-select v-model="modalbody.platform" placeholder="请选择" disabled>
									<el-option
									v-for="item in options1"
									:key="item.value1"
									:label="item.label1"
									:value="item.value1">
									</el-option>
								</el-select>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>MT4账号：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input :value="modalbody.mt4Account" placeholder="请输入MT4账号" disabled></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="text" :value="modalbody.mt4Password" placeholder="请输入MT4密码"  disabled ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>修改MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
				    	<el-switch on-text="修改" off-text="不修改" v-model="modalbody.isChangePassword" off-value="0" on-value="1" :width="80" disabled></el-switch>
          </el-col>
				</el-row>
				<el-row class="li" v-show="modalbody.isChangePassword == '0'?false:true">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>新的MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="text" :value="modalbody.newPassword" placeholder="请输入新的MT4密码" disabled ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>账户投资资金：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input :value="modalbody.capital" placeholder="请输入投资金额（美元）"  disabled></el-input>
          </el-col>
				</el-row>	
			  <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用挂机模式：</span>
				  </el-col>
				  <el-col :span="16" class="li_right select100">
								<el-select v-bind:value="modalbody.mode" placeholder="请选择" disabled>
									<!--<el-option
									v-for="item in options3"
									:key="item.value3"
									:label="item.label3"
									:value="item.value3">
									</el-option>-->
									<el-option  label="pipsbot" value="1"></el-option>
								</el-select>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>投资品种：</span>
				  </el-col>
				  <el-col :span="16" class="li_right" >
					  <el-select class="checkbox" v-bind:value="value5"  disabled  multiple v-bind:multiple-limit="selectNumber" placeholder="请选择">
							<el-option
								v-for="items in optionss"
								:key="items.valuee"
								:label="items.labell"
								:value="items.valuee">
							</el-option>
						</el-select>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>同意挂机费用：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="modalbody.agreeHangUpCosts" on-value="true" off-value="false"   on-text="同意"  off-text="不同意" :width='80' disabled></el-switch>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>建议回撤：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35 small_text">
				     <!--	<el-switch  v-model="switch3"  on-text="自定义"  off-text="35%" off-color="#13ce66" :width='80' disabled ></el-switch>-->
						  <el-radio class="radio" v-model="switch3" label="0" disabled>25%</el-radio>
							<el-radio class="radio" v-model="switch3" label="1" disabled>35%</el-radio>
              <el-radio class="radio" v-model="switch3" label="2" disabled>自定义</el-radio>
					  	<el-input class="custom" v-model="input5" placeholder="自定义回撤百分比"  disabled><template slot="append">%</template></el-input>
          </el-col>
				</el-row>
				<el-row class="li" v-show="modalbody.isHangUp == '1'?true:false">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span class="red_text">停止挂机模式：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch class="red_text"  v-model="modalbody.isHangUp" on-value="0" off-value="1" on-text="运行"  off-text="停止" :width='80' disabled></el-switch>
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
					  <el-input type="textarea" v-model="modalbody.handleResultDescription"></el-input>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>审核状态：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
            <el-switch  v-model="modalbody.isPass" on-value="1" off-value="0"  on-text="审核通过"  off-text="审核不通过" :width='100'></el-switch>
          </el-col>
				</el-row>
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>是否处理：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
					<el-switch  v-model="modalbody.handleStatus" on-value="1" off-value="0"  on-text="已处理"  off-text="未处理" :width='80'></el-switch>
          </el-col>
				</el-row>
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="modify()" :disabled="modalbody.handleStatus == '0'?true:false">提交修改</el-button>
			<!--<el-button type="success" @click="stop">停止挂机</el-button>-->
			<el-button type="danger" @click="delete_setting">删除</el-button>
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
    name: 'Account',
    data() {
      return {
		timestamp:'',
		name:'赵先生',
		phone:'15112345678',
		switch8:false,
		//   账户投资资金select
		input1: '',
		// 投资品种多选框
    optionss: [{
          valuee: '1',
          labell: 'EURUSD'
        }, {
          valuee: '2',
          labell: 'USDJPY'
        }, {
          valuee: '3',
          labell: 'GBPUSD'
        }, {
          valuee: '4',
          labell: 'USDCAD'
        }, {
          valuee: '5',
          labell: 'USDCHF'
				}, {
          valuee: '6',
          labell: 'AUDUSD'
        }, {
          valuee: '7',
          labell: 'NZDUSD'
        }],
		selectNumber:4,
    value5: [],
		// 使用的平台select
		options1: [{
          value1: 'GQCapital-Live',
          label1: 'GQCapital-Live'
        }],
        value1: 'GQCapital-Live',
		// MT4账号
		input2: '',
		// MT4密码
		password:'',
		// 是否修改MT4密码
		switch1:false,
		// 新的MT4密码
		password1:'',
		// 使用挂机模式
		// options3: [{
    //       value3: '1',
    //       label3: 'pipsbot'
    //     // }, {
    //     //   value3: '2',
    //     //   label3: '宏利先锋型'
    //     // }, {
    //     //   value3: '3',
    //     //   label3: '趋势策略型'
    //     // }, {
    //     //   value3: '4',
    //     //   label3: '综合尊享型'
    //     }],
    //  value3: '2',
		// 同意挂机费用
		switch2:true,
		//建议回撤
		switch3:'0',
		input5: '',
		// 管理员是否处理
		switch4:false,
		// 停止挂机模式
		switch5:true,
		// 是否发送消息
		switch6:false,
		// 反馈信息
		value2:'',
		// 账户状态
		switch7:false,
		// 搜索框
		value40:'',
		value41:'',
		value42:'',
		value43:'',
		value44:'',
		value45:'ASC',
		input6: '',
    select: 'mt4Account',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02',
			name:'gdf',
			phone:'15212345678',
			platform: 'GQCapital-Live',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '25%',
			state:'1',
			state_text:'已处理'
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
		// 编辑的交易配置id
		rowid:1,
		userid:4,
		// 编辑交易配置模态框数据
		modalbody:{
			id:2,
			platform:"GQCapital-Live",
			mt4Account:"1417",
			mt4Password:"123",
			isChangePassword:"0",
			newPassword:null,
			capital:2500,
			mode:"2",
			agreeHangUpCosts:"true",
			retreatRate:28,
			createTime:1511749247000,
			lastModifiedTime:1511749247000,
			handleStatus:"0",
			handleResultDescription:null,
			isHangUp:"0",
			isPass:"0",
      user:{
				id:4,
				phone:"15179820718",
				detailInformation:{
					username:"谭慧玲"
				}
			},
			contract:{
				id:2,
				contractType:"扣款协议",
				file1:"1111111111111111.gif",
				file2:"2222222222222222.gif",
				file3:null,
				filetype:"img",
				handleStatus:"0",
				handleResultDescription:null,
				isPass:"0"
			}
		},
		// 图片预览模态框
		dialogImgVisible:false,
		dialogImgUrl:"",
		// 建议回撤初始化
		retreatRate:12,
		// 排序
		direction:""
      };
    },
		// computed:function(){
		// 	tablebodyy:{
		// 		var self = this;
		// 		// const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
		// 		let csvContent = "data:text/csv;charset=utf-8,";
		// 		self.tablebody.forEach(function(rowArray){
		// 			let row = rowArray.join(",");
		// 			csvContent += row + "\r\n"; // add carriage return
		// 		}); 
		// 		return csvContent;
		// 	}
		// },
		mounted:function(){
			document.title = "管理用户交易信息";
			var self = this;
			// 管理用户交易信息的表格初始化
			self.handleCurrentChange(1);
			// self.$http({
			// 					method: 'get',
			// 					url: '/turingcloud/admin/transaction/list',
			// 					params:{
			// 						mode:self.value40,
			// 						isHangUp:self.value41,
			// 						handleStatus:self.value43,
			// 						isPass:self.value42,
			// 						platform:self.value44,
			// 						phone:self.input6,
			// 						direction:self.direction,
			// 						page:0,
			// 						size:self.search.size
			// 					}
			// 			}).then(function(res){
			// 				if(res.data.success == false){
			// 					self.$message.error(res.data.message);
			// 				}else if(res.data.success == true){
			// 					self.total = res.data.totalElements;
      //           self.tablebody = res.data.body;
			// 					// 页面布局初始化
			// 				}
			// 				// console.log(res.data);
			// 			}).catch(function(err){
			// 					console.log("AJAX失败");
			// 					self.$router.push('/system/admin/login');
			// 			});
		},
		watch:{
			retreatRate:function(){
				  var self = this;
          if(self.retreatRate == 25){
						self.switch3 = "0";
					}else if(self.retreatRate == 35){
						self.switch3 = "1";
					}else{
						self.switch3 = "2";
						self.input5 = self.retreatRate;
					}
			 },
			 tablebody:function(){
				 var self = this;
				 self.tablebody0.splice(0,self.tablebody0.length);
				 for(var i = 0;i<self.tablebody.length;i++){
					 var date_value = moment(self.tablebody[i].lastModifiedTime).format("YYYY-MM-DD");  
					 var mode_value = (function(){
                   if(self.tablebody[i].mode == "1"){
											return "pipsbot";
										// }else if(self.tablebody[i].mode == "2"){
										// 	return "宏利先锋型";
										// }else if(self.tablebody[i].mode == "3"){
										// 	return "趋势策略型";
										// }else if(self.tablebody[i].mode == "4"){
										// 	return "综合尊享型";
										}else{
											return " ";
										}
					 })(mode_value);
					 var hangup_value = (function(){
                   if(self.tablebody[i].isHangUp == "1"){
											return "否";
										}else if(self.tablebody[i].isHangUp == "0"){
											return "是";
										}else{
											return " ";
										}
					 })(hangup_value);
					 var pass_value = (function(){
                   if(self.tablebody[i].isPass == "1"){
											return "是";
										}else if(self.tablebody[i].isPass == "0"){
											return "否";
										}else{
											return " ";
										}
					 })(pass_value);
					 var handle_value = (function(){
                   if(self.tablebody[i].handleStatus == "1"){
											return "已处理";
										}else if(self.tablebody[i].handleStatus == "0"){
											return "未处理";
										}else{
											return " ";
										}
					 })(handle_value);
					 self.tablebody0.push({
						 "id":self.tablebody[i].id,
						 "userid":self.tablebody[i].user.id,
						 "date":date_value,
						 "username":self.tablebody[i].user.detailInformation.username,
						 "phone":self.tablebody[i].user.phone,
						 "mt4account":self.tablebody[i].mt4Account,
						 "platform":self.tablebody[i].platform,
						 "capital":self.tablebody[i].capital,
						 "mode":mode_value,
						 "retreate":self.tablebody[i].retreatRate+'%',
						 "hangup":hangup_value,
						 "pass":pass_value,
						 "handle":handle_value
					 });
				 }
			 }
		},
    methods: {
        // 表格编辑按钮
        handleEdit(index, row) {
						var self = this;
						self.rowid = row.id;
						self.userid = row.userid;
						self.$http({
									method: 'get',
									url: '/turingcloud/admin/transaction/detail/'+row.id
							}).then(function(res){
									if(res.data.success == true){
										// console.log(res.data.body);
										self.modalbody = res.data.body;
										self.timestamp = res.data.body.lastModifiedTime;
										// 返回数据放进交易配置编辑模态框
										self.retreatRate = res.data.body.retreatRate;
										// 建议回撤初始化
										self.value5 = self.modalbody.currencyPairs;
										// 投资品种初始化
									}else if(res.data.success == false){
										self.$message.error(res.data.message);
									}
							}).catch(function(err){
									console.log("AJAX失败");
							});
					  self.dialogFormVisible = true;
        },
				// 交易配置提交修改
				modify(){
					var self = this;
					self.$http({
									method: 'put',
									url: '/turingcloud/admin/transaction/'+self.userid+'/'+self.rowid,
									data:{
										cIsPass:self.modalbody.contract.isPass,
										handleStatus:self.modalbody.handleStatus,
										isPass:self.modalbody.isPass,
										handleResultDescription:self.modalbody.handleResultDescription,
										lastModifiedTime:self.timestamp
									}
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
          self.dialogImgUrl = '/file/'+self.userid+'/'+name;
					self.dialogImgVisible = true;
				},				
				// 删除交易配置
				delete_setting() {
            var self = this;
						self.$confirm('此操作将永久删除该交易配置, 是否继续?', '提示', {
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
												url: '/turingcloud/admin/transaction/'+self.userid+'/'+self.rowid
										}).then(function(res){
												if(res.data.success == true){
															self.$message({
																type: 'success',
																message: '该交易配置已永久删除!',
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
			// 是否处理筛选
			filterTag(value, row) {
        return row.handle === value;
      },
			// 日期格式化
			dateFormat:function(row, column) {  
				var date = row[column.property];  
				if (date == undefined) {  
						return "";  
				}  
				return moment(date).format("YYYY-MM-DD");  
			},  
			// 挂机模式格式化
			modeFormat:function(row, column) {  
				var mode = row[column.property];  
				if (mode == undefined) {  
						return "";  
				}  
				if(mode == "1"){
					return "成长型";
				// }else if(mode == "2"){
				// 	return "宏利先锋型";
				// }else if(mode == "3"){
				// 	return "趋势策略型";
				// }else if(mode == "4"){
				// 	return "综合尊享型";
				}else{
					return " ";
				}
			},  
			// 建议回撤格式化
			retreatRateFormat:function(row, column) {  
				var retreatRate = row[column.property];  
				if (retreatRate == undefined) {  
						return "";  
				}  
				if(isNaN(retreatRate) == false){
					return retreatRate+"%";
				}else{
					return "";
				}  
			},
			// 搜索
			searchButton(){
				var self = this;
				if(self.input6 == "" || self.input6.replace(/\s/g, "") == ""){
					return false;
				}else{
					self.handleCurrentChange(1);					
				}
			},
			// 分页
			handleSizeChange(val) {
				var self = this;
				self.search.size = val;
        // console.log(`每页 ${val} 条`);
				self.handleCurrentChange(1); 
      },
      handleCurrentChange(val) {
				  var self = this;
				  self.search.page = val;
					self.search.type = self.select;
					self.search.condition = self.input6;
					self.$http({
								method: 'get',
								url: '/turingcloud/admin/transaction/list?mode='+self.value40+'&isHangUp='+self.value41+'&handleStatus='+self.value43+'&isPass='+self.value42+'&'+self.select+'='+self.input6+'&direction='+self.direction+'&page='+(self.search.page-1)+'&size='+self.search.size
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
								self.$router.push('/system/admin');
						});
      },
			csv_download() {
            let columns = this.$refs.table.$children.filter(t => t.prop != null)
            const fields = columns.map(t => t.prop)
            const fieldNames =  columns.map(t => t.label)
            CsvExport(this.tablebody0, fields, fieldNames, '用户交易信息')
      },
			// 表格按时间排序
			timesort(column,prop,order){
				var self = this;
				if(column.order == "descending"){
					self.direction = "DESC";
				}else if(column.order == "ascending"){
					self.direction = "ASC";
				}else{
					self.direction = "";
				}
				self.handleCurrentChange(1);
			},
			// 查询条件筛选
			screen(){
				 this.handleCurrentChange(1);
			}
    }
}
</script>
<style scoped>
.account{
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
/*编辑交易配置页面begin*/
.edit_content{
  /*padding-bottom:35px;*/
}
.edit_content  .li{
	margin-top:20px;
	/*padding:0 30px;*/
	/*height:35px;*/
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
.el-icon-document,.el-icon-picture{
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
	/*height:35px;*/
}
.edit_content .li .radio35 div{
	height:auto;
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
.el-input-group.custom{
	padding:0;
	margin:0;
}
/*账户状态单选框颜色*/
.el-radio.danger{
	 color: #ff4949;
}
.el-radio.success{
   color: #13ce66;
}
.el-radio.warning{
   color: #f7ba2a;
}
.el-radio.primary{
   color: #20a0ff;
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

/*图片模态框*/
.modal_img{
	max-width:100%;
}
/*筛选选择器样式重置*/
.el-input--100{
	width:100px;
}
.screen_div{
	margin:10px 0;
	padding:0 20px;
	text-align:left;
}

/*投资品种多选*/
.checkbox.el-select{
	width:100%;
}

/*模态框停止挂机*/
.red_text{
	color:red;
}

</style>