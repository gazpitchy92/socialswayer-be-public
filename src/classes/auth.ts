import express, { Request, Response } from 'express';
import Database from './database/database';
import Queries from './database/queries';
import { RowDataPacket } from 'mysql2/promise';

class Auth {
  private db: Database;
  private queries: Queries;

  // Get DB connection object
  constructor() {
    this.db = Database.getInstance();
    this.queries = new Queries();
  }

  // This will check the supplied ID in the request against a token supplied in headers.Authorization.
  // The function returns true or false depending on the results of the check. 
  public async checkAuth(req: Request, res: Response): Promise<boolean> {
    try {
        
        // Connect to the database
        await this.db.connect();
        const connection = this.db.getConnection();
        // Get initial variables
        const id = req.query.id as string | undefined; 
        const authorizationHeader = req.headers.Authorization || req.headers.authorization as string | undefined;
        if (authorizationHeader === undefined || id === undefined) return false;
        // Query the database
        const [rows] = await connection.query<RowDataPacket[]>(
            this.queries.auth(),
            [id,authorizationHeader]
        );
        // Check results
        if (rows.length === 0) { 
            // Failure
            return false; 
        } else {
            // Success
            return true
        }
    } catch(err) {
        // Return failure incase of exception
        return false; 
    }
  }

}

export default Auth;