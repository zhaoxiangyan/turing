<template>
	<div class="manage">
     <p>Copyright&nbsp;&copy;&nbsp;2015-2017 <b>图灵智能交易系统</b>.<i>版权所有</i><span>Version&nbsp;1.0.1</span></p>
	</div>	
</template>
<script>
 export default {
    name: 'Manage',
    data() {
      return {

      };
    }
  }
</script>
<style scoped>
.manage{
	height:50px;
  /*margin:0 -25px -25px;*/
  position:fixed;
  bottom:0px;
  left:200px;
  right:0px;
  border-top:1px solid #d2d6de;
  background:#fff;
}
.min-left .copyright{
  left:80px;
}
.copyright p{
  line-height:50px;
  font-weight:bold;
  text-align:left;
  padding:0 20px;
}
.copyright p b{
  color:#21b548;
  font-style:normal;
}
.copyright p i{
  font-style:normal;
  font-weight:normal;
}
.copyright p span{
  float:right;
}
</style>