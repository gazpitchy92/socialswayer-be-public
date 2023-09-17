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
const auth_1 = __importDefault(require("../auth"));
// This class is used for the PlansAPI Endpoint.
// The PlansAPI Endpoint returns subscription plan specifications for a user.
// This API Endpoint requires the User to supply an ID and aslo an authorization token header.
class PlansApi {
    // Get DB connection and Auth object
    constructor() {
        this.db = database_1.default.getInstance();
        this.auth = new auth_1.default();
        this.queries = new queries_1.default();
    }
    // This class returns the JSON object for each subscription plan the user has. 
    getPlans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check auth
                if (yield this.auth.checkAuth(req, res)) {
                    const id = req.query.id;
                    if (id != undefined) {
                        // Connect to the database
                        yield this.db.connect();
                        const connection = this.db.getConnection();
                        // Query the plans table
                        const [rows] = yield connection.query(this.queries.plans(), [id]);
                        // Build the JSON with returned DB data
                        const data = rows.map((row) => ({
                            status: row.status,
                            name: row.name,
                            url: row.url,
                            planId: row.plan_id,
                            accountLimit: row.account_limit,
                            projectLimit: row.project_limit,
                            proxyLimit: row.proxy_limit,
                            slaveLimit: row.slave_limit,
                        }));
                        // Return the JSON 
                        res.json(data);
                    }
                    else {
                        // Invalid User ID supplied
                        res.status(422).json({ error: 'No ID Supplied' });
                    }
                }
                else {
                    // Unauthorised
                    res.status(401).json({ error: 'Unauthorised' });
                }
            }
            catch (err) {
                // General 500 error
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.default = PlansApi;
