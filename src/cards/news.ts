const NEWS_KEY = import.meta.env.VITE_NEWS_KEY;

if (!NEWS_KEY) {
  throw new Error("NEWS_KEY wurde nicht gefunden.");
}

async function loadNews(): Promise<void> {
  const container = document.getElementById("news__card-list");

  if (!container) {
    console.error("Element #news__card-list wurde nicht gefunden.");
    return;
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&apiKey=${NEWS_KEY}`
    );

    if (!response.ok) {
      throw new Error(
        `Newsapi Fehler ${response.status}: ${await response.text()}`
      );
    }

    const result = await response.json()

    container.innerHTML = (result.articles ?? [])
      .map((article: any) => {
        const title = article.title;
        const source = article.source.name;
        const content = article.description;
        const url = article.url;
        const date = new Date(article.publishedAt);

        const publishedDate = date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit" });

        return `
          <article class="news__card-list-item"> 
            <div class="news__card-list-item-meta">
              <div class="news__card-list-item-meta-top">
                <span>${source}</span>
                <span>${publishedDate}</span>
              </div>
              <div class="news__card-list-item-meta-title">
                <a class="news__card-list-item-meta-title-link" href="${url}" target="_blank">
                  <div>${title}</div>
                </a>
              </div>                          
            </div>
            <details class="news__card-list-item-meta-description">
              <summary class="news__card-list-item-meta-description-accordion">Mehr lesen</summary>
              <p class="news__card-list-item-meta-description-description">${content}</p>
            </details>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
}

loadNews()