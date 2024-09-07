<template>
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
