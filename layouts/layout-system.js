// layouts/layoutUtils.js
export function createBaseLayout(className, options = {}) {
    const layout = document.createElement('div');
    layout.classList.add(className);
    
    // Optional global attributes
    if (options.id) layout.id = options.id;
    if (options.className) layout.classList.add(options.className);
    
    return layout;
}

// layouts/linearLayout.js
export function createLinearLayout(options = {}) {
    const { 
        orientation = 'horizontal', 
        gap = 0, 
        alignment = 'start', 
        wrap = false 
    } = options;

    const layout = createBaseLayout('linear-layout', options);
    
    // Set orientation-specific classes
    layout.classList.add(orientation === 'vertical' ? 'vertical' : 'horizontal');
    
    // Apply additional flexbox properties
    layout.style.display = 'flex';
    layout.style.flexDirection = orientation === 'vertical' ? 'column' : 'row';
    layout.style.gap = `${gap}px`;
    layout.style.alignItems = alignment;
    layout.style.flexWrap = wrap ? 'wrap' : 'nowrap';

    return layout;
}

// layouts/relativeLayout.js
export function createRelativeLayout(options = {}) {
    const { 
        fullCover = false,
        anchor = 'top-left'
    } = options;

    const layout = createBaseLayout('relative-layout', options);
    
    // Specific positioning options
    layout.style.position = 'relative';
    
    if (fullCover) {
        layout.style.width = '100%';
        layout.style.height = '100%';
    }

    // Utility method to position child elements
    layout.positionChild = (child, position) => {
        child.style.position = 'absolute';
        
        switch (position) {
            case 'top-left':
                child.style.top = '0';
                child.style.left = '0';
                break;
            case 'top-right':
                child.style.top = '0';
                child.style.right = '0';
                break;
            case 'bottom-left':
                child.style.bottom = '0';
                child.style.left = '0';
                break;
            case 'bottom-right':
                child.style.bottom = '0';
                child.style.right = '0';
                break;
            case 'center':
                child.style.top = '50%';
                child.style.left = '50%';
                child.style.transform = 'translate(-50%, -50%)';
                break;
            default:
                // Custom positioning
                Object.entries(position).forEach(([key, value]) => {
                    child.style[key] = typeof value === 'number' ? `${value}px` : value;
                });
        }
        
        layout.appendChild(child);
        return child;
    };

    return layout;
}

// layouts/frameLayout.js
export function createFrameLayout(options = {}) {
    const { 
        padding = 0, 
        background = 'transparent',
        border = 'none'
    } = options;

    const layout = createBaseLayout('frame-layout', options);
    
    layout.style.position = 'relative';
    layout.style.width = '100%';
    layout.style.height = '100%';
    layout.style.padding = `${padding}px`;
    layout.style.background = background;
    layout.style.border = border;

    // Layer method to add elements with z-index control
    layout.addLayer = (child, zIndex = 0) => {
        child.style.position = 'absolute';
        child.style.zIndex = zIndex;
        layout.appendChild(child);
        return child;
    };

    return layout;
}

// layouts/constraintLayout.js
export function createConstraintLayout(options = {}) {
    const { 
        areas = [],
        gap = 10
    } = options;

    const layout = createBaseLayout('constraint-layout', options);
    
    layout.style.display = 'grid';
    layout.style.gap = `${gap}px`;

    // Dynamic grid template areas
    if (areas.length) {
        layout.style.gridTemplateAreas = areas.map(row => `"${row}"`).join(' ');
    }

    // Constraint placement method
    layout.placeInArea = (child, areaName) => {
        child.style.gridArea = areaName;
        layout.appendChild(child);
        return child;
    };

    return layout;
}

// layouts/tableLayout.js
export function createTableLayout(options = {}) {
    const { 
        columns = 3, 
        cellPadding = 10,
        headerStyle = {}
    } = options;

    const layout = createBaseLayout('table-layout', options);
    
    layout.style.display = 'table';
    layout.style.width = '100%';
    layout.style.borderCollapse = 'collapse';

    // Create header row method
    layout.createHeaderRow = (headers) => {
        const headerRow = document.createElement('div');
        headerRow.classList.add('table-row', 'header');

        headers.forEach(headerText => {
            const headerCell = document.createElement('div');
            headerCell.classList.add('table-cell');
            headerCell.textContent = headerText;
            
            Object.entries(headerStyle).forEach(([key, value]) => {
                headerCell.style[key] = value;
            });

            headerRow.appendChild(headerCell);
        });

        layout.appendChild(headerRow);
        return headerRow;
    };

    // Add row method
    layout.addRow = (rowData) => {
        const row = document.createElement('div');
        row.classList.add('table-row');

        rowData.forEach(cellContent => {
            const cell = document.createElement('div');
            cell.classList.add('table-cell');
            cell.textContent = cellContent;
            cell.style.padding = `${cellPadding}px`;
            row.appendChild(cell);
        });

        layout.appendChild(row);
        return row;
    };

    return layout;
}

// layouts/gridViewLayout.js
export function createGridViewLayout(options = {}) {
    const { 
        columns = 3, 
        gap = 10, 
        itemSize = '1fr',
        autoFit = false
    } = options;

    const layout = createBaseLayout('gridview-layout', options);
    
    layout.style.display = 'grid';
    layout.style.gap = `${gap}px`;

    // Dynamic column configuration
    if (autoFit) {
        layout.style.gridTemplateColumns = `repeat(auto-fit, minmax(${itemSize}, 1fr))`;
    } else {
        layout.style.gridTemplateColumns = `repeat(${columns}, ${itemSize})`;
    }

    // Method to add items dynamically
    layout.addItem = (content) => {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        
        if (typeof content === 'string') {
            item.textContent = content;
        } else if (content instanceof HTMLElement) {
            item.appendChild(content);
        }

        layout.appendChild(item);
        return item;
    };

    return layout;
}

// Export all layout creators for easy import
export default {
    createLinearLayout,
    createRelativeLayout,
    createFrameLayout,
    createConstraintLayout,
    createTableLayout,
    createGridViewLayout
};
