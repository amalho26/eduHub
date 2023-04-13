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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
let connection;
function getDBConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        if (connection === undefined) {
            connection = yield promise_1.default.createConnection({
                host: process.env.RDS_HOST,
                user: process.env.RDS_USER,
                password: process.env.RDS_PASSWORD,
                database: process.env.RDS_SCHEMA
            });
        }
        return connection;
    });
}
exports.getDBConnection = getDBConnection;
