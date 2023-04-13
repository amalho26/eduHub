"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const db_1 = require("./src/db");
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const email = event.request.userAttributes.email;
        if (event.triggerSource === "PreSignUp_SignUp") {
            const sub = event.userName;
            const firstName = event.request.userAttributes["custom:firstName"];
            const lastName = event.request.userAttributes["custom:lastName"];
            try {
                yield (0, db_1.dbInsertUser)(sub, email, firstName, lastName);
            }
            catch (error) {
                console.log(error);
            }
        }
        else if (event.triggerSource === "PostConfirmation_ConfirmSignUp") {
            const sub = event.request.userAttributes.sub;
            try {
                yield (0, db_1.dbUpdateUserSub)(sub, email);
            }
            catch (error) {
                console.log(error);
            }
        }
        return event;
    });
}
exports.handler = handler;
