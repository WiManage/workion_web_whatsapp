module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'MANUEL_WHATSAPP',
      script: 'index.js',
      instances: '1',
      exec_mode: 'fork',
      max_memory_restart: '4G',
      watch: false,
      ignore_watch: ['node_modules'],
      node_args: '--max_old_space_size=8192 --expose-gc',
    },
  ],
};
