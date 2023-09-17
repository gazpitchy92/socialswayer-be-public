import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';

class Auth {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async checkAuth(req: Request, res: Response): Promise<boolean> {
    try {
        await this.db.connect();
        const id = req.query.id as string | undefined; 
        const authorizationHeader = req.headers.Authorization || req.headers.authorization;
        const connection = this.db.getConnection();
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?',
            [id,authorizationHeader]
        );
        if (rows.length === 0) { 
            return false; 
        } else {
            return true
        }
    } catch(err) {
        return false; 
    }
  }

}

export default Auth;