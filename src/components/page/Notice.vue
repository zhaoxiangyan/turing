<template>
	<div class="notice" v-show="all">
	    <div class="page_title">
		    <span>公告信息</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>公告</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
          <ul>
            <li v-for="tab in tabs"><i class="fa fa-volume-up" aria-hidden="true"></i>{{tab.content}}<span>{{tab.createTime|timeFilter}}</span></li>
          </ul>
        </div>
	</div>	
</template>
<script>
 import moment from 'moment'
 export default {
    name: 'Notice',
    data() {
      return {
        userid:'',
        all:false,
        tabs:''
      }
    },
    computed:{
       
    },
    mounted:function(){
      document.title = "公告信息";
      var self = this;
      if(localStorage["userid"]){
        // self.userid = localStorage.getItem("userid");
        self.all = true;
      }else{
        self.$router.push('/system/');
      }
      // 获取所有公告内容
			self.$http({
				        method: 'get',
								url: '/turingcloud/news/list?type=1'
								}).then(function(res){
										if(res.data.success == true){
												// console.log(res.data.body);
												self.tabs = res.data.body;
												// 表格数据返回无限长
										}else if(res.data.success == false){
												self.$message.error(res.data.message);
										}
								}).catch(function(err){
									 console.log("AJAX失败");
								});
    },
    filters:{
			// 公告时间过滤器
			  timeFilter:function(value){
          return moment(value).format("YYYY-MM-DD");  
        }
		},
    methods: {

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
.page_title span i{
	font-style:normal;
	font-size:14px;
	margin-left:5px;
	color:#77779e;
}
.el-breadcrumb{
	display:inline-block;
	float:right;
}

.page_content{
  text-align:left;
  padding:10px;
}
.page_content ul{
}
.page_content ul li{
    margin-bottom:5px;
}
.page_content ul li i{
    margin-right:5px;
}
.page_content ul li span{
    float:right;
}
</style>