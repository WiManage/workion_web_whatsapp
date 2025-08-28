module.exports = {
    apps: [{
      name: 'workion-web-whatsapp',
      script: 'index.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '7G',
      watch: false,
      node_args: '--max_old_space_size=8192 --expose-gc',
    }]
  }