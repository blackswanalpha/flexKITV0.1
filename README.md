Layout Framework
Overview
The Layout Framework is a versatile and extensible JavaScript library designed to help developers create complex web layouts using a combination of container, row, and column components. This framework facilitates the integration of various UI components, such as organisms, molecules, and atoms, allowing for a highly modular and maintainable codebase. The framework also supports custom components and includes an event manager for handling custom events.

Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/layout-framework.git
Navigate to the project directory:

bash
Copy code
cd layout-framework
Ensure you have a web server to serve the files. You can use simple HTTP servers like http-server or live-server for development purposes.

Structure
The framework is structured as follows:

Container: The outermost component that holds rows.
Row: Holds columns and can be styled to control layout.
Column (ColComponent): Holds the actual content, including organisms, molecules, and atoms. Supports layout options.
Usage
HTML Structure
Include the necessary CSS and JavaScript files in your HTML file:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    <link rel="stylesheet" href="css/typography.css">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/grid.css">
</head>
<body>
    <div id="app"></div>
    <script type="module" src="main.js"></script>
</body>
</html>
JavaScript Structure
main.js
Initialize the framework and apply the desired topology:

javascript
Copy code
import { topologies } from './topologies.js';
import eventManager from './eventManager.js';

class LayoutFramework {
    constructor(selector) {
        this.app = document.querySelector(selector);
    }

    applyTopology(topologyName) {
        const topology = topologies[topologyName];
        if (topology) {
            topology.render(this.app);
        } else {
            console.error(`Topology ${topologyName} not found`);
        }
    }
}

// Example of usage
document.addEventListener('DOMContentLoaded', () => {
    const app = new LayoutFramework('#app');
    app.applyTopology('homepage');

    eventManager.on('buttonClick', data => {
        console.log('Event received:', data);
    });

    eventManager.on('customButtonClick', data => {
        console.log('Custom Button Event received:', data);
    });
});
topologies.js
Define the topologies, specifying the layout and components:

javascript
Copy code
import { Container, Row, ColComponent } from './grid.js';
import eventManager from './eventManager.js';
import './componentRegistry.js'; // Ensure components are registered

class Topology {
    constructor(name) {
        this.name = name;
        this.structure = [];
    }

    Container({ containerClassName = '', rowClassName = '', layout = [], Col = {} }) {
        const container = new Container({ className: containerClassName });
        const row = new Row({ className: rowClassName });

        const col = new ColComponent({ className: Col.className, layout: Col.layout || [] });

        if (Col.layout) {
            Col.layout.forEach(layoutType => {
                col.addLayout(layoutType);
            });
        }

        if (Col.organism) {
            Col.organism.forEach(org => {
                col.addComponentOrganisms(org.type, org);
            });
        }

        if (Col.molecule) {
            Col.molecule.forEach(mol => {
                col.addComponentMolecules(mol.type, mol);
            });
        }

        if (Col.atoms) {
            Col.atoms.forEach(atom => {
                col.addComponentAtoms(atom.type, atom);
            });
        }

        row.addChild(col);
        container.addChild(row);

        this.structure.push(container);
        return this;
    }

    render(parentElement) {
        this.structure.forEach(component => {
            if (component.render) {
                parentElement.appendChild(component.render());
            } else {
                console.error('Component does not have a render method:', component);
            }
        });
    }
}

// Example Topology
export const topologies = {
    homepage: new Topology('homepage')
        .Container({
            containerClassName: 'main-container',
            rowClassName: 'main-row',
            layout: ['relative'],
            Col: {
                className: 'md-4',
                layout: ['some-layout'],
                organism: [
                    {
                        type: 'navbar',
                        items: [
                            { text: 'Home', href: '#' },
                            { text: 'About', href: '/about' }
                        ]
                    },
                    {
                        type: 'form',
                        fields: [
                            { name: 'username', label: 'Username', type: 'text' }
                        ]
                    }
                ],
                molecule: [
                    {
                        type: 'card',
                        title: 'Welcome',
                        body: 'This is the homepage',
                        atoms: [
                            {
                                type: 'button',
                                label: 'Click Me',
                                className: 'btn-primary',
                                onClick: () => {
                                    console.log('Button clicked');
                                    eventManager.emit('buttonClick', { message: 'Button was clicked' });
                                }
                            }
                        ]
                    }
                ],
                atoms: [
                    {
                        type: 'button',
                        label: 'Click Me',
                        className: 'btn-primary',
                        onClick: () => {
                            console.log('Button clicked');
                            eventManager.emit('buttonClick', { message: 'Button was clicked' });
                        }
                    },
                    {
                        type: 'customButton',
                        label: 'Custom Button',
                        className: 'btn-secondary',
                        onClick: () => {
                            console.log('Custom Button clicked');
                            eventManager.emit('customButtonClick', { message: 'Custom Button was clicked' });
                        }
                    }
                ]
            }
        })
};
grid.js
Define the basic grid components:

javascript
Copy code
export class Container {
    constructor({ className = '' }) {
        this.className = className;
        this.children = [];
    }

    addChild(child) {
        if (child.render) {
            this.children.push(child);
        } else {
            console.error('Child does not have a render method:', child);
        }
    }

    render() {
        const container = document.createElement('div');
        container.className = this.className;
        this.children.forEach(child => {
            container.appendChild(child.render());
        });
        return container;
    }
}

export class Row {
    constructor({ className = '' }) {
        this.className = className;
        this.children = [];
    }

    addChild(child) {
        if (child.render) {
            this.children.push(child);
        } else {
            console.error('Child does not have a render method:', child);
        }
    }

    render() {
        const row = document.createElement('div');
        row.className = this.className;
        this.children.forEach(child => {
            row.appendChild(child.render());
        });
        return row;
    }
}

export class ColComponent {
    constructor({ className = '', layout = [] }) {
        this.className = className;
        this.children = [];
        this.layout = layout; // Store layout options
    }

    addChild(child) {
        if (child.render) {
            this.children.push(child);
        } else {
            console.error('Child does not have a render method:', child);
        }
    }

    addLayout(layoutType) {
        this.layout.push(layoutType);
    }

    render() {
        const col = document.createElement('div');
        col.className = this.className;

        // Apply layout classes
        this.layout.forEach(layoutType => {
            col.classList.add(layoutType);
        });

        this.children.forEach(child => {
            col.appendChild(child.render());
        });
        return col;
    }
}
eventManager.js
Define the event manager to handle custom events:

javascript
Copy code
class EventManager {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

const eventManager = new EventManager();
export default eventManager;
Custom Components
To allow developers to integrate custom components, ensure that they follow the structure and implement the render method. Register custom components in componentRegistry.js.

Conclusion
The Layout Framework is designed to simplify the process of building complex layouts while maintaining flexibility and modularity. By following the provided structure and guidelines, developers can easily integrate and customize components to create dynamic and responsive web applications.
