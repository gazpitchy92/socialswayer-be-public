// Imports
import express from 'express';
import NewsApi from './classes/newsApi';
import GuidesApi from './classes/guidesApi';
import LinksApi from './classes/linksApi';
import PlansApi from './classes/plansApi';
import Auth from './classes/auth';

// Setup Express
const app = express();
const port = 3000;
const host = "http://localhost";

// Class Objects
const newsApi = new NewsApi();
const guidesApi = new GuidesApi();
const linksApi = new LinksApi();
const plansApi = new PlansApi();
const auth = new Auth();

// API Endpoints
app.get('/api/news', async (req, res) => { newsApi.getNews(req, res); }); // GET /api/news
app.get('/api/guides', async (req, res) => { guidesApi.getGuides(req, res); }); // GET /api/guides
app.get('/api/links', async (req, res) => { linksApi.getLinks(req, res); }); // GET /api/links
app.get('/api/plans', async (req, res) => { 
  if (await auth.checkAuth(req, res)) {
    plansApi.getPlans(req, res);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}); // GET /api/plans?id=:id

// Start API
app.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});