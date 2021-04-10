/**
 * Strapi Base Configuration File
 */

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'befac650e55d194995d6a50547310634'),
    },
  },
  url: env('API_URL', 'http://localhost:1337')
});
