// Initialize variables to store selected start gates, rest stops, and end gates
let selectedStartGate = null;
let selectedRestStop = null; 
let selectedEndGate = null;

// Speed Variable
let speed = 0;

// Lock Status
let lock_status = 0;

function selectGate(id, isStartGate) {
    if (isStartGate) {
        if (selectedStartGate) {
            document.getElementById(selectedStartGate).style.backgroundColor = "rgb(76, 76, 76)";
        }
        selectedStartGate = id;
        document.getElementById(id).style.backgroundColor = "rgb(232, 105, 144)";
    } else {
        if (selectedEndGate) {
            document.getElementById(selectedEndGate).style.backgroundColor = "rgb(76, 76, 76)";
        }
        selectedEndGate = id;
        document.getElementById(id).style.backgroundColor = "rgb(171, 141, 72)";
    }
    updatePlot();
}

function selectRestStop(id) {
    if (selectedRestStop) {
        document.getElementById(selectedRestStop).style.backgroundColor = "rgb(76, 76, 76)";
    }
    selectedRestStop = id;
    document.getElementById(id).style.backgroundColor = "rgb(107, 172, 236)";
    updatePlot();
}

function updatePlot() {
    const gatePositions = {
        'gate-A': { x: 1, y: 4 },
        'gate-B': { x: 1, y: 3 },
        'gate-C': { x: 1, y: 2 },
        'gate-D': { x: 1, y: 1 },
        'stop-A': { x: 2, y: 4 },
        'stop-B': { x: 2, y: 3 },
        'stop-C': { x: 2, y: 2 },
        'stop-D': { x: 2, y: 1 },
        'gate-E': { x: 3, y: 4 },
        'gate-F': { x: 3, y: 3 },
        'gate-G': { x: 3, y: 2 },
        'gate-H': { x: 3, y: 1 },
    };

    const startMarker = {
        x: [1, 1, 1, 1],
        y: [1, 2, 3, 4],
        marker: { color: ['#D81B60', '#D81B60', '#D81B60', '#D81B60'], size: [12, 12, 12, 12] },
        mode: 'markers+text',
        text: ['Gate D', 'Gate C', 'Gate B', 'Gate A'],
        textposition: 'top',
        hoverinfo: 'none'
    };
    
    const restMarker = {
        x: [2, 2, 2, 2],
        y: [1, 2, 3, 4],
        marker: { color: ['#1E88E5', '#1E88E5', '#1E88E5', '#1E88E5'], size: [12, 12, 12, 12] },
        mode: 'markers+text',
        text: ['Lounge', 'Help Desk', 'Bathroom', 'Shake Shack'],
        textposition: 'top',
        hoverinfo: 'none'
    };

    const endMarker = {
        x: [3, 3, 3, 3],
        y: [1, 2, 3, 4],
        marker: { color: ['#AB8D48', '#AB8D48', '#AB8D48', '#AB8D48'], size: [12, 12, 12, 12] },
        mode: 'markers+text',
        text: ['Gate H', 'Gate G', 'Gate F', 'Gate E'],
        textposition: 'top',
        hoverinfo: 'none'
    };

    if (selectedStartGate) {
        const index = ['gate-D', 'gate-C', 'gate-B', 'gate-A'].indexOf(selectedStartGate);
        startMarker.marker.color[index] = 'black';
        startMarker.marker.size[index] = 20;
    }

    if (selectedRestStop) {
        const index = ['stop-D', 'stop-C', 'stop-B', 'stop-A'].indexOf(selectedRestStop);
        restMarker.marker.color[index] = 'black';
        restMarker.marker.size[index] = 20;
    }

    if (selectedEndGate) {
        const index = ['gate-H', 'gate-G', 'gate-F', 'gate-E'].indexOf(selectedEndGate);
        endMarker.marker.color[index] = 'black';
        endMarker.marker.size[index] = 20;
    }

    const lineData = [];
    if (selectedStartGate && selectedRestStop) {
        lineData.push({
            x: [gatePositions[selectedStartGate].x, gatePositions[selectedRestStop].x],
            y: [gatePositions[selectedStartGate].y, gatePositions[selectedRestStop].y],
            mode: 'lines',
            line: { color: 'black', width: 3 }
        });
    }

    if (selectedRestStop && selectedEndGate) {
        lineData.push({
            x: [gatePositions[selectedRestStop].x, gatePositions[selectedEndGate].x],
            y: [gatePositions[selectedRestStop].y, gatePositions[selectedEndGate].y],
            mode: 'lines',
            line: { color: 'black', width: 3 }
        });
    } else if (selectedStartGate && selectedEndGate && !selectedRestStop) {
        lineData.push({
            x: [gatePositions[selectedStartGate].x, gatePositions[selectedEndGate].x],
            y: [gatePositions[selectedStartGate].y, gatePositions[selectedEndGate].y],
            mode: 'lines',
            line: { color: 'black', width: 3 }
        });
    }

    const data = [startMarker, restMarker, endMarker, ...lineData];

    const layout = {
        title: {
            text: 'Map of Airport',
            font: { size: 18, color: '#333', family: 'Arial', weight: 'bold' },
            x: 0.5,
            xanchor: 'center',
            y: 0.95
        },
        showlegend: false,
        paper_bgcolor: 'rgb(223, 223, 223)', // Background color of the entire plot
        plot_bgcolor: 'rgb(223, 223, 223)',  // Background color of the plotting area
        xaxis: { showgrid: false, showline: false, zeroline: false, showticklabels: false },
        yaxis: { showgrid: false, showline: false, zeroline: false, showticklabels: false },
        margin: {
            t: 60,
            b: 20
        }
    };

    Plotly.newPlot('map', data, layout);
}


function resetPlot() {
    selectedStartGate = null;
    selectedEndGate = null;
    selectedRestStop = null;
    ['gate-A', 'gate-B', 'gate-C', 'gate-D', 'gate-E', 'gate-F', 'gate-G', 'gate-H', 'stop-A', 'stop-B', 'stop-C', 'stop-D'].forEach(id => {
        document.getElementById(id).style.backgroundColor = "black";
    });
    updatePlot();
}

function toggleMovement(){
    var button = document.querySelector('.robot-start-stop-button');
    if (button.innerHTML === 'Start'){
        button.innerHTML = 'Stop';
        button.style.backgroundColor = '#ed3d3d';
    } else {
        button.innerHTML = 'Start';
        button.style.backgroundColor = '#2da745';
    }
}

function toggleLock(){
    var button = document.querySelector('.robot-lock-unlock-button');
    if (button.innerHTML === 'Unlocked'){
        button.innerHTML = 'Locked'
        button.style.backgroundColor = '#b7b7c2';
    } else {
        button.innerHTML = 'Unlocked';
        button.style.backgroundColor = '#9ac2fe';
    }
}

function toggleSiren(){
    var button = document.querySelector('.robot-siren-button');
    if (button.innerHTML === 'Off'){
        button.innerHTML = 'On'
        button.style.backgroundColor = '#ffaf0f';
    } else {
        button.innerHTML = 'Off';
        button.style.backgroundColor = '#b7b7c2';
    }
}

function increaseSpeed(){
    if (speed < 5) {
        speed = speed + 1;
    }
    updateSpeed();
}

function decreaseSpeed(){
    if (speed > 0) {
        speed = speed - 1;
    }
    updateSpeed();
}

function updateSpeed() {
    let speed_display = document.getElementsByClassName("speed-label");
    speed_display[0].textContent = "Speed: " + speed + "mph";
}

function calculateDistance() {
    
}

document.addEventListener('DOMContentLoaded', updatePlot);