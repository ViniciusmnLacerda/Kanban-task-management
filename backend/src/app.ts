import * as express from 'express';
import 'express-async-errors';
import { errorMiddleware } from './middlwares';
import { loginRouter } from './routes';

export default class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.app.use('/login', loginRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}