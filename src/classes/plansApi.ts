import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';
import { PlansEntry } from '../types';

class PlansApi {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async getPlans(req: Request, res: Response, id?: string): Promise<void> {
    try {
      if (id) {
        await this.db.connect();
        const connection = this.db.getConnection();
        const [rows] = await connection.query<RowDataPacket[]>(
          'SELECT * FROM plans WHERE id = ?',
          [id]
        );
        const data: PlansEntry[] = rows.map((row: any) => ({
          status: row.status,
          name: row.name,
          url: row.url,
          planId: row.plan_id,
          accountLimit: row.account_limit,
          projectLimit: row.project_limit,
          proxyLimit: row.proxy_limit,
          slaveLimit: row.slave_limit,
        }));
        res.json(data);
      } else {
        res.status(422).json({ error: 'No ID Supplied' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default PlansApi;