<template>
  <el-row :class="{'empty-box':isLoading}" v-loading="isLoading" class="box">
    <template v-for="(item ,index) in data">
      <el-col :key="index" class="inner" :span="item.span||8">
        <label class="label"  :style="{width: labelWidth}" :class="{'is-important': item.important}">{{item.label}}</label>
        <div class="value">{{item.value && item.value !== 'undefined' ? item.value : ''}}</div>
      </el-col>
    </template>
  </el-row>
</template>

<script>
  export default {
    name: 'commonBox',
    data () {
      return {
      }
    },
    methods: {
    },
    props: {
      data: {
        default: [{label: '标题', value: '内容'}],
        type: Array
      },
      isLoading: {
        default: false,
        type: Boolean
      },
      labelWidth: {
        type: String,
        default: '120px'
      }
    },
    mounted () {},
    components: {},
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .empty-box{min-height: 100px;}
  .is-important:before{content: "*";
    color: #f56c6c;
    margin-right: 4px;}
  .box{
    color: #606266;
    padding: 20px 20px 0 20px;
    display: flex;
    flex-wrap: wrap;
    .inner{
      display: flex;
      margin-bottom: 20px;
      padding-right: 20px;
      .label{
        /*text-align: right;*/
        padding-right: 12px;
      }
      .value{
        flex: 1;
        word-break: break-word;
      }
    }
  }
</style>
