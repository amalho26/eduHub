import { OkPacket } from "mysql2";
import { getDBConnection } from "./connection";

export async function dbUpdateUserSub(
  sub: string,
  email: string,
) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
        UPDATE User
        SET sub = ?
        WHERE email = ?
      `,
      [sub, email]
    )
  )[0] as OkPacket;

  if (result.affectedRows === 0) {
    throw new Error('Error updating User')
  }

  return "SUCCESS";
}

export async function dbInsertUser(
  sub: string,
  email: string,
  firstName: string,
  lastName: string,
) {
  const connection = await getDBConnection();

  const result = (
    await connection.execute(
      `
        INSERT INTO User (
          sub, 
          email, 
          firstName, 
          lastName
        )
        VALUES (
          ?, 
          ?, 
          ?, 
          ?
        )
      `,
      [sub, email, firstName, lastName]
    )
  )[0] as OkPacket;

  return result.insertId;

}