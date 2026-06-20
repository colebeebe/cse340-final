import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import { addLocalVariables } from './src/middleware/global.js';
import { setupDatabase, testConnection } from './src/models/setup.js';
import router from './src/controllers/routes.js';
import { caCert } from './src/models/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

const app = express();

const pgSession = connectPgSimple(session);

app.set('trust proxy', 1);
app.use(
  session({
    store: new pgSession({
      conObject: {
        connectionString: process.env.DB_URL,
        ssl: {
          ca: caCert,
          rejectUnauthorized: true,
          checkServerIdentity: () => {
            return undefined;
          },
        },
      },
      tableName: 'oa_session',
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV.includes('dev') !== true,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(addLocalVariables);

app.use('/', router);

app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent || res.finished) {
    return next(err);
  }

  const status = err.status || 500;
  const template = status === 404 ? '404' : '500';

  const context = {
    title: status === 404 ? 'Page Not Found' : 'An Error Occurred',
    message: NODE_ENV.includes('dev')
      ? err.message
      : "We're working to resolve the issue",
    stack: NODE_ENV.includes('dev') ? err.stack : null,
    NODE_ENV,
  };

  try {
    res.render(`errors/${template}`, context);
  } catch (renderError) {
    if (!res.headersSent) {
      res
        .status(status)
        .send(`<h1>A Rendering Error Occured</h1><p>${renderError}</p>`);
    }
  }
});

try {
  await setupDatabase();
  await testConnection();

  app.listen(PORT, async () => {
    if (NODE_ENV.includes('dev')) {
      console.log(`Listening at http://localhost:${PORT}`);

      const ws = await import('ws');

      try {
        const wsPort = parseInt(PORT) + 1;
        const wsServer = new ws.WebSocketServer({ port: wsPort });

        wsServer.on('listening', () => {
          console.log(`WebSocket server is running on port ${wsPort}`);
        });

        wsServer.on('error', (error) => {
          console.error('Websocket server error:', error);
        });
      } catch (error) {
        console.error('Failed to start WebSocket server:', error);
      }
    } else {
      console.log(`Listening on port ${PORT}`);
    }
  });
} catch (err) {
  console.error('Connection error:\n', err);
}
