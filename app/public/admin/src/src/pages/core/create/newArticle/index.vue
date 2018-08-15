<template>
  <d2-container type="full" class="page">
    <articleForm>
    </articleForm>
  </d2-container>
</template>

<script>
import articleForm from '@/components/common/articleForm'
export default {
  components: {
    articleForm
  },
  data () {
    return {
      isDraft: false
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>

</style>