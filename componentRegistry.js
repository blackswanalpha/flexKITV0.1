// componentRegistry.js

const componentRegistry = {};

export function registerComponent(name, constructor) {
    if (typeof constructor !== 'function') {
        throw new Error('Constructor must be a function');
    }
    componentRegistry[name] = constructor;
}

export function getComponentConstructor(name) {
    return componentRegistry[name];
}
