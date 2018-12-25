<template>
  <div class="g-listpage__style" >
    <list :isCheck="isCheck"></list>
  </div>
</template>

<script>
import list from './list'
export default {
  components: { list },
  data() {
    return {
      isCheck: true
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
