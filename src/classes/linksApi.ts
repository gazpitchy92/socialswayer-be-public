import express, { Request, Response } from 'express';
import Database from './database';
import { RowDataPacket } from 'mysql2/promise';
import { LinkEntry } from '../types';

class LinksApi {
  private db: Database;

  constructor() {
    this.db = Database.getInstance();
  }

  public async getLinks(req: Request, res: Response): Promise<void> {
    try {
      await this.db.connect();
      const connection = this.db.getConnection();
      const [rows] = await connection.query<RowDataPacket[]>('SELECT * FROM links');
      const data: LinkEntry[] = rows.map((row: any) => ({
        name: row.name,
        url: row.url,
        icon: row.icon
      }));
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default LinksApi;