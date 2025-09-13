require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const session = require('express-session');

const app = express();
const port = 3000;

app.use(session({
  secret: 'prototype-secret',
  resave: false,
  saveUninitialized: true
}));

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI || 'http://localhost:3000/oauth2callback'
);

app.get('/auth', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent'
  });
  res.redirect(authUrl);
});

app.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens;
    res.send('Авторизация успешна! Теперь можете добавлять события.');
  } catch (error) {
    res.send('Ошибка авторизации: ' + error.message);
  }
});

app.get('/add-event', async (req, res) => {
  if (!req.session.tokens) return res.redirect('/auth');

  oauth2Client.setCredentials(req.session.tokens);
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  const event = {
    'summary': req.query.summary || 'Новое событие',
    'start': { 'dateTime': new Date().toISOString(), 'timeZone': 'Europe/Bratislava' },
    'end': { 'dateTime': new Date(Date.now() + 3600000).toISOString(), 'timeZone': 'Europe/Bratislava' },
  };

  try {
    const result = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    res.send(`Событие создано! <a href="${result.data.htmlLink}">Открыть</a>`);
  } catch (error) {
    res.send('Ошибка: ' + error.message);
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Прототип Calendar App</h1>
    <a href="/add-event?summary=Тестовое событие">Добавить тестовое событие</a>
    <br>
    <form action="/add-event">
      <input type="text" name="summary" placeholder="Название события">
      <button>Добавить</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
  console.log('Запустите: ngrok http 3000');
});
