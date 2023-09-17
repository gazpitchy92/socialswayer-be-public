// This is the main file for launching node.
// It specifies our endpoints and routing logic.

// Imports
import express from 'express';
import NewsApi from './classes/newsApi';
import GuidesApi from './classes/guidesApi';
import LinksApi from './classes/linksApi';
import PlansApi from './classes/plansApi';

// Setup Express.JS
const app = express();
const port = 3000;
const host = "http://localhost";

// Class Objects
const newsApi = new NewsApi();
const guidesApi = new GuidesApi();
const linksApi = new LinksApi();
const plansApi = new PlansApi();

// NewsAPI
app.get('/api/news', async (req, res) => { newsApi.getNews(req, res); }); 
// GuidesAPI
app.get('/api/guides', async (req, res) => { guidesApi.getGuides(req, res); });
// LinksAPI
app.get('/api/links', async (req, res) => { linksApi.getLinks(req, res); });
// PlansAPI
app.get('/api/plans', async (req, res) => { plansApi.getPlans(req, res); });

// Start Server
app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});