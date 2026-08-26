import './style.css'

async function departure(): Promise<void> {
  const container = document.getElementById("departure-events");

  if (!container) {
    console.error("Element #departure wurde nicht gefunden.");
    return;
  }

  try {
    const response = await fetch('https://transport.opendata.ch/v1/connections?from=GossauSG,MigrosBZ&to=Herisau,Stelz&limit=5',
    );

    if (!response.ok) {
      throw new Error (
        `Transport Opendata Fehler ${response.status}: ${await response.text()}`
      );
    }

    const result = await response.json();

    container.innerHTML = (result.connections ?? [])
      .map((connection: any) => {
        const from = connection.from.station.name;
        const to = connection.to.station.name;
        const duration = connection.duration;
        const transfers = connection.transfers;        
        const formatTime = (value: string | null) => value ? new Date(value).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit", }) : "-";
        const departureTime = formatTime(connection.from.departure);
        const arrivalTime = formatTime(connection.to.arrival);

          return `
            <article class="departure-events">
              <p>von: ${from} nach: ${to}</p>
              <p>Dauer: ${duration}</p>
              <p>${transfers} Umsteigen</p>
              <p>Abfahrt: ${departureTime}</p>
              <p>Ankunft: ${arrivalTime}</p>
            </article>
          `;
      })
      .join("");    
  } catch (error) {
     console.error("Ein Fehler ist aufgetreten: ", error);
  }
}

departure()