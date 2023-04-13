import { dbInsertUser, dbUpdateUserSub } from "./src/db";

export async function handler(event: any, context: any) {
  const email = event.request.userAttributes.email;

  if (event.triggerSource === "PreSignUp_SignUp") {
    const sub = event.userName;
    const firstName = event.request.userAttributes["custom:firstName"];
    const lastName = event.request.userAttributes["custom:lastName"];

    try {
      await dbInsertUser(sub, email, firstName, lastName);
    } catch (error) {
      console.log(error);
    }
  } else if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
    const sub = event.request.userAttributes.sub;

    try {
      await dbUpdateUserSub(sub, email);
    } catch (error) {
      console.log(error);
    }
  }

  return event;
}
