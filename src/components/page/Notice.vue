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
            <li><i class="fa fa-volume-up" aria-hidden="true"></i>1111图灵智能交易系统暂停交易，系统维护12.18-12.20<span>2017-12-16</span></li>
            <li><i class="fa fa-volume-up" aria-hidden="true"></i>22图灵智能交易系统暂停交易，系统维护12.18-12.20<span>2017-12-16</span></li>
            <li><i class="fa fa-volume-up" aria-hidden="true"></i>333333333图灵智能交易系统暂停交易，系统维护12.18-12.20<span>2017-12-16</span></li>
            <li><i class="fa fa-volume-up" aria-hidden="true"></i>4444444图灵智能交易系统暂停交易，系统维护12.18-12.20<span>2017-12-16</span></li>
          </ul>
        </div>
	</div>	
</template>
<script>
 export default {
    name: 'Notice',
    data() {
      return {
        userid:'',
        all:false
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
    },
    filters: {
      // 时间过滤器
    //   timeFilter:function(value){
    //       var date = new Date(value);
    //       var Y = date.getFullYear()+'-';
    //       var  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //       var D = date.getDate() + ' ';
    //       var h = date.getHours() + ':';
    //       var m = date.getMinutes() + ':';
    //       var s = date.getSeconds();
    //         return Y+M+D+h+m+s; 
    //   }
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