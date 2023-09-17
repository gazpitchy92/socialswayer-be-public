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
const database_1 = __importDefault(require("./database"));
class Auth {
    constructor() {
        this.db = database_1.default.getInstance();
    }
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.connect();
                const id = req.query.id;
                const authorizationHeader = req.headers.Authorization || req.headers.authorization;
                const connection = this.db.getConnection();
                const [rows] = yield connection.query('SELECT * FROM api_tokens WHERE user_id = ? AND token = ?', [id, authorizationHeader]);
                if (rows.length === 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            catch (err) {
                return false;
            }
        });
    }
}
exports.default = Auth;
