import "./style.css";

const GRAPH_TOKEN = import.meta.env.VITE_GRAPH_TOKEN;

if (!GRAPH_TOKEN) {
  throw new Error("GRAPH_TOKEN wurde nicht geunden.");
}

async function calendar(): Promise<void> {
  const container = document.getElementById("calendar-events");

  if (!container) {
    console.error("Element #calendar-events wurde nicht gefunden.");
    return;
  }

  try {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=2026-08-24T10:52:09.500Z&enddatetime=2026-08-28T10:52:09.500Z",
      {
        headers: {
          Authorization: `Bearer ${GRAPH_TOKEN}`,
          Prefer: 'outlook.timezone="Europe/Zurich"',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Microsoft Graph Fehler ${response.status}: ${await response.text()}`
      );
    }

    const result = await response.json();

    container.innerHTML = (result.value ?? [])
      .map((event: any) => {
        const start = new Date(event.start.dateTime).toLocaleString("de-CH");
        const end = new Date(event.end.dateTime).toLocaleString("de-CH");

        return `
          <article class="calendar-event">
            <h3>${event.subject || "Ohne Titel"}</h3>
            <p>${start} – ${end}</p>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);    
  }
}

calendar();