import { getComponentConstructor } from './componentRegistry.js';

export class ColComponent {
    constructor({ className = '' } = {}) {
        this.element = document.createElement('div');
        this.element.className = `col ${className}`;
    }

    addLayout(layoutType) {
        this.element.classList.add(layoutType);
    }

    addComponentOrganisms(type, options) {
        this.addComponent(type, options, 'organism');
    }

    addComponentMolecules(type, options) {
        if (options.atoms) {
            const moleculeElement = document.createElement('div');
            const Constructor = getComponentConstructor(type);

            if (Constructor) {
                const component = new Constructor(options);
                if (component && component.render) {
                    moleculeElement.appendChild(component.render());
                } else {
                    console.error(`Molecule component does not have a render method:`, component);
                }
            } else {
                console.error(`Molecule component not found: ${type}`);
                return;
            }

            options.atoms.forEach(atom => {
                const atomConstructor = getComponentConstructor(atom.type);
                if (atomConstructor) {
                    const atomComponent = new atomConstructor(atom);
                    if (atomComponent && atomComponent.render) {
                        moleculeElement.appendChild(atomComponent.render());
                    } else {
                        console.error(`Atom component does not have a render method:`, atomComponent);
                    }
                } else {
                    console.error(`Atom component not found: ${atom.type}`);
                }
            });

            this.element.appendChild(moleculeElement);
        } else {
            this.addComponent(type, options, 'molecule');
        }
    }

    addComponentAtoms(type, options) {
        this.addComponent(type, options, 'atom');
    }

    addComponent(type, options, componentType) {
        const Constructor = getComponentConstructor(type);
        if (Constructor) {
            const component = new Constructor(options);
            if (component && component.render) {
                this.element.appendChild(component.render());
            } else {
                console.error(`${componentType} component does not have a render method:`, component);
            }
        } else {
            console.error(`${componentType} component not found: ${type}`);
        }
    }

    render() {
        return this.element;
    }
}
