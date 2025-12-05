document.getElementById("searchBtn").addEventListener("click", searchStock);
document.getElementById("clearBtn").addEventListener("click", clearForm);

function showTab(id) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function clearForm() {
    document.getElementById("tickerInput").value = "";
    document.getElementById("outlook").innerHTML = "";
    document.getElementById("summary").innerHTML = "";
    document.getElementById("errorMsg").textContent = "";
}

function searchStock() {
    const ticker = document.getElementById("tickerInput").value.trim().toUpperCase();
    if (!ticker) {
        document.getElementById("errorMsg").textContent = "Please fill out this field";
        return;
    }

    fetch(`/search?ticker=${ticker}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                document.getElementById("errorMsg").textContent =
                    "Error: No record has been found, please enter a valid symbol.";
                return;
            }

            document.getElementById("errorMsg").textContent = "";
            showTab('outlook');

            const company = data.company;
            document.getElementById("outlook").innerHTML = `
                <h3>Company Outlook</h3>
                <table>
                    <tr><td>Company Name</td><td>${company.name}</td></tr>
                    <tr><td>Stock Ticker Symbol</td><td>${company.ticker}</td></tr>
                    <tr><td>Exchange Code</td><td>${company.exchangeCode}</td></tr>
                    <tr><td>Company Start Date</td><td>${company.startDate}</td></tr>
                    <tr><td>Description</td><td>${company.description.slice(0, 300)}...</td></tr>
                </table>
            `;

            const stock = data.stock;
            const lastPrice = stock.last ?? stock.tngoLast;
            const change = (lastPrice - stock.prevClose).toFixed(2);
            const changePct = ((change / stock.prevClose) * 100).toFixed(2);
            const changeColor = change >= 0 ? 'green' : 'red';
            const arrowImage = change >= 0
                ? '<img src="/static/images/GreenArrowUp.png" alt="Up" height="20">'
                : '<img src="/static/images/RedArrowDown.png" alt="Down" height="20">';
            const tradingDay = stock.timestamp.split('T')[0];

            document.getElementById("summary").innerHTML = `
                <h3>Stock Summary</h3>
                ${data.served_from_cache ? `<p style="color: green;">Served from cache</p>` : ""}
                <table>
                    <tr><td>Stock Ticker Symbol</td><td>${stock.ticker}</td></tr>
                    <tr><td>Trading Day</td><td>${tradingDay}</td></tr>
                    <tr><td>Previous Closing Price</td><td>${stock.prevClose}</td></tr>
                    <tr><td>Opening Price</td><td>${stock.open}</td></tr>
                    <tr><td>High Price</td><td>${stock.high}</td></tr>
                    <tr><td>Low Price</td><td>${stock.low}</td></tr>
                    <tr><td>Last Price</td><td>${lastPrice}</td></tr>
                    <tr><td>Change</td><td style="color:${changeColor}">${change} ${arrowImage}</td></tr>
                    <tr><td>Change Percent</td><td style="color:${changeColor}">${changePct}%</td></tr>
                    <tr><td>Shares Traded</td><td>${stock.volume}</td></tr>
                </table>
            `;
        })
        .catch(() => {
            document.getElementById("errorMsg").textContent = "Error fetching data. Please try again.";
        });
}

function loadHistory() {
    showTab('history');
    fetch('/history')
        .then(res => res.json())
        .then(data => {
            const rows = data.map(r => `<tr><td>${r.ticker}</td><td>${r.timestamp}</td></tr>`).join("");
            document.getElementById("history").innerHTML = `
                <h3>Search History</h3>
                <table>
                    <tr><th>Ticker</th><th>Timestamp</th></tr>
                    ${rows}
                </table>
            `;
        })
        .catch(() => {});
}

window.onload = () => {
    showTab('outlook');
    clearForm();
};