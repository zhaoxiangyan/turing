<template>
	<div class="market" v-show="all">
	    <div class="page_title">
		    <span>市场情绪</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>市场情绪</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
				  <div :index="index" v-for="(img,index) in imgData">
				   <el-button type="text" @click="viewImg(index)" >{{img.createTime|timeFilter}}&nbsp;&nbsp;<i class="el-icon-picture"></i></el-button>
					 <br/>
           <img :src="img.content|srcFilter" v-show="show===index">
					</div>
        </div>
	</div>	
</template>
<script>
 import moment from 'moment'
 export default {
    name: 'Market',
    data() {
      return {
        userid:'',
        all:false,
				show:0,
				imgData:[{
					createTime:'2017-12-20',
					content:'01415302004720171222151706288299.jpg',
					showimg:true
				  },
					{
					createTime:'2017-12-17',
					content:'01415302004720171222151706288299.jpg',
					showimg:false
			  	}]
      }
    },
    mounted:function(){
      document.title = "市场情绪";
      var self = this;
			self.value1 = Date.now();
      if(localStorage["userid"]){
        // self.userid = localStorage.getItem("userid");
        self.all = true;
      }else{
        self.$router.push('/system/');
      }
			// 获取所有市场情绪
			self.$http({
				        method: 'get',
								url: '/turingcloud/ms/list'
								}).then(function(res){
										if(res.data.success == true){
												self.imgData = res.data.body;
												// 表格数据返回无限长
										}else if(res.data.success == false){
												self.$message.error(res.data.message);
										}
								}).catch(function(err){
									 console.log("AJAX失败");
								});
    },
		filters:{
			// 市场情绪时间过滤器
			  timeFilter:function(value){
          return moment(value).format("YYYY-MM-DD");  
        },
				srcFilter:function(value){
					return '/file/ms/'+value;
					// return 'http://192.168.0.111/file/ms/'+value;
				}

		},
		methods:{
			viewImg(index){
				var self = this;
				self.show = index;
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
.page_content img{
	width:450px;
	max-width:100%;
}
</style>