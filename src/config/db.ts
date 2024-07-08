import mysql from "mysql";

export const db = () => {
  const connection = mysql.createConnection({
    user: "root",
    password: "password",
    database: "raffle",
    port: 3306,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to database", err);
      return;
    }
    console.log("Connected to database");
  });
};
