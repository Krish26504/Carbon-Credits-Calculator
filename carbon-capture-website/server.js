const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/calculate', (req, res) => {
    const { annualEmissions } = req.body;
    const captureRatePerDay = 1.2; // in tons
    const captureRatePerYear = captureRatePerDay * 365; // 1.2 tons/day * 365 days/year
    const potentialCredits = Math.min(annualEmissions, captureRatePerYear);
    const costPerTon = 100; // in dollars
    const plantCost = 3000000; // 3 million dollars
    const potentialRevenue = potentialCredits * costPerTon;
    const profitBy2026 = potentialRevenue - plantCost;

    res.json({
        annualEmissions,
        potentialCredits,
        potentialRevenue,
        plantCost,
        profitBy2026
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});