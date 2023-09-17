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
const promise_1 = __importDefault(require("mysql2/promise"));
class Database {
    constructor() {
        this.connection = null;
    }
    // Return instance of database
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    // Get new datbase connection
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.connection = yield promise_1.default.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "letmein123",
                    database: "members"
                });
            }
            catch (err) {
                console.error('Error connecting to the database:', err);
                throw err;
            }
        });
    }
    // Get the current database connection
    getConnection() {
        if (!this.connection) {
            throw new Error('Database connection is not established.');
        }
        return this.connection;
    }
}
exports.default = Database;
