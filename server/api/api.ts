import { Request, Response, Express } from 'express';
import { Database } from '../database';

export class API {
  app: Express;
  database: Database;

  constructor(app: Express, database: Database) {
    this.app = app;
    this.database = database;

    this.app.get('/getPosts', this.getPosts.bind(this));
    this.app.post('/login', this.login.bind(this));
    this.app.post('/register', this.register.bind(this));
    this.app.post('/tweet', this.tweet.bind(this));
  }

  private async tweet(req: Request, res: Response) {
    const {content } = req.body;

      await this.database.createTweet(content);
      res.send('Registrierung erfolgreich!');

  }

  private async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await this.database.getUser(username);
  
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login erfolgreich' });
    } else {
      res.status(401).send('Ungültige Anmeldedaten');
    }
  }

  private async getPosts(req: Request, res: Response) {
    try {
      const posts = await this.database.getPosts();
      res.json(posts);
    } catch (err) {
      console.error('Fehler beim Abrufen der Posts:', err);
      res.status(500).send('Serverfehler beim Abrufen der Posts.');
    }
  }

  private async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userExists = await this.database.getUser(username);
    if (userExists) {
      res.status(409).send('Benutzername bereits vergeben');
    } else {
      await this.database.createUser(username, password);
      res.send('Registrierung erfolgreich!');
    }
  }
}