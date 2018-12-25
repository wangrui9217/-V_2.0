<template>
  <div class="box" v-if="currentTitle">
    <div class="g-title title">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
        <template v-for="(item, index) in breadItemList">
          <el-breadcrumb-item  :key="index" :to="item.name? {name:item.name}:{path:item.path}" v-if="item.name || item.path">{{item.value}}</el-breadcrumb-item>
          <el-breadcrumb-item  :key="index" v-else>{{item.value}}</el-breadcrumb-item>
        </template>
        </transition-group>
      </el-breadcrumb>
      <!--<div class="text">{{currentTitle}}</div>-->
    </div>
    <tags-view></tags-view>
  </div>
</template>
<script>
import tagsView from './TagsView'
export default {
  components: {tagsView},
  created() {
    this.getBread(true);  //刷新的参数为true
  },
  data() {
    return {
      breadList: [],
      // breadItemList: [{value: '首页', name: '', path: ''}, {value: '首页', name: '', path: ''}, {value: '首页', name: '', path: ''}],
      breadItemList: [],
      currentTitle: ''
    }
  },
  methods: {
    getBread (isreload) {
      let breadList = []
      this.breadItemList = []
      this.$route.matched.forEach((item, index) => {
        // console.log(this.$route.matched, this.$route, 'this.$route.matched')
        breadList.push({
          path: item.fullPath,
          name: item.meta.title
        })
        if (item.meta.title) {
          if (item.components.default.__file === 'src/components/common/routerview.vue') {
            this.breadItemList.push({
              value: item.meta.title
            })
          } else {
            this.breadItemList.push({
              value: item.meta.title,
              path: item.fullPath
            })
          }
        }
      })
      // console.log(this.$route.matched, 888, breadList)
      if(breadList.length > 0){
        this.breadList = breadList
        this.currentTitle = breadList[breadList.length - 1].name
      }
    }
  },
  watch: {
    $route() {
      this.getBread();
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    padding: 15px 25px 15px;
    .text{
      margin-top: 15px;
    }
  }
  .box{
    background-color: #fff;
    border-bottom: 20px solid #f0f2f5;
  }
</style>
