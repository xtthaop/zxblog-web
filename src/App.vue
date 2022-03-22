<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from '@/layout'
export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
*{
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

.katex {
  font: 400 1.1em KaTeX_Main !important;
}
</style>
