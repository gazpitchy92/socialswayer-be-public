import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';
import { NewsEntry } from '../types';

class NewsApi {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async getNews(req: Request, res: Response): Promise<void> {
    try {
      await this.db.connect();
      const connection = this.db.getConnection();
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM news');
      const data: NewsEntry[] = rows.map((row: any) => ({
        date: row.date,
        type: row.type,
        status: row.status,
        message: row.message
      }));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default NewsApi;