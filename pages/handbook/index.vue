<template>
  <app-page>
    handbook page
  </app-page>
</template>

<script>
import AppPage from '@/components/basic/AppPage'

export default {
  layout: 'default',
  // async asyncData ({ store }) {
  //   await store.dispatch('foodCalorieTable/getAllProducts')
  // },
  components: {
    AppPage
  }
}
</script>
