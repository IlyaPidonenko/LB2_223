import { Request, Response, Express } from 'express';
import { Database } from '../database';

export class API {
  app: Express;
  database: Database;

  constructor(app: Express, database: Database) {
    this.app = app;
    this.database = database;


    this.app.get('/hello', this.sayHello);
    this.app.post('/login', this.login.bind(this));
    this.app.post('/register', this.register.bind(this));
    this.app.post('/tweet', this.tweet.bind(this));
  }

  private sayHello(req: Request, res: Response) {
    res.send('Hello There!');
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