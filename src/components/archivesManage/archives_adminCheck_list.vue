<template>
  <div class="g-listpage__style">
    <list :isAdminCheck="isAdminCheck"></list>
  </div>
</template>

<script>
import list from './list'
export default {
  components: { list },
  data() {
    return {
      isAdminCheck: true
    };
  },
  methods: {},
  created() {},
  props: {}
};
</script>

<style lang="scss" scoped>
.g-listpage__style {
  padding-top: 10px;
}
</style>
