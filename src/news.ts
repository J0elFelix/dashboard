import './style.css'

const NEWS_KEY = "5e68f259bedd4c41acd3b26106b3ea5b"

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
        const date = article.publishedAt;

        return `
          <article class="news-item">
            <a href="${url}" target="_blank"><h2>${title}<h2></a>
            <p>${description}</p>
            <p>${source}</p>
            <p>${date}</p>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten: ", error);
  }
}

loadNews()