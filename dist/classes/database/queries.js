"use strict";
// This class simply contains all the MySQL queries used throughout the project
// Creating a central place to update all queries
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    // NewsAPI
    news() {
        return 'SELECT * FROM news';
    }
    // LinksAPI
    links() {
        return 'SELECT * FROM links';
    }
    // GuidesAPI
    guides() {
        return 'SELECT * FROM guides';
    }
    // PlansAPI
    plans() {
        return 'SELECT p.* FROM plans AS p INNER JOIN user_plans AS up ON p.id = up.plan_id WHERE up.user_id = ?';
    }
    // Auth
    auth() {
        return 'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?';
    }
}
exports.default = Queries;
