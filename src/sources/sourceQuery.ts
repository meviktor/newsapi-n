import { Category } from "../common/category";
import { Country } from "../common/country";
import { Language } from "../common/language";

/**
 * Represents a query can be sent to the Sources endpoint of the News API.
 */
export class SourceQuery {
    readonly category: Category;
    readonly country: Country;
    readonly language: Language;

    public constructor(category: Category = Category.ALL, country: Country = Country.ALL, language: Language = Language.ALL) {
        this.category = category;
        this.country = country;
        this.language = language;
    }

    /**
     * Returns the query to the Sources endpoint in textual format which can be sent along as the part of the request url.
     */
    public toString(): string {
        let query = '';

        if(this.category != Category.ALL){
            query += `&category=${Category[this.category].toString().toLowerCase()}`;
        }
        if(this.country != Country.ALL){
            query += `&country=${Country[this.country].toString().toLowerCase()}`;
        }
        if(this.language != Language.ALL){
            query += `&language=${Language[this.language].toString().toLowerCase()}`;
        }
        
        return query;
    }
}