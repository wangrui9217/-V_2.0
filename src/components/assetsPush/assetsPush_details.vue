<template>
  <div>
	  <assetsPushSupplement :isDetails="isDetails"></assetsPushSupplement>
  </div>
</template>

<script>
  import assetsPushSupplement from './assetsPush_supplement'

  export default {
    components: { assetsPushSupplement },
    data () {
      return {
        isDetails: true
      }
    },
    methods: {},
    props: {},
    created () {},
    mounted () {

    },
    filters: {},
    computed: {},
    watch: {}
  }
</script>

<style lang="scss" scoped>
</style>
