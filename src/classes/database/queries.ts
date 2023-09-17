// This class simply contains all the MySQL queries used throughout the project
// Creating a central place to update all queries

class Queries {

  // NewsAPI
  public news(): string {
    return 'SELECT * FROM news';
  }

  // LinksAPI
  public links(): string {
    return 'SELECT * FROM links';
  }

  // GuidesAPI
  public guides(): string {
    return 'SELECT * FROM guides';
  }

  // User Plan
  public userPlan(): string {
    return 'SELECT plan_id FROM user_plans WHERE user_id = ?';
  }

  // PlansAPI
  public plans(): string {
    return 'SELECT p.* FROM plans AS p INNER JOIN user_plans AS up ON p.id = up.plan_id WHERE up.user_id = ?';
  }

  // Auth
  public auth(): string {
    return 'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?';
  }
}

export default Queries;

