module.exports = {
    apps: [{
      name: 'orion-web-whatsapp',
      script: 'index.js', // Your entry point
      instances: 1,
      exec_mode: 'fork',
      autorestart: true, // THIS is the important part, this will tell PM2 to restart your app if it falls over
      // ignore_watch: ['node_modules'],
      max_memory_restart: '7G',
      watch: false,
      // ignore_watch: ['node_modules'],
      node_args: '--max_old_space_size=8192 --expose-gc',
    }]
  }