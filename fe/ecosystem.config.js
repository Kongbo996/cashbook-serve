module.exports = {
  apps: [
    {
      name: 'cashbook-vite-h5',
      script: 'cashbook-vite-h5-server.js'
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '81.68.165.190',
      ref: 'origin/main',
      repo: 'git@github.com:Kongbo996/cashbook-serve.git',
      path: '/cashbook-serve/fe',
      'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && npm run build && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}