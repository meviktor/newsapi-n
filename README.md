# newsapi-n

Get breaking news headlines, and search for articles from over 30,000 news sources - you need an API key from https://newsapi.org/ to get started.

## Usage examples

Creating a client:
```javascript
import { NewsClient, EverythingQuery, Phrase, SourceQuery, Category, Country, Language, TopHeadlineQuery } from 'newsapi-node'

// Creating a client - you have to provide a valid API key.
const client = new NewsClient('paste your api key here');
```
Sources endpoint:
```javascript
// Creating a query for searching news sources - serving business news from the US.
const sourceQuery = new SourceQuery(Category.BUSINESS, Country.US, Language.EN);
// Searching for news sources.
client.searchForSources(sourceQuery)
.then(sources => console.log(sources))
.catch(error => console.log(error));
```
Everything endpoint:
```javascript
// Constructing a phrase (can be used when searching for articles/top headlines).
// Must contain the syntagm "user data", the word "Apple". Must not contain the word "iPhone".
const phrase = new Phrase(['user data'], ['Apple'], ['iPhone']);
// Creating a query can be sent to the /everything endpoint.
const everythingQuery = new EverythingQuery(phrase);
// Searching for articles using the query above.
client.searchForEverything(everythingQuery)
.then(articles => {
    console.log(articles);
})
.catch(error => {
    console.log(error);
});
```
Top headlines endpoint:
```javascript
// Creating a query can be sent to the /top-headlines endpoint. Containing the word "Samsung", displaying 5 articles per page.
const topHeadlineQuery = new TopHeadlineQuery(['Samsung'], undefined, 5);
// Searching for top headlines using the query above.
client.searchForTopHeadlines(topHeadlineQuery)
.then(articles => console.log(articles))
.catch(error => console.log(error));
```
Get the number of the found articles:
```javascript
// Everyhting endpoint
client.getArticlesCount(everythingQuery)
.then(count => console.log(`Number of found articles: ${count}.`))
.catch(error => console.log(error));
// Top headlines endpoint
client.getArticlesCount(topHeadlineQuery)
.then(count => console.log(`Number of found headlines: ${count}.`))
.catch(error => console.log(error));
```

## Response entities
- **[Article](src/common/article.ts):** an array of articles is returned by the *searchForTopHeadlines* and the *searchForEverything* methods.
- **[Source](src/common/source.ts):** an array of sources is returned by the *searchForSources* method.

## Enums
- **[Country](src/common/country.ts):** Restriction on the country you want to get headlines for. Can be used when searching for sources and top headlines.
- **[Category](src/common/category.ts):** Restriction on the category you want to get headlines for. Can be used when searching for sources and top headlines.
- **[Language](src/common/language.ts):** Restriction on the language of the sources or the articles. Can be used on all endpoints.
- **[SortBy](src/common/sortBy.ts):** Restriction on the order to sort the articles in. Can be used when searching for articles (Everything endpoint).

## Links
News API documentation: https://newsapi.org/docs/

## License
[MIT](LICENSE)
