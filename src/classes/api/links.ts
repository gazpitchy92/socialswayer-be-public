import express, { Request, Response } from 'express';
import Database from '../database';
import { RowDataPacket } from 'mysql2/promise';
import { LinkEntry } from '../types';

// This class is used for the LinksAPI Endpoint.
// The LinksAPI Endpoint returns a list of current affiliate links for socialSwayer users.
// This API Endpoint is public and does not require auth.

class LinksApi {
  private db: Database;

  // Get DB connection object
  constructor() {
    this.db = Database.getInstance();
  }

  // This class returns the JSON object for each links entry. 
  public async getLinks(req: Request, res: Response): Promise<void> {
    try {
      // Connect to the database
      await this.db.connect();
      const connection = this.db.getConnection();
      // Query the links table
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM links');
      // Build the JSON with returned DB data
      const data: LinkEntry[] = rows.map((row: any) => ({
        name: row.name,
        url: row.url,
        icon: row.icon
      }));
      // Return the JSON 
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default LinksApi;