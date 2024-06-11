document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emissionForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const annualEmissions = document.getElementById('annualEmissions').value;

        fetch('/api/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ annualEmissions: parseFloat(annualEmissions) })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultAnnualEmissions').textContent = data.annualEmissions;
            document.getElementById('resultPotentialCredits').textContent = data.potentialCredits;
            document.getElementById('resultPotentialRevenue').textContent = data.potentialRevenue;
            document.getElementById('resultPlantCost').textContent = data.plantCost;
            document.getElementById('resultProfitBy2026').textContent = data.profitBy2026;
            document.getElementById('results').style.display = 'block';
            createChart(data);
        })
        .catch(error => console.error('Error:', error));
    });
});

function createChart(data) {
    const ctx = document.getElementById('emissionsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Annual Emissions', 'Potential Carbon Credits'],
            datasets: [
                {
                    label: 'Tons',
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                    borderWidth: 1,
                    data: [data.annualEmissions, data.potentialCredits]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#f8f9fa'
                    }
                },
                x: {
                    ticks: {
                        color: '#f8f9fa'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#f8f9fa'
                    }
                }
            }
        }
    });
}