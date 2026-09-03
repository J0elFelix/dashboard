async function calendar(): Promise<void> {
  const container = document.getElementById("calendar__card-list");

  if (!container) {
    console.error("Element #calendar__card-list wurde nicht gefunden.");
    return;
  }

  const year = new Date().getFullYear();

  try {
    const response = await fetch(`https://openholidaysapi.org/SchoolHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=${year}-01-01&validTo=${year}-12-31&subdivisionCode=CH-SG`,);

    if (!response.ok) {
      throw new Error(
        `OpenHolidaysAPI Fehler ${response.status}: ${await response.text()}`
      );
    }

    const holidays: any[] = await response.json();

    holidays.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    const formatDate = (date: string): string => { const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    };

    container.innerHTML = holidays
      .map((holiday) => {
        const name = holiday.name?.find((item: any) => item.language === "DE")?.text;

        return `
          <article class="calendar__card-list-item">
            <div class="calendar__card-list-item-time">
              <div>${formatDate(holiday.startDate)}</div>
              <div>- ${formatDate(holiday.endDate)}</div>
            </div>

            <div class="calendar__card-list-item-container">
              <h3 class="calendar__card-list-item-container-title">
                ${name}
              </h3>
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