class Queries {
  public news(): string {
    return 'SELECT * FROM news';
  }

  public links(): string {
    return 'SELECT * FROM link';
  }

  public guides(): string {
    return 'SELECT * FROM guides';
  }

  public plans(): string {
    return 'SELECT * FROM plans WHERE id = ?';
  }

  public auth(): string {
    return 'SELECT * FROM api_tokens WHERE user_id = ? AND token = ?';
  }
}

export default Queries;

