// main/homepage.js

import Topology from './topologies.js';

// Import the required components
import { Container, Row, Col } from './grid.js';
import './components/atoms/button.js'
import './components/molecules/card.js'
import './navbar.js'

// Function to initialize the homepage
function initHomepage() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear existing content

    const homepage = new Topology('homepage')
        .Container({
            containerClassName: 'container',
            rowClassName: 'row',
            layout: ['relative'],
            Col: {
                className: 'md-4',
                layout: ['col-md-4'], // Example layout class
               
                molecule: [
                    {
                        type:'Card',
                        className:'cardew',
                        title: 'Welcome',
                        body: 'This is the homepage',
                        atoms: [
                            {type: 'Button', label: 'Click Me', className: 'btn-primary' },
                            { type: 'Button',label: 'Custom Button', className: 'btn-secondary' },
                            
                        ]
                    }
                ],
                atoms: [
                    {type: 'Button', label: 'Click Me', className: 'btn-primary' },
                    { type: 'Button',label: 'Custom Button', className: 'btn-secondary' },
                    
                ]
               
            }
        });

    homepage.render(app);
}

export default initHomepage;
