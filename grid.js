export class Container {
    constructor({ className = '' } = {}) {
        this.element = document.createElement('div');
        this.element.className = `container ${className}`;
    }

    addChild(child) {
        if (child && child.render) {
            this.element.appendChild(child.render());
        } else {
            console.error('Child does not have a render method:', child);
        }
    }

    render() {
        return this.element;
    }
}

export class Row {
    constructor({ className = '' } = {}) {
        this.element = document.createElement('div');
        this.element.className = `row ${className}`;
    }

    addChild(child) {
        if (child && child.render) {
            this.element.appendChild(child.render());
        } else {
            console.error('Child does not have a render method:', child);
        }
    }

    render() {
        return this.element;
    }
}

export class Col {
    constructor({ className = '' } = {}) {
        this.element = document.createElement('div');
        this.element.className = `col ${className}`;
    }

    addComponent(component) {
        if (component && component.render) {
            this.element.appendChild(component.render());
        } else {
            console.error('Component does not have a render method:', component);
        }
    }

    render() {
        return this.element;
    }
}