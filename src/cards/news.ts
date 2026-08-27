import '../styles/news.scss'
import '../styles/styles.scss'

const NEWS_KEY = import.meta.env.VITE_NEWS_KEY;

if (!NEWS_KEY) {
  throw new Error ("NEWS_KEY wurde nicht gefunden.");
}

async function loadNews(): Promise<void> {
  const container = document.getElementById("news-list");

  if (!container) {
    console.error("Element #news-events wurde nicht gefunden.");
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
        const description = article.description;
        const url = article.url;
        const date = new Date(article.publishedAt);

        const publishedDate = date.toLocaleDateString("de-CH", { day: "2-digit", month: "2-digit"});

        return `
          <article class="news-item"> 
            <div class="meta">
              <div class="top">
                <p>${source}</p>
                <p>${publishedDate}</p>
              </div>
              <div class="title">
                <a href="${url}" target="_blank">
                  <div>${title}</div>
                </a>
              </div>                          
            </div>
            <div class="description">
              <p>${description}</p>            
            </div>                
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
}

loadNews()