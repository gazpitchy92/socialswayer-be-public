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
class LinksApi {
    constructor() {
        this.db = database_1.default.getInstance();
    }
    getLinks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.connect();
                const connection = this.db.getConnection();
                const [rows] = yield connection.query('SELECT * FROM links');
                const data = rows.map((row) => ({
                    name: row.name,
                    url: row.url,
                    icon: row.icon
                }));
                res.json(data);
            }
            catch (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = LinksApi;
