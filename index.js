import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

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
    res.send(`<h1>A Rendering Error Occured</h1><p>${renderError}</p>`);
  }
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
