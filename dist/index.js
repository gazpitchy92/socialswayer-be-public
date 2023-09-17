"use strict";
// This is the main file for launching.
// It specifies the endpoints and routing logic.
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
const news_1 = __importDefault(require("./classes/api/news"));
const guides_1 = __importDefault(require("./classes/api/guides"));
const links_1 = __importDefault(require("./classes/api/links"));
const plans_1 = __importDefault(require("./classes/api/plans"));
// Setup Express.JS
const app = (0, express_1.default)();
const port = 3000;
// Class Objects
const newsApi = new news_1.default();
const guidesApi = new guides_1.default();
const linksApi = new links_1.default();
const plansApi = new plans_1.default();
// API Endpoints
app.get('/api/news', (req, res) => __awaiter(void 0, void 0, void 0, function* () { newsApi.getNews(req, res); })); // NewsAPI
app.get('/api/guides', (req, res) => __awaiter(void 0, void 0, void 0, function* () { guidesApi.getGuides(req, res); })); // GuidesAPI
app.get('/api/links', (req, res) => __awaiter(void 0, void 0, void 0, function* () { linksApi.getLinks(req, res); })); // LinksAPI
app.get('/api/plans', (req, res) => __awaiter(void 0, void 0, void 0, function* () { plansApi.getPlans(req, res); })); // PlansAPI
// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
