// This class simply contains all the MySQL queries used throughout the project
// A central place to update all query logic

class Queries {

  // Select all from tableName
  public all(tableName:string): string {
    return `SELECT * FROM ${tableName}`;
  }

  // Join user plan_id to plans table 
  public plans(): string {
    return 'SELECT p.* FROM plans AS p INNER JOIN user_plans AS up ON p.id = up.plan_id WHERE up.user_id = ?';
  }

  // Auth check
  public auth(): string {
    return 'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?';
  }

}

export default Queries;