/**
 * Middleware Configuration File
 */

module.exports = {
     settings: {
          cors: {
               enabled: true,
               origin: ["http://localhost:3000", "http://localhost:1337", "http://0.0.0.0:1337", "http://0.0.0.0:3000", "https://abd.bcariaga.me", "https://abdapi.bcariaga.me", "http://192.168.1.240:3000", "http://192.168.1.240:1337"]
          }
     }
}