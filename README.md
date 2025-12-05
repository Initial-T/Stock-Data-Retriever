# Stock Data Retriever

## Objectives
- Gain experience with the **Python** programming language and the **Flask** web framework.
- Create interactive web pages using **HTML**, **CSS**, **JavaScript** (Fetch API), and **JSON**.
- Learn to retrieve stock data using the **Tiingo Stocks API**.
- Practice saving data persistently using **SQLite**.

This project is a **web-based application** deployed on **AWS** that allows users to retrieve and store stock data. The main features include:

1. **Stock Search**
   - Accepts a **stock ticker input** from the user.
   - Retrieves and displays stock information from the **Tiingo API**.

2. **Persistent Storage**
   - Saves each search in a **SQLite database** for future reference.

3. **Recent Searches**
   - Provides a tab to **view the last 10 searches**.

4. **Caching Mechanism**
   - Implements a basic caching system to **avoid repeated API calls** for the same stock ticker.

## Technologies Used
- **Backend:** Python, Flask  
- **Frontend:** HTML, CSS, JavaScript (Fetch API), JSON  
- **Database:** SQLite  
- **API:** Tiingo Stocks API  
- **Deployment:** AWS
