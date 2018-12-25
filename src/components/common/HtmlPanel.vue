<template>
 <div>
  <!-- <mu-circular-progress :size="40" v-if="loading"/> -->
  <!-- <div v-html="html"></div> -->
  <iframe :src="this.url" width="100%" height="800"></iframe>
 </div>
</template>
<style>
</style>
<script>
import axios from "axios";
import { baseURL } from "@/config";
export default {
  data() {
    return {
      url: "",
      loading: false,
      html: ""
    };
  },
  mounted() {
    this.url = baseURL + "/druid/sql.html";
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.formula-form {
  width: 200px;
  margin-right: 20px;
}
.actions {
  color: #1890FF;
  button {
    color: #1890FF;
    border: none;
    background: none;
    cursor: pointer;
    outline: none;
    &[disabled] {
      cursor: no-drop;
      color: #999;
    }
  }
}
</style>