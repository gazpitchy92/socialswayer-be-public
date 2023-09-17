import mysql, { RowDataPacket } from 'mysql2/promise';

class Database {
  private static instance: Database;
  private connection: mysql.Connection | null = null;

  private constructor() {}

  // Return instance of database
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Get new datbase connection
  public async connect(): Promise<void> {
    try {
      this.connection = await mysql.createConnection({
        host: "192.168.1.110",
        user: "socialswayer",
        password: "letmein123",
        database: "members" 
      });
    } catch (err) {
      console.error('Error connecting to the database:', err);
      throw err;
    }
  }

  // Get the current database connection
  public getConnection(): mysql.Connection {
    if (!this.connection) {
      throw new Error('Database connection is not established.');
    }
    return this.connection;
  }

}

export default Database;