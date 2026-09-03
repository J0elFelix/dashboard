async function departure(): Promise<void> {
  const container = document.getElementById("departure__card-list");

  if (!container) {
    console.error("Element #departure wurde nicht gefunden.");
    return;
  }

  try {
    const response = await fetch('https://transport.opendata.ch/v1/connections?from=Gossau%20SG%2C%20Migros%20BZ&to=Herisau%2C%20Stelz&limit=6',
    );

    if (!response.ok) {
      throw new Error (
        `Transport Opendata Fehler ${response.status}: ${await response.text()}`
      );
    }

    const result = await response.json();

    container.innerHTML = (result.connections ?? [])
      .map((connection: any) => {
        const duration = connection.duration;
        const transfers = connection.transfers;        
        const formatTime = (value: string | null) => value ? new Date(value).toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit", }) : "-";
        const departureTime = formatTime(connection.from.departure);
        const arrivalTime = formatTime(connection.to.arrival);

          return `          
            <article class="departure__card-list-item">
              <div class="departure__card-list-item-time">
                <p>${departureTime}</p>
                <p>${arrivalTime}</p>              
              </div>            
              <div class="departure__card-list-item-connection">
                <p>${duration}</p>
                <p>${transfers} Umsteigen</p>              
              </div>            
            </article>
          `;          
      })
      .join("");    
  } catch (error) {
     console.error("Ein Fehler ist aufgetreten: ", error);
  }
}

departure()