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
选择日期：<el-date-picker
		v-model="value1"
		type="date"
		:default-value='Date.now()'
		placeholder="选择日期"
		:picker-options="pickerOptions0">
</el-date-picker>
<br/>
           <img src="../../assets/img/market.png">
        </div>
	</div>	
</template>
<script>
 export default {
    name: 'Market',
    data() {
      return {
        userid:'',
        all:false,
				value1: '',
				pickerOptions0: {
          disabledDate(time) {
            // return time.getTime() < Date.now() - 6.048e8;
						return time.getTime() > Date.now();
          }
        }
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
	width:300px;
}
</style>