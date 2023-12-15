// Declare chart variable outside the displayChart function to keep track of the chart instance
let myFDChart;

function calculateFD() {
    const principalAmount = parseFloat(document.getElementById('principalAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const tenure = parseInt(document.getElementById('tenure').value) || 0;

    if (isNaN(principalAmount) || isNaN(interestRate) || tenure === 0) {
        alert('Please enter valid input values.');
        return;
    }

    const ratePerPeriod = interestRate / 100;
    const maturityAmount = principalAmount * Math.pow(1 + ratePerPeriod, tenure);
    const interestEarned = maturityAmount - principalAmount;

    displayResult(maturityAmount.toFixed(2), interestEarned.toFixed(2));
    displayChart(principalAmount, interestEarned);
}

function displayResult(maturityAmount, interestEarned) {
    const resultContainer = document.getElementById('result');
    const formattedMaturityAmount = formatCurrency(maturityAmount);
    const formattedInterestEarned = formatCurrency(interestEarned);

    const resultText = `
        <p>Maturity Amount: <b>₹${formattedMaturityAmount}</b></p>
        <p>Interest Earned: <b>₹${formattedInterestEarned}</b></p>
        <p>Made with 💙 by Supratim</p>
    `;

    resultContainer.innerHTML = resultText;
    resultContainer.style.display = 'block';
}

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayChart(principalAmount, interestEarned) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (myFDChart) {
        myFDChart.destroy();
    }

    // Create a new chart instance
    myFDChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal Amount', 'Interest Earned'],
            datasets: [{
                data: [principalAmount, interestEarned],
                backgroundColor: ['#b1f202', '#00aeff'],
            }],
        },
    });
}
