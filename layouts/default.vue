<template>
  <div class="layout">
    <div class="header-wrapper">
      <header>
        <NuxtLink class="logo" to="/">
          <img src="~/assets/imgs/logo-text.png" />
        </NuxtLink>
        <div class="flex">
          <div class="github mr-2">
            <ClientOnly>
              <UTooltip text="网站源码已开源">
                <UButton
                  icon="i-uil-github"
                  color="gray"
                  variant="ghost"
                  aria-label="Theme"
                  to="https://github.com/xtthaop/zxblog-web"
                  target="_blank"
                />
              </UTooltip>
              <template #fallback>
                <div class="w-8 h-8"></div>
              </template>
            </ClientOnly>
          </div>
          <div class="theme-switcher">
            <ClientOnly>
              <UButton
                :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                color="gray"
                variant="ghost"
                aria-label="Theme"
                @click="isDark = !isDark"
              />
              <template #fallback>
                <div class="w-8 h-8"></div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </header>
    </div>
    <div class="main-wrapper">
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Layout',
})

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<style scoped lang="scss">
.layout {
  position: absolute;
  width: 100%;
  height: 100%;

  .header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    background: var(--bg);
    margin-bottom: 10px;
    z-index: 50;
    box-shadow: 0px 1px 5px var(--bg-secondary);

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 0 30px;
      max-width: 780px;
      margin: 0 auto;

      .logo {
        display: inline-block;
        height: 100%;
        padding: 10px 0;
        cursor: pointer;

        img {
          height: 100%;
        }
      }
    }
  }

  .main-wrapper {
    width: 100%;
    min-height: 100%;
    padding-top: 66px;
    background: var(--bg-secondary);

    main {
      width: 100%;
      height: 100%;
      max-width: 780px;
      margin: 0 auto;
    }
  }
}
</style>
