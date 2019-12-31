import { SourceQuery } from "./sources/sourceQuery";
import { Source } from "./common/source";
import { EverythingQuery } from "./everything/everythingQuery";
import { Article } from "./common/article";
import { TopHeadlineQuery } from "./topHeadlines/topHeadlineQuery";
import fetch from 'cross-fetch';

/**
 * Represents a client which can send parameterized requests to the News API endpoints (Sources, Everything, Top headlines) for searching and retrieving live articles.
 * For more details see https://newsapi.org/docs.
 */
export class NewsClient {
    private static baseUrl: string = `https://newsapi.org/v2/`;
    private static everythingEndpoint: string = `everything`;
    private static topHeadlinesEndpoint: string = `top-headlines`;
    private static sourcesEndpoint: string = `sources`;
    private static apiKey: string = `?apiKey=`;
    private static req: RequestInit = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    private readonly userApiKey: string;

    /**
     * Constructor of the class.
     * @param apiKey The api key which is sent along with every single request (required). You can get one here: https://newsapi.org/.
     */
    public constructor(apiKey: string){
        this.userApiKey = apiKey;
    }
    
    /**
     * Searching for news sources based on the given query. Returns a set of news publishers.
     * @param sourceQuery The query on which the search is based.
     * @returns The array of found news sources.
     */
    async searchForSources(sourceQuery: SourceQuery): Promise<Source[]> {
        const requestUrl = NewsClient.baseUrl + 
        NewsClient.sourcesEndpoint + 
        NewsClient.apiKey + this.userApiKey + 
        sourceQuery.toString();

        const response = await fetch(requestUrl, NewsClient.req);
        const responseObject = await response.json();

        if(response.status != 200){
            throw new Error(responseObject.message);
        }

        return (<Array<any>>responseObject.sources).map<Source>(source => {
            return {
                id: source.id,
                name: source.name,
                description: source.description,
                url: source.url,
                category: source.category,
                language: source.language,
                country: source.country
            };
        });
    }

    /**
     * Searching for articles based on the given query. This includes breaking news as well as lesser articles.
     * @param everythingQuery The query on which the search is based.
     * @returns The array of found articles.
     */
    async searchForEverything(everythingQuery: EverythingQuery): Promise<Article[]> {
        const requestUrl = NewsClient.baseUrl + 
        NewsClient.everythingEndpoint + 
        NewsClient.apiKey + this.userApiKey + 
        everythingQuery.toString();

        const response = await fetch(requestUrl, NewsClient.req);
        const responseObject = await response.json();

        if(response.status != 200){
            throw new Error(responseObject.message);
        }

        return (<Array<any>>responseObject.articles).map<Article>(article => {
            return {
                sourceId: article.source.id,
                sourceName: article.source.name,
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: new Date(article.publishedAt),
                content: article.content
            };
        });
    }
    
    /**
     * Searching for live top and breaking headlines.
     * @param topHeadlineQuery The query on which the search is based.
     * @returns The array of found headlines (articles).
     */
    async searchForTopHeadlines(topHeadlineQuery: TopHeadlineQuery): Promise<Article[]> {
        const requestUrl = NewsClient.baseUrl + 
        NewsClient.topHeadlinesEndpoint + 
        NewsClient.apiKey + this.userApiKey + 
        topHeadlineQuery.toString();

        const response = await fetch(requestUrl, NewsClient.req);
        const responseObject = await response.json();

        if(response.status != 200){
            throw new Error(responseObject.message);
        }

        return (<Array<any>>responseObject.articles).map<Article>(article => {
            return {
                sourceId: article.source.id,
                sourceName: article.source.name,
                author: article.author,
                title: article.title,
                description: article.description,
                url: article.url,
                urlToImage: article.urlToImage,
                publishedAt: new Date(article.publishedAt),
                content: article.content
            };
        });
    }

    /**
     * Returns the number of the found articles. TopHeadlineQuery or EverythingQuery can be used for the search.
     * @param articleQuery The query used for the search.
     * @returns The number of the found articles.
     */
    async getArticlesCount(articleQuery: TopHeadlineQuery | EverythingQuery): Promise<number> {
        let endpoint: string;
        if(articleQuery instanceof TopHeadlineQuery){
            endpoint = NewsClient.topHeadlinesEndpoint;
        }
        else endpoint = NewsClient.everythingEndpoint;

        const requestUrl = NewsClient.baseUrl + endpoint +
        NewsClient.apiKey + this.userApiKey + 
        articleQuery.toString();

        const response = await fetch(requestUrl, NewsClient.req);
        const responseObject = await response.json();

        if(response.status != 200){
            throw new Error(responseObject.message);
        }

        return responseObject.totalResults;
    }
}