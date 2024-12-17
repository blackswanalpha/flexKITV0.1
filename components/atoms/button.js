import { registerComponent } from '../../componentRegistry.js';

export class Button {
    constructor({ label, className = '' } = {}) {
        this.label = label;
        this.className = className;
    }

    render() {
        const button = document.createElement('button');
        button.className = this.className;
        button.textContent = this.label;
        return button;
    }
}
registerComponent('Button', Button);
