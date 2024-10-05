module.exports = {
  apps: [
    {
      name: 'zxblog',
      port: '3090',
      instances: 1,
      script: './.output/server/index.mjs',
    },
  ],
}
