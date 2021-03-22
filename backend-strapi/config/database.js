module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '192.168.1.240'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'abd_looking_for_group'),
        username: env('DATABASE_USERNAME', 'braden'),
        password: env('DATABASE_PASSWORD', 'bcbest'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
