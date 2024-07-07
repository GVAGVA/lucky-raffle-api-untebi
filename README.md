
## Objective

The objective of this challenge is to assess your skills in creating a functional and efficient Node.js server, handling complex logic, working with MySQL databases, and adhering to RESTful principles.

## Brief

In this task, you will be tasked to develop a Node.js REST API to manage a raffle process. The API should include an endpoint to initiate the raffle, which selects a random winner following the specified rules. 

The rules are as follows: 
- A user who has already won can only win again if all users have won,
- In such a case, the user who won the cheapest prize is selected. 
- A user cannot win a prize already won by someone else. 
- If all prizes are won, the user is rewarded with a site balance increase. 

## Tasks

1. Setup a MySQL connection and Express app. You are free to use your preferred method to implement the MySQL database connection.

javascript
const express = require('express');
const mysql = require('mysql');

// Setup your MySQL connection and Express app
const app = express();
app.use(express.json());


2. Implement POST `/raffle` endpoint. This endpoint initiates the raffle process. 

javascript
app.post('/raffle', async (req, res) => {
  try {
    // Raffle Logic:
    // 1. Randomize Winner Selection
    // 2. Check User's Winning Status
    // 3. Select User with Cheapest Prize if needed
    // 4. Prize Allocation
    // 5. Fallback to Site Balance
    // 6. Update Database
    // Respond with the winner and prize/site balance information
  } catch (error) {
    res.status(500).send('Error during raffle');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


3. Implement the MySQL database connection using your preferred method.

4. Implement REST API best practices.

5. Handle errors gracefully and return appropriate HTTP response codes.

6. Consider using transactions for database updates to maintain data integrity.

7. Provide detailed API documentation, including request and response formats.

## Testing requirements

- Ensure that the API endpoint correctly implements the rules of the raffle.
- Ensure that the MySQL connection is properly implemented and the database can be queried successfully.
- Make sure the API follows REST best practices.
- Test that the API gracefully handles errors and returns appropriate HTTP response codes.

### Evaluation Criteria

- Correct implementation of the raffle process.
- Correct implementation of the MySQL connection.
- Adherence to REST API best practices.
- Graceful handling of errors.
- Detailed API documentation.

### CodeSubmit 

Please organize, design, test, and document your code as if it were
going into production - then push your changes to the master branch.

Have fun coding! 🚀

The zengaming Team
