import mysql from "mysql2/promise";

let connection: mysql.Connection;

export async function getDBConnection() {
  if (connection === undefined) {
    connection = await mysql.createConnection({
      host: process.env.RDS_HOST,
      user: process.env.RDS_USER,
      password: process.env.RDS_PASSWORD,
      database: process.env.RDS_SCHEMA
    });
  } 
  return connection;
}
