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
const database_1 = __importDefault(require("./database/database"));
const queries_1 = __importDefault(require("./database/queries"));
class Auth {
    // Get DB connection object
    constructor() {
        this.db = database_1.default.getInstance();
        this.queries = new queries_1.default();
    }
    // This will check the supplied ID in the request against a token supplied in headers.Authorization.
    // The function returns true or false depending on the results of the check. 
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the database
                yield this.db.connect();
                const connection = this.db.getConnection();
                // Get initial variables
                const id = req.query.id;
                const authorizationHeader = req.headers.Authorization || req.headers.authorization;
                if (authorizationHeader === undefined || id === undefined)
                    return false;
                // Query the database
                const [rows] = yield connection.query(this.queries.auth(), [id, authorizationHeader]);
                // Check results
                if (rows.length === 0) {
                    // Failure
                    return false;
                }
                else {
                    // Success
                    return true;
                }
            }
            catch (err) {
                // Return failure incase of exception
                return false;
            }
        });
    }
}
exports.default = Auth;
