<template>
  <NuxtLoadingIndicator
    color="repeating-linear-gradient(to right, #31ccea 0%, #319bea 50%, #0969f5 100%)"
  />
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const appName = '知行'
useHead({
  titleTemplate: (title) => {
    return title ? `${appName} - ${title}` : appName
  },
})
</script>
