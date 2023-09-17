import express, { Request, Response } from 'express';
import Database from '../database/database';
import Queries from '../database/queries';
import { RowDataPacket } from 'mysql2/promise';
import entry from '../types';

// This class is used for the LinksAPI Endpoint.
// The LinksAPI Endpoint returns a list of current affiliate links for socialSwayer users.
// This API Endpoint is public and does not require auth.

class LinksApi {

  // Constructor
  private db: Database;
  private queries: Queries;
  constructor() {
    this.db = Database.getInstance();
    this.queries = new Queries();
  }

  // This class returns the JSON object for each links entry. 
  public async getLinks(req: Request, res: Response): Promise<void> {
    try {
      // Connect to the database
      await this.db.connect();
      const connection = this.db.getConnection();
      // Query the links table
      const [rows] = await connection.query<RowDataPacket[]>(
        this.queries.all("links")
      );
      // Build the JSON with returned DB data
      const data: entry.link[] = rows.map((row: any) => ({
        name: row.name,
        url: row.url,
        icon: row.icon
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

export default LinksApi;