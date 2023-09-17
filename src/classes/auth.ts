import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';

class Auth {
  private db: Database;

  // Get DB connection object
  constructor() {
    this.db = Database.getInstance();
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
        const authorizationHeader = req.headers.Authorization || req.headers.authorization;
        // Query the database
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?',
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