import express, { Request, Response } from 'express';
import Database from '../database/database';
import Queries from '../database/queries';
import { RowDataPacket } from 'mysql2/promise';
import entry from '../types';

// This class is used for the NewsAPI Endpoint.
// The NewsAPI Endpoint returns current news and alerts for SocialSwayer systems.
// This API Endpoint is public and does not require auth.

class NewsApi {
  
  // Constructor
  private db: Database;
  private queries: Queries;
  constructor() {
    this.db = Database.getInstance();
    this.queries = new Queries();
  }

  // This class returns the JSON object for each news entry. 
  public async getNews(req: Request, res: Response): Promise<void> {
    try {
      // Connect to the database
      await this.db.connect();
      const connection = this.db.getConnection();
      // Query the news table
      const [rows] = await connection.query<RowDataPacket[]>(
        this.queries.news()
      );
      // Build the JSON with returned DB data
      const data: entry.news[] = rows.map((row: any) => ({
        date: row.date,
        type: row.type,
        status: row.status,
        message: row.message
      }));
      // Return the JSON 
      res.json(data);
    } catch (err) {
      // General 500 error
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default NewsApi;