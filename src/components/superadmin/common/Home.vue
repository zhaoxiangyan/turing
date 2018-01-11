<template>
    <div class="wrapper" v-show="all" >
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content" v-bind:class="[ getcollapsed ? '' : 'min-left']">
            <transition name="move"><router-view></router-view></transition>
             <v-Copyright></v-Copyright>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue'
    import vSidebar from './Sidebar.vue'
     import vCopyright from '../page/Copyright.vue'
    import {mapGetters} from 'vuex'
    export default {
      data () {
        return {
          all:false
        }
      },
      components: {
        vHead, vSidebar,vCopyright
      },
      computed: {
        // 使用对象展开运算符将getters混入computed对象中
        ...mapGetters([
            'getcollapsed'
        ]) 
      },
      mounted: function(){
            var self = this;
            // 登录拦截begin
             self.$http({
                method: 'get',
                url: '/turingcloud/isLogin',
                }).then(function(res){
                   if(res.data.success == true && res.data.body.principal.roles[0].id == 3){
                       self.all = true;
                   }else{
                     self.$router.push('/system/superadmin/');
                   }
                }).catch(function(err){
                    console.log("AJAX失败");
                }); 
            // 登录拦截end
            // 获取用户登录状态  定时器
            self.loginStatus = setInterval(()=>{self.loginTime()}, 30000);
      },
      methods: {
        loginTime(){
            var self = this;
           self.$http({
                method: 'get',
                url: '/turingcloud/isLogin',
                }).then(function(res){
                   if(res.data.success == true && res.data.body.principal.roles[0].id == 3){
                       return true;
                   }else{
                     self.$message.error('用户未登入');
                     self.$router.push('/system/superadmin/');
                   }
                }).catch(function(err){
                    console.log("AJAX失败");
                });    
		}
      },
      beforeDestroy(){
		clearInterval(this.loginStatus);	
	  }
    }
</script>

<style scoped>
.content.min-left{
    left:80px;
}
.content{
    background:#ecf0f5;
}
</style>
