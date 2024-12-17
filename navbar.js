import { registerComponent } from './componentRegistry.js';
export class Navbar {
    constructor(options = {}) {
        this.items = options.items || [];
        this.element = document.createElement('nav');
        this.element.className = 'navbar ' + (options.className || '');
    }

    render() {
        const ul = document.createElement('ul');
        this.items.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            li.appendChild(a);
            ul.appendChild(li);
        });
        this.element.appendChild(ul);
        return this.element;
    }
}

registerComponent('NavBar', Navbar);