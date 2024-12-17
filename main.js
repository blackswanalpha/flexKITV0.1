// main/main.js

import framework from './framework.js';
import initHomepage from './homepage.js';
//import initAboutPage from './about.js'; // Assuming an about.js file is also defined

// Register routes
framework.addRoute('/', initHomepage);
//framework.addRoute('/about', initAboutPage);

// Initialize the application by navigating to the current path
framework.handleRouteChange();
