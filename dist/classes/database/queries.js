"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queries {
    news() {
        return 'SELECT * FROM news';
    }
    links() {
        return 'SELECT * FROM link';
    }
    guides() {
        return 'SELECT * FROM guides';
    }
    plans() {
        return 'SELECT * FROM plans WHERE id = ?';
    }
    auth() {
        return 'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?';
    }
}
exports.default = Queries;
