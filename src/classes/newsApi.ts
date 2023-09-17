import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';
import { NewsEntry } from '../types';

// This class is used for the NewsAPI Endpoint.
// The NewsAPI Endpoint returns current news and alerts for SocialSwayer systems.
// This API Endpoint is public and does not require auth.

class NewsApi {
  private db: Database;

  // Get DB connection object
  constructor() {
    this.db = Database.getInstance();
  }

  // This class returns the JSON object for each news entry. 
  public async getNews(req: Request, res: Response): Promise<void> {
    try {
      // Connect to the database
      await this.db.connect();
      const connection = this.db.getConnection();
      // Query the news table
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM news');
      // Build the JSON with returned DB data
      const data: NewsEntry[] = rows.map((row: any) => ({
        date: row.date,
        type: row.type,
        status: row.status,
        message: row.message
      }));
      // Return the JSON 
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default NewsApi;