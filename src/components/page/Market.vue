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
           <img :src="img.content|srcFilter" v-show="img.showimg">
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
				imgData:[{
					date:'2017-12-20',
					src:'../../../static/img/market.png',
					showimg:true
				  },
					{
					date:'2017-12-19',
					src:'../../../static/img/market.png',
					showimg:false
			  	},
					{
					date:'2017-12-18',
					src:'../../../static/img/market.png',
					showimg:false
			  	},
					{
					date:'2017-12-17',
					src:'../../../static/img/market.png',
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
												// console.log(res.data.body);
												self.imgData = res.data.body;
												for(var i = 0;i<res.data.body.length;i++){
													if(i == 0){
														self.imgData[i].showimg = true;
													}else{
                            self.imgData[i].showimg = false;
													}	
                        }
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
					return 'http://turing-cloud.cn/file/ms/'+value;
				}

		},
		methods:{
			viewImg(index){
				alert(index);
				var self = this;
				// Vue.set(self.imgData[index], 'showimg', true);
				self.imgData[index] = Object.assign({}, self.imgData[index], {
					showimg: !self.imgData[index].showimg
				})
				// self.imgData[index].showimg = !self.imgData[index].showimg;
				// if(self.imgData[index].showimg = true){
        //   self.$set(self.imgData[index], 'showimg', false);
				// }else{
				//   self.$set(self.imgData[index], 'showimg', true);
				// }
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
	max-width:100%;
}
</style>