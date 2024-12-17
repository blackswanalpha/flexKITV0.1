// customComponents.js

import { registerComponent } from './componentRegistry.js';

class CustomButton {
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

// Register the custom button component
registerComponent('customButton', CustomButton);
