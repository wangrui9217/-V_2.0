<template>
  <div>
    <approve-index :already="true"></approve-index>
  </div>
</template>

<script>
  import approveIndex from './index'
  export default {
    data () {
      return {
      }
    },
    methods: {
    },
    props: {},
    mounted () {},
    components: {approveIndex},
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
