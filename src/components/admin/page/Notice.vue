<template>
	<div class="notice">
	    <div class="page_title">
		    <span><i class="el-icon-message"></i>公告和喜讯</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/admin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>公告和喜讯</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<!--用户查询-->
<!--筛选-->
<div class="screen_div">
<el-select v-model="search.type"  clearable placeholder="类型" size="120" @change="handleCurrentChange(1)" @clear="handleCurrentChange(1)" >
      <el-option label="公告" value="1"></el-option>
      <el-option label="喜讯" value="2"></el-option>
</el-select>
<el-button type="primary" icon="edit" @click="dialogFormVisible1 = true">添加</el-button>
</div>
<!--公告喜讯表格table-->
<template>
  <el-table ref="table"
    :data="tablebody0"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="时间">
    </el-table-column>
    <el-table-column
        prop="content"
        label="内容">
    </el-table-column>
    <el-table-column
        prop="admin"
        label="发布管理员">
    </el-table-column>
	<el-table-column
      prop="type"
      label="类型"
	  width="95">
<template slot-scope="scope">
      <el-tag
          :type="scope.row.type === '公告' ? 'primary' : 'success'"
          close-transition>{{scope.row.type === '公告' ? '公告':'喜讯'}}</el-tag>
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
        <!--添加公告喜讯页面begin-->
        <el-dialog title="添加公告和喜讯" :visible.sync="dialogFormVisible1">
		    <el-row class="edit_content">
			  <el-row class="li">
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				   <span>类型：</span>
			    </el-col>
				<el-col :span="16" class="li_right">
				  <el-select v-model="form1.type" placeholder="请选择类型">
                    <el-option label="公告" value="1"></el-option>
                    <el-option label="喜讯" value="2"></el-option>
                  </el-select>
				</el-col>
			  </el-row>
			  <el-row class="li">
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				  <span>内容：</span>
				</el-col>
				<el-col :span="16">
				  <el-input v-model="form1.content"></el-input>
				</el-col>
			  </el-row>
			</el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addContent()" :disabled="add_button">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--添加公告喜讯页面end-->
        <!--公告喜讯编辑页面begin-->
		<el-dialog title="详细信息" :visible.sync="dialogFormVisible">
		<el-row class="edit_content">
				<el-row class="li">
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>类型：</span>
				  </el-col>
				  <el-col :span="16" class="li_right radio35">
                    <el-select v-model="modalbody[0].type" placeholder="请选择类型">
                        <el-option label="公告" value="1"></el-option>
                        <el-option label="喜讯" value="2"></el-option>
                    </el-select>
                  </el-col>
				</el-row>
				<el-row class="li textarea_box" >
				  <el-col  :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				    <span>内容：</span>
				  </el-col>
				  <el-col :span="16" class="li_right textarea_div" >
					  <el-input  v-model="modalbody[0].content"></el-input>
                  </el-col>
				</el-row>
		</el-row>
		<div slot="footer" class="dialog-footer">
		  <el-button type="primary" @click="modify()" :disabled="modify_button">提交修改</el-button>
			<el-button type="danger" @click="delete_setting()">删除</el-button>
			<el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
		</el-dialog>
        <!--公告喜讯编辑页面end-->
		<div class="page_footer">
		   <span>图灵智能交易系统仅提供软件服务。交易有风险，入市须谨慎！</span>
		</div>
	</div>	
</template>
<script>
 import moment from 'moment'
 import CsvExport from '../../../../src/utils/CsvExport.js'
 export default {
    name: 'Notice',
    data() {
      return {
		adminname:'',
        // 添加
        dialogFormVisible1: false,
        form1:{
			content:'',
			type:''
		},
        formLabelWidth1: '120px',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02 10:11',
			content: '图灵智能交易系统正式上线',
			type:'1',
            admin:'管理员1'
		}, {
			id:'2',
			date: '2016-11-02 15:25',
			content: '图灵智能交易系统正式上线',
			type:'2',
            admin:'管理员2'
		}],
        // 编辑模态框
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
            type:''
		},
		// 编辑的公告喜讯id
		rowid:1,
		// 编辑公告喜讯模态框数据
		modalbody:[{
			id:'1',
			type:'1',
            content:'fdsfdsfdsf'
		}]
      };
    },
	computed:{
		"add_button":function(){
			var self = this;
			if(self.form1.type === ''||self.form1.content === ''){
                 return true;
			}else{
				return false;
			}
		},
		"modify_button":function(){
			var self = this;
			if(self.modalbody[0].type === ''||self.modalbody[0].content === ''){
				return true;
			}else{
				return false;
			}
		}
	},
	mounted:function(){
			document.title = "管理公告和喜讯";
			var self = this;
			if(window.localStorage["adminname"]){
              self.adminname = window.localStorage.getItem('adminname');
            }
			// 管理公告和喜讯的表格初始化
			self.$http({
								method: 'get',
								url: '/turingcloud/news/list'
						}).then(function(res){
							if(res.data.success == false){
								self.$message.error(res.data.message);
							}else if(res.data.success == true){
								self.total = res.data.totalElements;
                                self.tablebody = res.data.body;
								// 页面布局初始化
							}
						}).catch(function(err){
								console.log("AJAX失败");
						});
	},
	watch:{
        tablebody:function(){
            var self = this;
            self.tablebody0.splice(0,self.tablebody0.length);
            for(var i = 0;i<self.tablebody.length;i++){
                var date_value = moment(self.tablebody[i].createTime).format("YYYY-MM-DD HH:mm:ss");  
                var type_value = (function(){
						if(self.tablebody[i].type == "1"){
							return "公告";
						}else if(self.tablebody[i].type == "2"){
							return "喜讯";
						}else{
							return " ";
						}
                })(type_value);
                self.tablebody0.push({
                    "id":self.tablebody[i].id,
                    "date":date_value,
					"type":type_value,
					"content":self.tablebody[i].content,
					"admin":self.tablebody[i].publisher
                });
            }
        }
	},		
    methods: {
        // 表格编辑按钮
        handleEdit(index, row) {
			var self = this;
			self.modalbody.splice(0,self.modalbody.length);
			var type_value = (function(){
				if(self.tablebody0[index].type == "公告"){
					return "1";
				}else if(self.tablebody0[index].type == "喜讯"){
					return "2";
				}else{
					return " ";
				}
			})(type_value);
			self.modalbody.push({
				"id":self.tablebody0[index].id,
				"type":type_value,
				"content":self.tablebody0[index].content
			});
			self.dialogFormVisible = true;
        },
        // 公告和喜讯提交修改
        modify(){
            var self = this;
            self.$http({
                            method: 'put',
                            url: '/turingcloud/news/'+self.modalbody[0].id+'/?publisher='+self.adminname+'&type='+self.modalbody[0].type+'&content='+self.modalbody[0].content
                        }).then(function(res){
                            if(res.data.success == true){
								self.$alert('公告和喜讯修改成功。', '图灵智能交易系统', {
									confirmButtonText: '确定',
									callback: action => {
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
        // 删除公告和喜讯
        delete_setting() {
            var self = this;
            self.$confirm('此操作将永久删除该公告和喜讯, 是否继续?', '提示', {
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
                                url: '/turingcloud/news/'+self.modalbody[0].id
                        }).then(function(res){
                                if(res.data.success == false){
                                    self.$message.error(res.data.message);
									return false;
                                }
								self.$alert('公告和喜讯已删除。', '图灵智能交易系统', {
									confirmButtonText: '确定',
									callback: action => {
										self.$router.go(0);
									}
                                });
                        }).catch(function(err){
                                console.log("AJAX失败");
                        });      
            });
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
                // console.log(`当前页: ${val}`);
				self.$http({
								method: 'get',
								url: '/turingcloud/news/list?type='+self.search.type+'&size='+self.search.size+'&page='+(self.search.page-1)
						}).then(function(res){
							if(res.data.success == false){
								self.$message.error(res.data.message);
							}else if(res.data.success == true){
								self.total = res.data.totalElements;
								self.tablebody = res.data.body;
								// 页面布局初始化
							}
						}).catch(function(err){
								console.log("AJAX失败");
						});
 
        },
        // 导出CSV
        csv_download() {
            let columns = this.$refs.table.$children.filter(t => t.prop != null)
            const fields = columns.map(t => t.prop)
            const fieldNames =  columns.map(t => t.label)
            CsvExport(this.tablebody0, fields, fieldNames, '公告喜讯')
        },
		// 添加公告和喜讯
		addContent() {
		   var self = this;
           if(self.form1.content.replace(/^\s+|\s+$/g,'') === ''){
			   self.$message.error('请不要输入空格');
			   return false;
		   }
		   self.$http({
							method: 'post',
							url: '/turingcloud/news/?publisher='+self.adminname+'&type='+self.form1.type+'&content='+self.form1.content
					}).then(function(res){
						if(res.data.success == false){
							self.$message.error(res.data.message);
						}else if(res.data.success == true){
							self.$alert('公告和喜讯添加成功。', '图灵智能交易系统', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    self.$router.go(0);
                                }
                            });
							// 页面布局初始化
						}
					}).catch(function(err){
							console.log("AJAX失败");
					});
		}
    }
}
</script>
<style scoped>
.notice{
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
.page_title span i.el-icon-message{
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
.page_content .screen_div{
    text-align:left;
    margin:10px 0;
    padding:0 20px;
}
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
.li_right{
	text-align:left;
}
</style>