// layouts/grid-view.js
class GridView {
    constructor(rows) {
        this.grid = document.createElement('div');
        this.grid.className = 'grid-view';

        rows.forEach(row => {
            let rowDiv = document.createElement('div');
            rowDiv.className = 'grid-row';
            row.forEach(cell => {
                let cellDiv = document.createElement('div');
                cellDiv.className = 'grid-cell';
                cellDiv.innerText = cell;
                rowDiv.appendChild(cellDiv);
            });
            this.grid.appendChild(rowDiv);
        });
    }

    render(parent) {
        parent.appendChild(this.grid);
    }
}
export default GridView;
