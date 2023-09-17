// This is the main file for launching.
// It specifies the endpoints and routing logic.

// Imports
import express from 'express';
import NewsApi from './classes/api/news';
import GuidesApi from './classes/api/guides';
import LinksApi from './classes/api/links';
import PlansApi from './classes/api/plans';

// Setup Express.JS
const app = express();
const port = 3000;

// Class Objects
const newsApi = new NewsApi();
const guidesApi = new GuidesApi();
const linksApi = new LinksApi();
const plansApi = new PlansApi();
 
// API Endpoints
app.get('/api/news', async (req, res) => { newsApi.getNews(req, res); }); // NewsAPI
app.get('/api/guides', async (req, res) => { guidesApi.getGuides(req, res); }); // GuidesAPI
app.get('/api/links', async (req, res) => { linksApi.getLinks(req, res); }); // LinksAPI
app.get('/api/plans', async (req, res) => { plansApi.getPlans(req, res); }); // PlansAPI

// Start Server
app.listen(port,  () => {
  console.log(`Server is running on http://localhost:${port}`);
});