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
// Imports
const express_1 = __importDefault(require("express"));
const newsApi_1 = __importDefault(require("./classes/newsApi"));
const guidesApi_1 = __importDefault(require("./classes/guidesApi"));
const linksApi_1 = __importDefault(require("./classes/linksApi"));
const plansApi_1 = __importDefault(require("./classes/plansApi"));
// Setup Express
const app = (0, express_1.default)();
const port = 3000;
// Class Objects
const newsApi = new newsApi_1.default();
const guidesApi = new guidesApi_1.default();
const linksApi = new linksApi_1.default();
const plansApi = new plansApi_1.default();
// API Endpoints
app.get('/api/news', (req, res) => __awaiter(void 0, void 0, void 0, function* () { newsApi.getNews(req, res); })); // GET /api/news
app.get('/api/guides', (req, res) => __awaiter(void 0, void 0, void 0, function* () { guidesApi.getGuides(req, res); })); // GET /api/guides
app.get('/api/links', (req, res) => __awaiter(void 0, void 0, void 0, function* () { linksApi.getLinks(req, res); })); // GET /api/links
app.get('/api/plans', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    plansApi.getPlans(req, res, id);
})); // GET /api/plans/:id
// Start API
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
