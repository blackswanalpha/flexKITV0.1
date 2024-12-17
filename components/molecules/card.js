import { registerComponent } from '../../componentRegistry.js';
export class Card {
    constructor(options = {}) {
        this.title = options.title || '';
        this.body = options.body || '';
        this.className = options.className || '';
        this.element = document.createElement('div');
        this.element.className = 'card ' + this.className;

    }

    render() {
        const titleEl = document.createElement('h3');
        titleEl.textContent = this.title;

          // Body
        const bodyElement = document.createElement('div');
        bodyElement.className = 'card-body';
        const bodyEl = document.createElement('p');
        bodyEl.className='card-p'
        bodyEl.textContent = this.body;
        
        
        this.element.appendChild(titleEl);
        this.element.appendChild(bodyEl);
        
        return this.element;
    }
}

registerComponent('Card', Card);