// Imports
import express from 'express';
import NewsApi from './classes/newsApi';
import GuidesApi from './classes/guidesApi';
import LinksApi from './classes/linksApi';
import PlansApi from './classes/plansApi';

// Setup Express
const app = express();
const port = 3000;

// Class Objects
const newsApi = new NewsApi();
const guidesApi = new GuidesApi();
const linksApi = new LinksApi();
const plansApi = new PlansApi();

// API Endpoints
app.get('/api/news', async (req, res) => { newsApi.getNews(req, res); }); // GET /api/news
app.get('/api/guides', async (req, res) => { guidesApi.getGuides(req, res); }); // GET /api/guides
app.get('/api/links', async (req, res) => { linksApi.getLinks(req, res); }); // GET /api/links
app.get('/api/plans', async (req, res) => { 
  const id = req.query.id as string | undefined; 
  plansApi.getPlans(req, res, id); 
}); // GET /api/plans/:id

// Start API
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});