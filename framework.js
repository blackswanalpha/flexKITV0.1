// import { topologies } from './topologies.js';

// class LayoutFramework {
//     constructor(selector) {
//         this.app = document.querySelector(selector);
//     }

//     applyTopology(topologyName) {
//         const topology = topologies[topologyName];
//         if (topology) {
//             topology.render(this.app);
//         } else {
//             console.error(`Topology ${topologyName} not found`);
//         }
//     }
// }

// // Example of usage
// document.addEventListener('DOMContentLoaded', () => {
//     const app = new LayoutFramework('#app');
//     app.applyTopology('homepage');
// });


// core/framework.js

class Framework {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', this.handleRouteChange.bind(this));
        document.addEventListener('DOMContentLoaded', this.handleRouteChange.bind(this));
        document.addEventListener('click', (event) => {
            const { target } = event;
            if (target.tagName === 'A' && target.href && target.origin === window.location.origin) {
                event.preventDefault();
                this.navigate(target.pathname);
            }
        });
    }

    addRoute(path, callback) {
        this.routes[path] = callback;
    }

    navigate(path) {
        history.pushState(null, null, path);
        this.handleRouteChange();
    }

    handleRouteChange() {
        const path = window.location.pathname;
        if (this.routes[path]) {
            this.routes[path]();
        } else {
            console.error(`No route found for path: ${path}`);
        }
    }
}

const framework = new Framework();

export default framework;
