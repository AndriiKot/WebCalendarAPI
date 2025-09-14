require("dotenv").config();
const express = require("express");
const { google } = require("googleapis");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "prototype-secret",
    resave: false,
    saveUninitialized: true,
  })
);

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI || "http://localhost:3000/oauth2callback"
);

app.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"],
    prompt: "consent",
  });
  res.redirect(authUrl);
});

app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    req.session.tokens = tokens;
    // Перенаправляем на главную страницу после успешной авторизации
    res.redirect("/?auth=success");
  } catch (error) {
    // Перенаправляем на главную с параметром ошибки
    res.redirect("/?auth=error");
  }
});

app.get("/add-event", async (req, res) => {
  if (!req.session.tokens) return res.redirect("/auth");

  oauth2Client.setCredentials(req.session.tokens);
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  const event = {
    summary: req.query.summary || "Новое событие",
    start: {
      dateTime: new Date().toISOString(),
      timeZone: "Europe/Bratislava",
    },
    end: {
      dateTime: new Date(Date.now() + 3600000).toISOString(),
      timeZone: "Europe/Bratislava",
    },
  };

  try {
    const result = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    res.send(`
      <h2>Событие создано! ✅</h2>
      <a href="${result.data.htmlLink}" target="_blank">Открыть в календаре</a>
      <br><br>
      <a href="/">Вернуться на главную</a>
    `);
  } catch (error) {
    res.send(`
      <h2>Ошибка: ${error.message}</h2>
      <a href="/">Вернуться на главную</a>
    `);
  }
});

app.get("/", (req, res) => {
  const { auth } = req.query;
  let message = "";

  if (auth === "success") {
    message =
      '<div style="color: green; padding: 10px;">✅ Авторизация успешна!</div>';
  } else if (auth === "error") {
    message =
      '<div style="color: red; padding: 10px;">❌ Ошибка авторизации</div>';
  }

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Calendar App</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .message { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        a { color: #007bff; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>📅 Прототип Calendar App</h1>
      ${message}
      <a href="/auth">🔐 Авторизоваться через Google</a>
      <hr>
      <h3>Добавить событие:</h3>
      <a href="/add-event?summary=Тестовое событие">✅ Добавить тестовое событие</a>
      <br><br>
      <form action="/add-event">
        <input type="text" name="summary" placeholder="Название события" required>
        <button type="submit">➕ Добавить событие</button>
      </form>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
});
