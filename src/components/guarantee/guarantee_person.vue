<template>
  <div>
    <borrower-info :isDisabled="isDisabled" :isCustomer="false" :id="id"></borrower-info>
  </div>
</template>

<script>
import borrowerInfo from './../customerEntry/borrower_info'
export default {
  components: {borrowerInfo},
  data() {
    return {
      loading: false,
    };
  },
  computed: {

  },
  methods: {

  },
  mounted() {
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
