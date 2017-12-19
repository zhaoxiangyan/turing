<template>
	<div class="market" v-show="all">
	    <div class="page_title">
		    <span>市场情绪</span>
		    <el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{path:'/system/admin/home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>市场情绪</el-breadcrumb-item>
	    	</el-breadcrumb>
		</div>	
        <div class="page_content">
           <img src="../../../assets/img/market.png">
<el-date-picker
		v-model="value1"
		type="date"
		placeholder="选择日期">
</el-date-picker>
           <el-button type="primary" @click="dialogFormVisible = true">修改图片</el-button>
        </div>
<el-dialog title="修改市场情绪图片" :visible.sync="dialogFormVisible" size="tiny">
  <el-row class="li file_box">
      <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" id="file_img" @change="uploadImg()">
      <span>{{filename_text}}</span>
  </el-row>
  <el-row class="li li_title" v-show="have_img">
      <span>预览：</span>
  </el-row>
  <el-row class="li" v-show="have_img">
      <img id="Img" :src='img_src'>
  </el-row>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogFormVisible = false" :disabled="!have_img">确 定</el-button>
    <el-button @click="dialogFormVisible = false">取 消</el-button>
  </div>
</el-dialog>
	</div>	
</template>
<script>
 export default {
    name: 'Market',
    data() {
      return {
        userid:'',
        all:true,
        value1: '',
        // 模态框
        dialogFormVisible: false,
        formLabelWidth: '120px',
        filename_text: '点击上传图片',
        have_img:false,
        img_src:'../../../static/img/market.png'
      }
    },
    mounted:function(){
      document.title = "管理市场情绪";
      var self = this;
    },
    methods:{
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
                    self.filename_text = file.name;
                    //读取文件过程方法
                    reader.onload = function (e) {
                        // console.log("成功读取....");
                        var img = document.getElementById("Img");
                        self.img_src = e.target.result;
                        self.have_img = true;
                        //或者 img.src = this.result;  //e.target == this
                    }
                    reader.readAsDataURL(file)
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
    vertical-align:bottom;
}


.li_title{
    text-align:left;
}
.li_title span{
    display: block;
    height: 35px;
    line-height: 35px;
    font-weight: bold;
}
.li.file_box{
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
    width:100%;
}
.li.file_box:hover{
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
.li img{
    max-width:100%;
}
</style>