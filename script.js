let ballNumber = 1; // Initialize ball number
let totalRuns = 0; // Initialize total runs
let totalBalls = 0; // Initialize total balls for overs
let currentOver = 1; // Initialize current over
let overs; // Store the number of overs
let firstBallOfOver = true; // Track the first ball of the current over

// Function to get the correct suffix for the over
function getOverSuffix(over) {
    if (over % 10 === 1 && over % 100 !== 11) {
        return "st";
    } else if (over % 10 === 2 && over % 100 !== 12) {
        return "nd";
    } else if (over % 10 === 3 && over % 100 !== 13) {
        return "rd";
    } else {
        return "th";
    }
}

// Event listener for setting the number of overs
document.getElementById('setOversButton').addEventListener('click', () => {
    const oversInput = document.getElementById('oversInput'); // Get the overs input field
    overs = parseInt(oversInput.value); // Parse the input value as an integer

    // Validate the input for overs
    if (isNaN(overs) || overs < 1) {
        alert('Please enter a valid number of overs (1 or more).'); // Alert for invalid input
        return; // Exit the function
    }

    totalBalls = overs * 6; // Calculate total balls based on overs
    document.getElementById('scoreTable').style.display = 'block'; // Show the score table
    document.getElementById('runInput').style.display = 'block'; // Show the runs input field
    document.getElementById('updateScoreButton').style.display = 'block'; // Show the update button
    document.getElementById('totalScore').style.display = 'block'; // Show total score heading
    document.getElementById('oversInputSection').style.display = 'none'; // Hide overs input section

    // Display the initial current over
    document.getElementById('currentOverDisplay').textContent = `Current Over: ${currentOver}${getOverSuffix(currentOver)} Over`;
});

// Event listener for updating the score
document.getElementById('updateScoreButton').addEventListener('click', () => {
    const runInput = document.getElementById('runInput'); // Get the input field
    const runs = parseInt(runInput.value); // Parse the input value as an integer

    // Validate the input for runs
    if (isNaN(runs) || runs < 0 || runs > 6) {
        alert('Please enter a valid number of runs (0-6).'); // Alert for invalid input
        return; // Exit the function
    }

    const tableBody = document.getElementById('scoreTable').getElementsByTagName('tbody')[0]; // Get the table body

    // Format the ball number (e.g., 1.1, 1.2, ..., 2.1, 2.2, ...)
    const formattedBallNumber = `${currentOver}.${ballNumber}`;

    // Add new row to the table
    const newRow = tableBody.insertRow(); // Insert a new row
    const ballCell = newRow.insertCell(0); // Insert cell for ball number
    const runsCell = newRow.insertCell(1); // Insert cell for runs
    ballCell.textContent = formattedBallNumber; // Set formatted ball number
    runsCell.textContent = runs; // Set runs

    // Update total runs
    totalRuns += runs; // Add runs to total
    document.getElementById('totalScore').textContent = `Total Score: ${totalRuns}`; // Update total score display

    // Increment ball number
    ballNumber++;

    // Check if over is completed
    if (ballNumber > 6) {
        ballNumber = 1; // Reset ball number for the next over
        currentOver++; // Move to the next over
        document.getElementById('currentOverDisplay').textContent = `Current Over: ${currentOver}${getOverSuffix(currentOver)} Over`; // Update current over display
    }

    // Disable button after total balls are reached
    if ((currentOver - 1) * 6 + ballNumber > totalBalls) {
        document.getElementById('updateScoreButton').disabled = true; // Disable button
        document.getElementById('currentOverDisplay').textContent = `Overs Completed`; // Display overs completed
        alert('End of overs! Total Score: ' + totalRuns); // Alert end of overs
    }

    // Clear input field
    runInput.value = ''; // Clear input for next entry
});
