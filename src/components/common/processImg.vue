<template>
  <div class="main">
    <img class="process_img" v-bind:src="imgSrc" />
  </div>
</template>
<style>
</style>
<script>
import { workController } from '@/controller/common/work_controller';
export default {
    data() {
      return {
        url: "",
        loading: false,
        html: "",
        imgSrc:""
      };
    },
    created(){
      this.imgSrc = workController.wfServiceUrl +"/api/process/images?executionId=" +this.$route.query.processInstanceId;
    }
    ,
    mounted() {
    },
    methods: {

    }
};
</script>
<style scoped lang="scss">
  .main{
    text-align: center
  }
  .process_img{
    background-size: 20px 20px;
    background-position: 0px 0px, 10px 10px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
    cursor: zoom-in;
  }
</style>
