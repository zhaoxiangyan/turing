<template>
    <div class="wrapper" v-show="all">
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
             self.$http({
                method: 'get',
                url: '/turingcloud/isLogin',
                }).then(function(res){
                    console.log(res.data);
                   if(res.data == true){
                       self.all = true;
                   }else{
                     self.$router.push('/system/admin/');
                   }
                }).catch(function(err){
                    console.log("AJAX失败");
                    self.$router.push('/system/admin/');
                }); 
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
