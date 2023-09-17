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
const database_1 = __importDefault(require("../database/database"));
const queries_1 = __importDefault(require("../database/queries"));
// This class is used for the GuidesAPI Endpoint.
// The GuidesAPI Endpoint returns a list of current tutorials and guides for users.
// This API Endpoint is public and does not require auth.
class GuidesApi {
    // Get DB connection object
    constructor() {
        this.db = database_1.default.getInstance();
        this.queries = new queries_1.default();
    }
    // This class returns the JSON object for each tutorial or guide entry. 
    getGuides(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the database
                yield this.db.connect();
                const connection = this.db.getConnection();
                // Query the guides table
                const [rows] = yield connection.query(this.queries.guides());
                // Build the JSON with returned DB data
                const data = rows.map((row) => ({
                    name: row.name,
                    url: row.url
                }));
                // Return the JSON 
                res.json(data);
            }
            catch (err) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = GuidesApi;
