const GRAPH_TOKEN = import.meta.env.VITE_GRAPH_TOKEN;

if (!GRAPH_TOKEN) {
  throw new Error("GRAPH_TOKEN wurde nicht gefunden.");
}

async function calendar(): Promise<void> {
  const container = document.getElementById("calendar__card-list");

  if (!container) {
    console.error("Element #calendar__card-list wurde nicht gefunden.");
    return;
  }

  const monday = new Date();
  // Montag beginn und Sonntag ende
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  monday.setHours(0, 0, 0, 0);

  const nextMonday = new Date(monday);
  nextMonday.setDate(nextMonday.getDate() + 7);

  try {
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/calendarview?startdatetime=${monday.toISOString()}&enddatetime=${nextMonday.toISOString()}`,
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
        const allDay = event.isAllDay === true;
        const start = new Date(event.start.dateTime);
        const end = new Date(event.end.dateTime);
        const location = event.location?.displayName || "";
        const time = allDay ? `<span>Ganztägig</span>` : `        

        <span>${start.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit", })}</span>
        -
        <span>${end.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit", })}</span>
        `;

        if (event.isAllDay) {
          end.setDate(end.getDate() - 1);
        }

        const startDate = start.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });
        const endDate = end.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });
        const formattedDate = startDate === endDate ? startDate : `${startDate} - ${endDate}`;

        return `
          <article class="calendar__card-list-item">
            <div class="calendar__card-list-item-time">
              <div>${formattedDate}</div>
              <div>${time}</div>
            </div>
            <div class="calendar__card-list-item-container">
              <h3 class="calendar__card-list-item-container-title">${event.subject || "Kein Titel"}</h3>
              ${location ? `<p class="calendar__card-list-item-container-text">${location}</p>` : ""}
            </div>            
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);
  }
}

calendar();