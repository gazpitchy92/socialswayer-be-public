import express, { Request, Response } from 'express';
import Database from '../database/database';
import Queries from '../database/queries';
import { RowDataPacket } from 'mysql2/promise';
import entry from '../types';

// This class is used for the GuidesAPI Endpoint.
// The GuidesAPI Endpoint returns a list of current tutorials and guides for users.
// This API Endpoint is public and does not require auth.

class GuidesApi {

  // Contructor
  private db: Database;
  private queries: Queries;
  constructor() {
    this.db = Database.getInstance();
    this.queries = new Queries();
  }

  // This class returns the JSON object for each tutorial or guide entry. 
  public async getGuides(req: Request, res: Response): Promise<void> {
    try {
      // Connect to the database
      await this.db.connect();
      const connection = this.db.getConnection();
      // Query the guides table
      const [rows] = await connection.query<RowDataPacket[]>(
        this.queries.all("guides")
      );
      // Build the JSON with returned DB data
      const data: entry.guide[] = rows.map((row: any) => ({
        name: row.name,
        url: row.url
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

export default GuidesApi;