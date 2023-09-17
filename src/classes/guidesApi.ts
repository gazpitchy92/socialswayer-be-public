import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';
import { GuideEntry } from '../types';

class GuidesApi {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async getGuides(req: Request, res: Response): Promise<void> {
    try {
      await this.db.connect();
      const connection = this.db.getConnection();
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM guides');
      const data: GuideEntry[] = rows.map((row: any) => ({
        name: row.name,
        url: row.url
      }));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default GuidesApi;