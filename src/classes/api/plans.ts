import express, { Request, Response } from 'express';
import Database from '../database/database';
import Queries from '../database/queries';
import { RowDataPacket } from 'mysql2/promise';
import entry from '../types';
import Auth from '../auth';


// This class is used for the PlansAPI Endpoint.
// The PlansAPI Endpoint returns subscription plan specifications for a user.
// This API Endpoint requires the User to supply an ID and aslo an authorization token header.

class PlansApi {
  
  // Constructor
  private db: Database;
  private auth: Auth;
  private queries: Queries;
  constructor() {
    this.db = Database.getInstance();
    this.auth = new Auth();
    this.queries = new Queries();
  }

  // This class returns the JSON object for each subscription plan the user has. 
  public async getPlans(req: Request, res: Response): Promise<void> {
    try {
      // Check auth
      if (await this.auth.checkAuth(req, res)) {
        const id = req.query.id as string | undefined; 
        if (id != undefined) {
          // Connect to the database
          await this.db.connect();
          const connection = this.db.getConnection();
          // Build the JSON with returned DB data
          const [rows] = await connection.query<RowDataPacket[]>(
            this.queries.plans(),
            [id]
          );
          const data: entry.plan[] = rows.map((row: any) => ({
            status: row.status,
            name: row.name,
            url: row.url,
            planId: row.plan_id,
            accountLimit: row.account_limit,
            projectLimit: row.project_limit,
            proxyLimit: row.proxy_limit,
            slaveLimit: row.slave_limit,
          }));
          // Return the JSON 
          res.json(data);
        } else {
          // Invalid User ID supplied
          res.status(422).json({ error: 'No ID Supplied' });
        }
      } else {
        // Unauthorised
        res.status(401).json({ error: 'Unauthorised' });
      }
    } catch (err) {
      // General 500 error
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

export default PlansApi;