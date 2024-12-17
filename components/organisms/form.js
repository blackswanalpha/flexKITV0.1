import { registerComponent } from '../../componentRegistry.js';
export class Form {
    constructor({ fields = [], className = '' } = {}) {
        this.fields = fields;
        this.className = className;
    }

    render() {
        const form = document.createElement('form');
        form.className = this.className;

        this.fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;
            const input = document.createElement('input');
            input.name = field.name;
            input.type = field.type;
            form.appendChild(label);
            form.appendChild(input);
        });

        return form;
    }
}
