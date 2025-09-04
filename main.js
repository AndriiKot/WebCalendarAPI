const CLIENT_ID = "ВАШ_CLIENT_ID.apps.googleusercontent.com";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let GoogleAuth;

function initClient() {
  gapi.load('client:auth2', async () => {
    await gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    });
    GoogleAuth = gapi.auth2.getAuthInstance();

    document.getElementById("loginBtn").addEventListener("click", async () => {
      if (!GoogleAuth.isSignedIn.get()) {
        await GoogleAuth.signIn();
        document.getElementById("msg").textContent = "Вход выполнен!";
      }
    });
  });
}

window.onload = initClient;

document.getElementById("eventForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const summary = document.getElementById("summary").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!GoogleAuth.isSignedIn.get()) {
    alert("Сначала войдите через Google!");
    return;
  }

  const event = {
    summary,
    description,
    start: { dateTime: new Date().toISOString(), timeZone: 'Europe/Bratislava' },
    end: { dateTime: new Date(Date.now() + 3600000).toISOString(), timeZone: 'Europe/Bratislava' }
  };

  try {
    const request = gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });
    const response = await request;
    document.getElementById("msg").textContent = "Событие добавлено! " + response.result.htmlLink;
  } catch (err) {
    console.error(err);
    document.getElementById("msg").textContent = "Ошибка при добавлении события";
  }
});

