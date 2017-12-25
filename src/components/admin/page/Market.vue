<template>
	<div class="market">
	    <div class="page_title">
		    <span><i class="fa fa-bar-chart"></i>管理市场情绪</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/admin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>管理市场情绪</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
<!--用户查询-->
<!--筛选-->
<div class="screen_div">
<el-date-picker
      v-model="value6"
      type="date"
      placeholder="起始日期"
      @change="start_change"
      :picker-options="pickerOptions">
</el-date-picker>
to
<el-date-picker
      v-model="value7"
      type="date"
      placeholder="终止日期"
      @change="end_change"
      :picker-options="pickerOptions">
</el-date-picker>
<el-button type="primary" icon="edit" @click="dialogFormVisible1 = true">添加</el-button>
</div>
<!--公告喜讯表格table-->
<template>
  <el-table ref="table"
    :data="tablebody"
    style="width: 100%">
    <el-table-column
      prop="createTime"
      :formatter="dateFormat"
      label="日期">
    </el-table-column>
    <el-table-column
        label="图片">
        <template slot-scope="scope">
           <el-button type="text" size="small"  @click="viewImg(scope.$index, scope.row)">查看图片</el-button>
        </template>
    </el-table-column>
    <el-table-column
        prop="publisher"
        label="发布管理员">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
       <el-button type="text" size="small"  @click="handleEdit(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<p class="state_tips">
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
        <!--添加市场情绪begin-->
        <el-dialog title="添加市场情绪" :visible.sync="dialogFormVisible1">
		    <el-row class="edit_content">
			  <el-row class="li">
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				   <span>日期：</span>
			    </el-col>
				<el-col :span="16" class="li_right">
<el-date-picker
      v-model="form1.date"
      type="date"
      placeholder="选择日期"
      :clearable="false"
      :picker-options="form1.pickerOptions"
      @change="addDate">
</el-date-picker>
				</el-col>
			  </el-row>
			  <el-row class="li">
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				  <span>市场情绪：</span>
				</el-col>
				<el-col :span="16" class="file_box">
				  <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id="file_img" @change="uploadImg()">
                  <span>{{form1.filename_text}}</span>
				</el-col>
			  </el-row>
              <el-row class="li" v-show="form1.have_img">
			    <el-col :xs="7" :sm="6" :md="5" :lg="5" class="li_left">
				  <span>预览：</span>
				</el-col>
				<el-col :span="16" class="img_box">
				  <img id="Img" :src="form1.img_src">
				</el-col>
			  </el-row>
			</el-row>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addContent()" :disabled="add_button">确 定</el-button>
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--添加市场情绪页面end-->
        <!--市场情绪查看图片模态框begin-->
<el-dialog title="市场情绪" :visible.sync="dialogImgVisible">
    <img class="modal_img" :src="dialogImgUrl"  />
</el-dialog>
        <!--市场情绪查看图片模态框end-->
		<div class="page_footer">
		   <span>图灵智能交易系统仅提供软件服务。交易有风险，入市须谨慎！</span>
		</div>
	</div>	
</template>
<script>
 import moment from 'moment'
 export default {
    name: 'Market',
    data() {
      return {
        adminname:'',
        dialogImgVisible:false,
        dialogImgUrl:'',
        value6:'',
        value7:'',
        pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }
        },
        // 添加
        dialogFormVisible1: false,
        form1:{
			date:'',
            pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }
            },
            filename_text:'点击上传图片',
			have_img:false,
            img_src:'../../../static/img/market.png',
            time_stamp:''
		},
        formLabelWidth1: '120px',
		// 表格数据
		tableData: [{
			id:'1',
			date: '2016-05-02',
            src:'../../../static/img/market.png',
            admin:'管理员1'
		}, {
			id:'2',
			date: '2016-11-02',
            src:'../../../static/img/readme.PNG',
            admin:'管理员2'
		}],
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
            range:{
                start:'',
                end:''
            }
		},
		// 删除的市场情绪id
		rowid:1
      };
    },
    computed:{
        "add_button":function(){
            var self = this;
			if(self.form1.date === ''||self.form1.have_img === false){
                 return true;
			}else{
				return false;
			}
        }
    },
	mounted:function(){
		document.title = "管理市场情绪";
        var self = this;
        if(window.localStorage["adminname"]){
              self.adminname = window.localStorage.getItem('adminname');
        }
        // 管理市场情绪的表格初始化
        self.$http({
                            method: 'get',
                            url: '/turingcloud/ms/list'
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
        // tablebody:function(){
        //     var self = this;
        //     self.tablebody0.splice(0,self.tablebody0.length);
        //     for(var i = 0;i<self.tablebody.length;i++){
        //         var date_value = moment(self.tablebody[i].createTime).format("YYYY-MM-DD HH:mm:ss");  
        //         var type_value = (function(){
		// 				if(self.tablebody[i].type == "1"){
		// 					return "公告";
		// 				}else if(self.tablebody[i].type == "2"){
		// 					return "喜讯";
		// 				}else{
		// 					return " ";
		// 				}
        //         })(type_value);
        //         self.tablebody0.push({
        //             "id":self.tablebody[i].id,
        //             "date":date_value,
		// 			"type":type_value,
		// 			"content":self.tablebody[i].content,
		// 			"admin":self.tablebody[i].publisher
        //         });
        //     }
        // }
	},		
    methods: {
        // 查看市场情绪图片
        viewImg(index, row) {
            var self = this;
            self.dialogImgUrl = '/file/ms/'+row.content;
            self.dialogImgVisible = true;
        },
        // 表格删除按钮
        handleEdit(index, row) {
            var self = this;
            self.rowid = row.id;
            self.$confirm('此操作将永久删除该条市场情绪, 是否继续?', '提示', {
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
                                url: '/turingcloud/ms/'+self.rowid
                        }).then(function(res){      
                                if(res.data.success == false){
                                    self.$message.error(res.data.message);
                                }else{
                                    self.$message({
                                                    type: 'success',
                                                    message: '该条市场情绪已永久删除!',
                                                    duration: '1000',
                                                    onClose:function(){
                                                        // 删除成功关闭模态框
                                                        self.$router.go(0);
                                                    }
                                                });
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
		// 分页
		handleSizeChange(val) {
                var self = this;
				self.search.size = val;
                self.handleCurrentChange(1);
        },
        handleCurrentChange(val) {
                var self = this;
				self.search.page = val;
                // console.log(`当前页: ${val}`);
                self.$http({
                                method: 'get',
                                url: '/turingcloud/ms/list?from='+self.search.range.start+'&to='+self.search.range.end+'&size='+self.search.size+'&page='+(self.search.page-1)
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
        // 检测图片格式大小符合
        testIMG(img){
            var path = img.value;
            var fileExt = path.substring(path.lastIndexOf(".")).toLowerCase();
            if (!fileExt.match(/.jpg|.jpeg|.gif|.png|.bmp/i)) {
                // 上传的文件不是图片，请重新上传
                return false;
            }
            var size = (img.files[0].size / 1024).toFixed(0);
            if(size>4096){
                //   图片文件大于4M
                return false;
            }
            return true;
            // alert('你选择的文件大小' + (img.files[0].size / 1024).toFixed(0) + "kb");
        },
        uploadImg(){
                var self = this;
                var reader = new FileReader();
                var fileID = document.getElementById("file_img");
                if(!this.testIMG(fileID)){
                    self.$message.error('图片大小类型不符');
                    fileID.value = "";
                    return false;
                }else{
                    var file = document.getElementById("file_img").files[0];
                    self.form1.filename_text = file.name;
                    //读取文件过程方法
                    reader.onload = function (e) {
                        // console.log("成功读取....");
                        var img = document.getElementById("Img");
                        self.form1.img_src = e.target.result;
                        self.form1.have_img = true;
                        //或者 img.src = this.result;  //e.target == this
                    }
                    reader.readAsDataURL(file)
                }
        },
        addDate(val){
            console.log(val);
            var self = this;
            self.form1.time_stamp = new Date(val).getTime();
        },
        // 添加市场情绪
		addContent() {
		   var self = this;
           var image = new FormData();
           image.append('publisher',self.adminname);
           image.append('pic',document.getElementById("file_img").files[0]);
           image.append('date',self.form1.time_stamp);
		   self.$http({
							method: 'post',
							url: '/turingcloud/ms/',
                            data:image
					}).then(function(res){
						if(res.data.success == false){
							self.$message.error(res.data.message);
						}else if(res.data.success == true){
							self.$alert('添加市场情绪成功。', '图灵智能交易系统', {
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
		},
        // 起始时间，终止时间
        start_change(val){
            var self = this;
            if(self.value6 === ""){
                self.search.range.start = "";
            }else{
                self.search.range.start = new Date(val).getTime();
            }
            if(self.search.range.start < self.search.range.end){
                self.handleCurrentChange(1);
            }
        },
        end_change(val){
            console.log(val);
            var self = this;
            if(self.value7 === ""){
                self.search.range.end = "";
            }else{
                self.search.range.end = new Date(val).getTime();
            }
            if(self.search.range.start < self.search.range.end){
                self.handleCurrentChange(1);
            }
        }
    }
}
</script>
<style scoped>
.market{
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
.page_title span i.fa-bar-chart{
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


#Img{
    max-width:100%;
}
.edit_content .li div.img_box{
    height:auto;
}
.file_box{
    display: inline-block;
    height: 35px;
    line-height: 35px;
    border-radius: 4px;
    text-align: center;
    border: 1px solid #bfcbd9;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
}
.file_box:hover{
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
    display:inline-block;
    height:35px;
    line-height:35px;
    border-radius:4px;
}
.file_box span{
    height: 35px;
    line-height: 35px;
    border-radius: 4px;
    text-align: center;
    display: block;
    color: rgb(32, 160, 255);
    font-size: 15px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
}
</style>