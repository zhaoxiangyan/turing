<template>
 <div class="notfound">
    <p class="sorry_box"><span class="sorry">抱歉</span>，您所访问的页面不存在...</p>
    <p class="timeout"><span class="countdown">{{time}}</span>秒后自动跳转到<a href="/system/login">图灵智能交易系统</a></p>
 </div>
</template>
<script>
 export default {
    name: 'notfound',
    data() {
      return {
		time:'5'
      };
    },
    methods: {
      
    }
}
</script>
<style scoped>
.sorry_box{
    margin:200px 0 15px;
}
.sorry_box .sorry{}
.timeout{}
.timeout .countdown{}

</style>