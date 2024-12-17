// topology.js
import { Container, Row, Col } from './grid.js';
import './customComponents.js'; // Import custom components to register them
import {ColComponent} from './ColComponent.js'
class Topology {
    constructor(name) {
        this.name = name;
        this.structure = [];
    }

    Container({ containerClassName = '', rowClassName = '', layout = [], Col = {} }) {
        const container = new Container({ className: containerClassName });
        const row = new Row({ className: rowClassName });

        const col = new ColComponent({ className: Col.className });

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
// export const topologies = {
//     homepage: new Topology('homepage')
//         .Container({
//             containerClassName: 'main-container',
//             rowClassName: 'main-row',
//             layout: ['relative'],
//             Col: {
//                 className: 'md-4',
//                 layout: ['col-md-4'],  // Example layout class
//                 organism: [
//                     { type: 'navbar', items: [{ text: 'Home', href: '#' }, { text: 'About', href: '/about' }] },
//                     { type: 'form', fields: [{ name: 'username', label: 'Username', type: 'text' }] },
//                 ],
//                 molecule: [
//                     {
//                         type: 'card',
//                         title: 'Welcome',
//                         body: 'This is the homepage',
//                         atom: [{ label: 'Click Me', className: 'btn-primary' }],
//                         atom: [
//                             { type: 'button', label: 'Click Me', className: 'btn-primary' },
//                             { type: 'button', label: 'Custom Button', className: 'btn-secondary' },
//                 ]},
//                 ],
//                 atoms: [
//                     { type: 'button', label: 'Click Me', className: 'btn-primary' },
//                     { type: 'button', label: 'Custom Button', className: 'btn-secondary' },
//                 ],
//             },
//         })
//         .Container({
//             containerClassName: 'main-container',
//             rowClassName: 'main-row',
//             layout: ['relative'],
//             Col: {
//                 className: 'md-4',
//                 layout: ['col-md-4'],  // Example layout class
//                 organism: [
//                     { type: 'navbar', items: [{ text: 'Home', href: '#' }, { text: 'About', href: '/about' }] },
//                     { type: 'form', fields: [{ name: 'username', label: 'Username', type: 'text' }] },
//                 ],
//                 molecule: [
//                     {
//                         type: 'card',
//                         title: 'Welcome',
//                         body: 'This is the homepage',
//                         atom: [{ label: 'Click Me', className: 'btn-primary' }],
//                         atom: [
//                             { type: 'button', label: 'Click Me', className: 'btn-primary' },
//                             { type: 'button', label: 'Custom Button', className: 'btn-secondary' },
//                 ]},
//                 ],
//                 atoms: [
//                     { type: 'button', label: 'Click Me', className: 'btn-primary' },
//                     { type: 'button', label: 'Custom Button', className: 'btn-secondary' },
//                 ],
//             },
//         })
// };

export default Topology;