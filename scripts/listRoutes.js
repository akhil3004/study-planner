// Script to list all registered routes in the application
const app = require('../app');

// Function to get all registered routes
function listRoutes() {
  const routes = [];
  
  // Get all registered routes
  app._router.stack.forEach(function(middleware) {
    if (middleware.route) {
      // Routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        method: Object.keys(middleware.route.methods)[0].toUpperCase()
      });
    } else if (middleware.name === 'router') {
      // Routes registered on a router middleware
      middleware.handle.stack.forEach(function(handler) {
        if (handler.route) {
          const routePath = handler.route.path;
          const baseUrl = middleware.regexp.toString()
            .replace('\\^', '')
            .replace('\\/?(?=\\/|$)', '')
            .replace(/\\\//g, '/');
            
          const path = baseUrl.replace(/\(\?:\(\[\^\\\/]\+\?\)\)/g, ':param')
            .replace(/\(\?:\(\[\\w\\d-]+\?\)\)/g, ':param')
            .replace('(?:/(?=$))', '')
            .replace(/\/\?/g, '')
            .replace(/\\/g, '')
            .replace(/\(\?:\(\[\^\/]\+\?\)\)/g, ':param') + routePath;
            
          routes.push({
            path,
            method: Object.keys(handler.route.methods)[0].toUpperCase()
          });
        }
      });
    }
  });
  
  return routes;
}

// Get all routes and print them
const routes = listRoutes();
console.log('========== REGISTERED ROUTES ==========');
routes.sort((a, b) => a.path.localeCompare(b.path));
routes.forEach(route => {
  console.log(`${route.method} ${route.path}`);
});
console.log('=======================================') 