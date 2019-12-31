import { ArticleQuery } from "../common/articleQuery";
import { Country } from "../common/country";
import { Category } from "../common/category";
import { Language } from "../common/language";
import { Utils } from "../common/utils";

/**
 * Represents a query can be sent to the Top headlines endpoint of the News API.
 */
export class TopHeadlineQuery extends ArticleQuery {
    readonly q?: string[];
    readonly country: Country;
    readonly category: Category;

    /**
     * Creates a query object to the Top headlines endpoint of the News API.
     * @throws An Error if none of the following query parameters are provided: q, sources, category, country, language.
     */
    public constructor(
        q?: string[],
        sources?: string[],
        pageSize: number = 20,
        page: number = 1,
        country: Country = Country.ALL,
        category: Category = Category.ALL,
        language: Language = Language.ALL
    ) {
        if((!q || q.length == 0) && (!sources || sources.length == 0) && category == Category.ALL && country == Country.ALL && language == Language.ALL){
            throw new Error('Required parameters are missing. Please set any of the following parameters and try again: q, sources, category, country, language.');
        }

        // No news source given
        if(!sources || sources.length == 0) {
            super(
                [],
                language,
                (pageSize < 1) ? 1 : ((pageSize <= 100) ? pageSize : 100),
                (page < 1) ? 1 : page
            );
            this.category = category;
            this.country = country;
        }
        // News sources in the query - 'country' and 'category' parameters will be ignored (by giving them the default value) because they are cannot be mixed with 'sources'...
        else{
            super(
                sources?.filter(source => !Utils.isEmptyOrWhiteSpace(source)),
                language,
                (pageSize < 1) ? 1 : ((pageSize <= 100) ? pageSize : 100),
                (page < 1) ? 1 : page
            );
            this.category = Category.ALL;
            this.country = Country.ALL;
        }
        this.q = q?.filter(phrase => !Utils.isEmptyOrWhiteSpace(phrase));
    }

    /**
     * Returns the query to the Top headlines endpoint in textual format which can be sent along as the part of the request url.
     */
    public toString(): string {
        let query = '';

        if(this.category != Category.ALL) {
            query += `&category=${Category[this.category].toString().toLowerCase()}`;
        }
        if(this.country != Country.ALL) {
            query += `&country=${Country[this.country].toString().toLowerCase()}`;
        }
        if(this.language != Language.ALL) {
            query += `&language=${Language[this.language].toString().toLowerCase()}`;
        }
        if(this.q && this.q?.length != 0) {
            query += `&q=`;
            this.q.forEach(keyword => {
                // If a syntagm found instead a word we will add the parts of the syntagm as an independent word.
                // Double occurrences will be omitted by using a set.
                const wordsWithoutWhiteSpace = new Set(keyword.trim().split(new RegExp(/\s/g)));
                wordsWithoutWhiteSpace.forEach(word => { query += `+${word}`; });
            });
        }
        if(this.sources && this.sources?.length != 0) {
            query += `&sources=`;
            for(let i = 0; i < this.sources.length; i++) {
                query += this.sources[i];
                // The list is comma-seperated, but after the last source id in the list there is no comma (,).
                if(i < this.sources.length - 1) {
                    query += ',';
                }
            }
        }
        query += `&pageSize=${this.pageSize}&page=${this.page}`;

        return query;
    }
}