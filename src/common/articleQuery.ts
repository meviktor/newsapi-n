import { Language } from "./language";

/**
 * Common base class of the types EverythingQuery and TopHeadlineQuery.
 */
export abstract class ArticleQuery {
    /** Maximum number of news on one page. */
    static PAGE_SIZE_MAX: number = 100;

    readonly sources?: string[];
    readonly language: Language;
    readonly pageSize: number;
    readonly page: number;

    public constructor(sources?: string[], language: Language = Language.ALL, pageSize: number = 20, page: number = 1) {
        this.pageSize = pageSize;
        this.language = language;
        this.page = page;
        this.sources = sources;
    }
}