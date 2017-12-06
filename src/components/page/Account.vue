<template>
	<div class="account">
	    <div class="page_title">
		    <span><i class="el-icon-edit"></i>我的账户信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>我的账户信息</el-breadcrumb-item>
	    	</el-breadcrumb>
	  	</div>	
        <div class="page_content">
<template>
  <el-table
    :data="tablebody"
    style="width: 100%">
    <el-table-column
      prop="lastModifiedTime"
			:formatter="dateFormat" 
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="platform"
      label="使用的平台"
      width="150">
    </el-table-column>
    <el-table-column
      prop="mt4Account"
      label="MT4账号">
    </el-table-column>
		<el-table-column
      prop="capital"
      label="投资资金（美元）"
			width="170">
    </el-table-column>
		<el-table-column
      prop="mode"
			:formatter="modeFormat" 
      label="挂机模式">
    </el-table-column>
		<el-table-column
      prop="retreatRate"
			:formatter="retreatRateFormat"
      label="最大回撤">
    </el-table-column>
		<el-table-column
      prop="isHangUp"
      label="是否挂机"
			width="95">
<template slot-scope="scope">
      <el-tag v-if="scope.row.isHangUp === '0'"
          type="success"
          close-transition>是</el-tag>
      <el-tag v-else-if="scope.row.isHangUp === '1'"
          type="danger"
          close-transition>否</el-tag>
</template>  
    </el-table-column>
		<el-table-column
      prop="handleStatus"
      label="是否处理"
			width="95">
<template slot-scope="scope">
      <el-tag v-if="scope.row.handleStatus === '0'"
          type="danger"
          close-transition>否</el-tag>
      <el-tag v-else-if="scope.row.handleStatus === '1'"
          type="success"
          close-transition>是</el-tag>
</template>  
    </el-table-column>
		<el-table-column
      prop="isPass"
      label="是否通过"
			width="95">
<template slot-scope="scope">
      <el-tag v-if="scope.row.isPass === '0'"
          type="danger"
          close-transition>否</el-tag>
      <el-tag v-else-if="scope.row.isPass === '1'"
          type="success"
          close-transition>是</el-tag>
</template>  
    </el-table-column>
		<el-table-column
      prop="handleResultDescription"
      label="反馈信息">
<template slot-scope="scope">
			<p class="red_text">{{scope.row.handleResultDescription}}</p>
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
<p class="state_tips"><a href="/system/transaction" type="primary"><i class="el-icon-plus"></i>添加账户</a></p>
        </div>

<!--图片预览页面模态框-->
<el-dialog title="图片预览" :visible.sync="dialogImgVisible">

<img class="modal_img" :src="dialogImgUrl"  />
</el-dialog>
        <!--编辑交易配置页面begin-->
		<el-dialog title="交易配置" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
				<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>扣款协议：</span>
			  </el-col>
			 <el-col  :span="16" class="li_right">
		      <a class="preview" href="http://turing-cloud.cn/file/委托扣款三方协议.pdf" download="委托扣款三方协议" ><i class="el-icon-document"></i>委托扣款协议</a>
			 </el-col>
			</el-row>
			<!--<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span></span>
			  </el-col>
			  <el-col  :span="16" class="li_right">
			   <a class="download" href="http://turing-cloud.cn/file/委托扣款三方协议.zip">下载协议</a>
			  </el-col>
			</el-row>-->
      <el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议上传方式：</span>
			  </el-col>
			  <el-col    :span="16" class="li_right radio35">
                  <el-switch  v-model="modalbody.contract.filetype"  off-value="img" on-value="pdf" off-color="#13ce66" on-text="PDF文件"  off-text="图片文件" :width='90' :disabled="modalbody.contract.isPass == '0'?false:true"></el-switch>
									<i v-if="modalbody.contract.filetype == 'img'?false:true">*请点击一下按钮，切换成图片格式上传。*请上传pdf格式的文件，大小不要超过2M</i>
									<i v-else>*请点击一下按钮，切换成PDF格式上传。*请上传jpg/png/jpeg/gif格式的图片，大小不要超过2M</i>
			  </el-col>			 
			</el-row>
  		<!--上传pdf文件已通过-->
			<div v-if="uploadStatus() == '1'">
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<a class="mask user_mask" target="_blank" :href="'http://turing-cloud.cn/file/'+modalbody.contract.file1">{{modalbody.contract.file1}}</a>
			  </el-col>  
			</el-row>		
			</div>
      <!--上传图片协议已通过-->
			<div v-else-if="uploadStatus() == '2'">
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<span class="mask user_mask1" @click="ViewImg($event)">{{modalbody.contract.file1}}</span>
			  </el-col>
			</el-row>
			<el-row class="li">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第二页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<span class="mask user_mask2" @click="ViewImg($event)">{{modalbody.contract.file2}}</span>
			  </el-col>
			</el-row>
			</div>
			<!--上传pdf文件未通过-->
			<div v-else-if="uploadStatus() == '3'">
			<div v-if="contractfiletype == 'img'?false:true">
			<el-row class="li" v-if="modalbody.contract.filetype == 'img'?false:true">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
					<span class="mask user_mask">{{modalbody.contract.file1}}</span>
			  </el-col>  
			</el-row>
			<div v-else>
			<el-row class="li" >
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
			</div>
			<div v-else>
			<el-row class="li" v-if="modalbody.contract.filetype == 'img'?false:true">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
					<span class="mask user_mask">{{modalbody.contract.file1}}</span>
			  </el-col>  
			</el-row>
			<div v-else>
			<el-row class="li" >
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
			</div>
			</div>
		  <!--上传图片协议未通过-->
		  <div v-else-if="uploadStatus() == '4'">
			<div v-if="contractfiletype == 'img'?false:true">
			<el-row class="li" v-if="modalbody.contract.filetype == 'img'?false:true">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
					<span class="mask user_mask">{{debit}}</span>
			  </el-col>  
			</el-row>
			<div v-else>
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<input type="file" id="debit_file1" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit1()" name="withholdPic">
				<span class="mask user_mask1">{{modalbody.contract.file1}}</span>
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
				<span class="mask user_mask2">{{modalbody.contract.file2}}</span>
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
			</div>
			<div v-else>
			<el-row class="li" v-if="modalbody.contract.filetype == 'img'?false:true">
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>上传PDF文件：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
					<input type="file" id="debit_file" accept="application/pdf"  @change="uploadDebit()"  name="withholdPdf">
					<span class="mask user_mask">{{debit}}</span>
			  </el-col>  
			</el-row>
			<div v-else>
			<el-row class="li" >
			  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
			     <span>协议第一页：</span>
			  </el-col>
			  <el-col  :span="16" class="file_box li_right">
				<input type="file" id="debit_file1" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadDebit1()" name="withholdPic">
				<span class="mask user_mask1">{{modalbody.contract.file1}}</span>
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
				<span class="mask user_mask2">{{modalbody.contract.file2}}</span>
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
			</div>
			</div>



				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用的平台：</span>
				  </el-col>
				  <el-col :span="16" class="li_right platform select100">
					    <template>
								<el-select v-model="modalbody.platform" placeholder="请选择" disabled>
									<el-option
									v-for="item in options1"
									:key="item.platform"
									:label="item.label1"
									:value="item.platform">
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
					   <el-input v-model="modalbody.mt4Account" placeholder="请输入MT4账号" :disabled="true"></el-input>
          </el-col>
				</el-row>	
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>修改MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
				    	<el-switch on-text="" off-text="" v-model="modalbody.isChangePassword" off-value="0" on-value="1" :width="80"></el-switch>
          </el-col>
				</el-row>
				<el-row class="li" v-show="modalbody.isChangePassword == '0'?false:true">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>新的MT4密码：</span>
				  </el-col>
				  <el-col :span="16" class="li_right">
					   <el-input type="password" v-model="modalbody.newPassword" placeholder="请输入新的MT4密码" ></el-input>
          </el-col>
				</el-row>	
				<el-row class="li" v-show="modalbody.isChangePassword == '0'?false:true">
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
					   <el-input v-model="modalbody.capital" placeholder="请输入投资金额（美元）"></el-input>
          </el-col>
				</el-row>	
			    <el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>使用挂机模式：</span>
				  </el-col>
				  <el-col :span="16" class="li_right select100">
					    <template>
								<el-select v-model="modalbody.mode" placeholder="请选择">
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
				    <span>建议回撤：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35 small_text">
				     <!--	<el-switch  v-model="switch3"  on-text="自定义"  off-text="35%" off-color="#13ce66" :width='80' ></el-switch>-->
							 <el-radio class="radio" v-model="switch3" label="0">35%</el-radio>
               <el-radio class="radio" v-model="switch3" label="1">自定义</el-radio>
					  	<el-input v-model="input5" placeholder="自定义回撤百分比" :disabled="switch3=='0'?true:false">
							  <template slot="append">%</template>
							</el-input>
          </el-col>
				</el-row>
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button      v-if="uploadStatus() == '1'||uploadStatus() == '2'" type="primary" @click="modify12(rowid)">提交修改</el-button>
			<el-button v-else-if="uploadStatus() == '3'||uploadStatus() == '4'" type="primary" @click="modify34(rowid)">提交修改</el-button>
			<el-button type="danger" @click="stop()" v-if="modalbody.isHangUp =='0'"  >停止挂机</el-button>
			<el-button type="success" @click="start()" v-else >开始挂机</el-button>
			<!--看后期开发需求是否需要删除账户信息功能-->
			<!--<el-button type="danger" @click="delete_setting">删除</el-button>--> 
			<el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
		</el-dialog>
        <!--编辑交易配置页面end-->
		<div class="page_footer">
		   	<span>风险警告：外汇和差价合约交易以及任何金融资产进行的交易都涉及高风险，都有损失部分和全部投资资金的可能性，未必适合每一位投资者。在决定参与交易之前，您应该审慎考虑您的投资目标、经验等级、财政状况及风险承受能力。您需要承担相关保证金的支付和交易带来的损失，如果没有足够资金承担损失，请不要贸然进行投资交易。图灵不会为市场风险导致的损失承担任何责任，请确保您已经阅读并完全理解图灵的政策披露描述。</span>
		</div>
	</div>	
</template>
<script>
 import moment from 'moment'
 export default {
    name: 'Account',
    data() {
      return {
			userid:'',
    // 上传扣款协议
		 switch0:"img",
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
          platform: 'GQCapital-Live',
          label1: 'GQCapital-Live'
        }],
        platform: '',
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
          label3: '成长型'
        }, {
          value3: '2',
          label3: '宏利先锋型'
        }, {
          value3: '3',
          label3: '趋势策略型'
        }, {
          value3: '4',
          label3: '综合尊享型'
        }],
      value3: '',
		// 同意挂机费用
		switch2:true,
		//建议回撤
		switch3:'0',
		input5: '',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02',
			platform: 'GQCapital-Live',
			account: '20171105',
			capital: '5000',
			model: '成长型',
			retracement: '35',
			state:'1',
			message:'最大回撤过大'
		}],
		dialogFormVisible: false,
		// 图片预览模态框
		dialogImgVisible:false,
		dialogImgUrl: '',
		// 后台返回数据
		// 表格数据
		tablebody:[],
		// 编辑账户信息模态框数据
		modalbody:{
			id:1,
			platform:"GQCapital-Live",
			mt4Account:"45654",
			mt4Password:"123456",
			isChangePassword:"0",
			newPassword:null,
			capital:1200.0,
			mode:"1",
			agreeHangUpCosts:true,
			retreatRate:12.0,
			createTime:1511404528000,
			lastModifiedTime:1511404528000,
			handleStatus:"0",
			handleResultDescription:null,
			isHangUp:"0",
      contract:{
				isPass:"0",
				filetype:"img",
				file1:"192fdsf.jpg",
				file2:"fdsf.jpg",
				file3:null,
				id:1,
				contractType:"扣款协议",
				handleStatus:"0",
				handleResultDescription:null,
			}
		},
		// 文件上传方式状态初始化
		contractisPass:"0",
		contractfiletype:"img",
		// 正在编辑的账户信息id
		rowid:1,
		// 监听变化之后的建议回撤
		retreatRate:"35"
      };
    },
		computed:{
			
		},
		mounted:function(){
			document.title = "我的账户信息";
			var self = this;
      if(localStorage["userid"]){
        self.userid = localStorage.getItem("userid");
      }else{
        self.$router.push('/system/');
      } 
			// 获取用户所有的交易信息
			if(self.userid === ''){
				return false;
			}else{
			self.$http({
								method: 'get',
								url: '/turingcloud/trnsaction/'+self.userid
								}).then(function(res){
										if(res.data.success == true){
												// console.log(res.data.body);
												// 表格数据返回无限长
												self.tablebody = res.data.body;
										}else if(res.data.success == false){
												self.$message.error(res.data.message);
										}
								}).catch(function(err){
									 console.log("AJAX失败");
									 self.$router.push('/system/');
								});
			}
			// 编辑页面建议回撤初始化
 			// self.monitorRetracement();
			//  协议上传显示状态初始化
			self.uploadStatus();
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
										self.$message.error('文件大小类型不符');
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
					}else if(mode == "2"){
            return "宏利先锋型";
					}else if(mode == "3"){
						return "趋势策略型";
					}else if(mode == "4"){
						return "综合尊享型";
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
				// 表格编辑按钮
        handleEdit(index, row) {
					 var self = this;
					self.rowid = row.id;
					self.$http({
								method: 'get',
								url: '/turingcloud/trnsaction/'+self.userid+'/'+row.id
						}).then(function(res){
								if(res.data.success == true){
									//  console.log(res.data.body);
									 self.modalbody = res.data.body;
									 // 返回数据放进交易配置编辑模态框
									 // 编辑页面建议回撤初始化		
									 self.monitorRetracement();
									 // 编辑页面协议上传初始化监听
									  self.contractisPass = self.modalbody.contract.isPass;
										self.contractfiletype = self.modalbody.contract.filetype;
										self.retreatRate = self.modalbody.retreatRate;
			            	self.uploadStatus();
								}else if(res.data.success == false){
									 self.$message.error(res.data.message);
								}
						}).catch(function(err){
								console.log("AJAX失败");
								self.$router.push('/system/');
						});
					 self.dialogFormVisible = true;
        },
				// 编辑页面建议回撤初始化监听			
				monitorRetracement(){
					 var self = this;
           if(self.modalbody.retreatRate ==35 ){
						//  self.input5 = "";
						 self.switch3 = "0"; 
					 }else{
						 self.switch3 = "1";
						 self.input5 = self.modalbody.retreatRate;
					 }
					//  self.swicth3
					//  self.input5
				},
				// 编辑页面协议上传初始化监听
				uploadStatus(){
					//  console.log('运行');
           var self = this;
					 if(self.contractisPass == "1" && self.contractfiletype == "pdf"){
						 return "1";
					 }
					 if(self.contractisPass == "1" && self.contractfiletype == "img"){
						 return "2";
					 }
					 if(self.contractisPass == "0" && self.contractfiletype == "pdf"){
						 return "3";
					 }
					 if(self.contractisPass == "0" && self.contractfiletype == "img"){
						 return "4";
					 }
		  	},
				// 点击预览图片
				ViewImg(event){
					var self = this;
					// dialogImgVisible
          self.dialogImgUrl = 'http://turing-cloud.cn/file/'+event.target.innerText;
					self.dialogImgVisible = true;
				},
        // 提交修改  图片已通过  2  // 提交修改  pdf已通过   1
				modify12(rowid){
					var self = this;
						 if(self.modalbody.capital === ''){
							  self.$message.error('账户投资资金不能为空');
						 }else if(self.modalbody.mode === ''){
							 self.$message.error('请至少选择一种挂机模式');
						 }else if(self.retreatRate === ''){
							 self.$message.error('建议回撤未填写');
						 }else{
							   var httpform = new FormData();
							   if(self.modalbody.isChangePassword == "0"){
                    httpform.append('isChangePassword',false);
								 }else if(self.modalbody.isChangePassword == "1"){
                      if(self.modalbody.newPassword === ''){
												self.$message.error('请输入新的MT4密码');
												return false;
											}else if(self.modalbody.newPassword != self.repassword1){
												self.$message.error('两次密码不一致');
												return false;
											}
											httpform.append('isChangePassword',true);
										  httpform.append('newPassword',self.modalbody.newPassword);
								 }
                    httpform.append('fileType',null);
										httpform.append('capital',self.modalbody.capital);
										httpform.append('mode',self.modalbody.mode);
										httpform.append('retreatRate',self.retreatRate);
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/trnsaction/'+self.userid+'/'+rowid,
                        data:httpform
                    }).then(function(res){
                        if(res.data.success == false){
                            self.$message.error(res.data.message);
                        }else{
                            self.$message({
                                    showClose: true,
                                    message: "您提交的信息客服会在24小时内进行审核，请您耐心等待！",
                                    type: 'success',
																		onClose:function(){
																				// 提交修改成功关闭模态框
					                              // self.dialogFormVisible = false;
																				self.$router.go(0);
																		}
                            });
                        }
                    }).catch(function(err){
                       console.log("AJAX失败");
											 self.$router.push('/system/');
                    });
						 } 
				},
				// 提交修改  pdf未通过   3 				// 提交修改  图片未通过  4
				modify34(rowid){
					var self = this;
						 if(self.modalbody.capital === ''){
							  self.$message.error('账户投资资金不能为空');
						 }else if(self.modalbody.mode === ''){
							 self.$message.error('请至少选择一种挂机模式');
						 }else if(self.retreatRate === ''){
							 self.$message.error('建议回撤未填写');
						 }else{
							   var httpform = new FormData();
								//  是否修改密码
							   if(self.modalbody.isChangePassword == "0"){
                    httpform.append('isChangePassword',false);
								 }else if(self.modalbody.isChangePassword == "1"){
                      if(self.modalbody.newPassword === ''){
												self.$message.error('请输入新的MT4密码');
												return false;
											}else if(self.modalbody.newPassword != self.repassword1){
												self.$message.error('两次密码不一致');
												return false;
											}
											httpform.append('isChangePassword',true);
										  httpform.append('newPassword',self.modalbody.newPassword);
								 }
								//  是否提交协议
								if(self.modalbody.contract.filetype == "img" && self.debit_file1 == true && self.debit_file2 == true){
									 httpform.append('fileType',self.modalbody.contract.filetype);
									 httpform.append('multipartFile1',document.getElementById("debit_file1").files[0]);
									 httpform.append('multipartFile2',document.getElementById("debit_file2").files[0]);
								}else if(self.modalbody.contract.filetype == "pdf" && self.debit_file == true){
									 httpform.append('fileType',self.modalbody.contract.filetype);
									 httpform.append('multipartFile1',document.getElementById("debit_file").files[0]);
								}else{
									 httpform.append('fileType',null);
								}   
										httpform.append('capital',self.modalbody.capital);
										httpform.append('mode',self.modalbody.mode);
										httpform.append('retreatRate',self.retreatRate);
                    self.$http({
                        method: 'post',
                        url: '/turingcloud/trnsaction/'+self.userid+'/'+rowid,
                        data:httpform
                    }).then(function(res){
                        if(res.data.success == false){
                            self.$message.error(res.data.message);
                        }else{
                            self.$message({
                                    showClose: true,
                                    message: "您提交的信息客服会在24小时内进行审核，请您耐心等待！",
                                    type: 'success',
																		onClose:function(){
																				// 提交修改成功关闭模态框
					                              // self.dialogFormVisible = false;
																				self.$router.go(0);
																		}
                            });
                        }
                    }).catch(function(err){
                       console.log("AJAX失败");
											 self.$router.push('/system/');
                    });
						 }
				},
				// 提交停止挂机
				stop(){
					var self = this;
						self.$confirm('此操作将停止该MT4账号的挂机, 是否继续?', '提示', {
							confirmButtonText: '取消',							
							cancelButtonText: '确定',
							confirmButtonClass: 'quxiao',
							cancelButtonClass: 'queding',
							type: 'warning'
						}).then(() => {
							self.$message({
								type: 'info',
								message: '已取消提交'
							});  
						}).catch(() => {
							self.$http({
												method: 'put',
												url: '/turingcloud/trnsaction/'+self.userid+'/changeHangupStatus/'+self.rowid
										}).then(function(res){
												if(res.data.success == true){
															self.$message({
																type: 'success',
																message: '您提交的信息客服会在24小时内进行审核，请您耐心等待！',
																onClose:function(){
																		// 提交成功关闭模态框
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
						});
				},
				// 提交开始挂机
				start(){
					var self = this;
						self.$confirm('此操作将开始运行该MT4账号的挂机, 是否继续?', '提示', {
							confirmButtonText: '取消',							
							cancelButtonText: '确定',
							confirmButtonClass: 'quxiao',
							cancelButtonClass: 'queding',
							type: 'warning'
						}).then(() => {
							self.$message({
								type: 'info',
								message: '已取消提交'
							});  
						}).catch(() => {
							self.$http({
												method: 'put',
												url: '/turingcloud/trnsaction/'+self.userid+'/changeHangupStatus/'+self.rowid
										}).then(function(res){
												if(res.data.success == true){
															self.$message({
																type: 'success',
																message: '您提交的信息客服会在24小时内进行审核，请您耐心等待！',
																onClose:function(){
																		// 提交成功关闭模态框
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
						});
				},
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
	line-height:30px;
	text-align:left;
	padding-right:30px;
	text-align:right;
}
.page_content .state_tips a{
	font-size:15px;
    display: inline-block;
    width: 100px;
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
.page_content .state_tips span{
 	display:inline-block;
	width:50px;
	height:22px;
	border-radius:12px;
	vertical-align:middle;
	margin-right:30px;
}
/*编辑交易配置页面begin*/
.edit_content{
  /*padding-bottom:35px;*/
}
.edit_content  .li{
	margin-top:35px;
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
	/*height:35px;*/
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
.small_text .el-input{
	float:right;
	width:40%;
}
/*编辑交易配置页面end*/


.page_footer{
  border-top: 1px solid #f4f4f4;
  text-align: left;
  padding: 0 10px;
}
.page_footer span{
	display: inline-block;
  font-size:15px;
  line-height: 25px;
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
.file_box>a{
	display:block;
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
/*图片模态框*/
.modal_img{
	max-width:100%;
}
/*反馈信息文本颜色*/
.red_text{
	color:red;
}

</style>