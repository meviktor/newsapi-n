import { ArticleQuery } from "../common/articleQuery";
import { Phrase } from "./phrase";
import { SortBy } from "../common/sortBy";
import { Language } from "../common/language";
import { Utils } from "../common/utils";

/**
 * Represents a query can be sent to the Everything endpoint of the News API.
 */
export class EverythingQuery extends ArticleQuery {
    /**
     * The maximum number of sources can be send to the api when searching.
     */
    static SOURCES_MAX_SIZE: number = 20;

    readonly q?: Phrase;
    readonly qInTitle?: Phrase;
    readonly from?: Date;
    readonly to?: Date;
    readonly sortBy: SortBy;
    readonly domains?: string[];
    readonly excludeDomains?: string[];

    /**
     * Creates a query object to the Everything endpoint of the News API.
     * @throws An Error if none of the following query parameters are provided: q, qInTitle, sources, domains.
     */
    public constructor(
        q?: Phrase,
        qInTitle?: Phrase,
        sources?: string[],
        domains?: string[],
        excludeDomains?: string[],
        from?: Date,
        to?: Date,
        sortBy: SortBy = SortBy.PUBLISHEDAT,
        language: Language = Language.ALL,
        pageSize: number = 20,
        page: number = 1
    ) {
        if((!q || q?.toString() == '') && (!qInTitle || qInTitle?.toString() == '') && (!sources || sources?.length == 0) && (!domains || domains?.length == 0)){
            throw new Error('Required parameters are missing, the scope of your search is too broad. Please set any of the following required parameters and try again: q, qInTitle, sources, domains.');
        }

        super(
            sources?.filter(source => !Utils.isEmptyOrWhiteSpace(source)).slice(0, EverythingQuery.SOURCES_MAX_SIZE),
            language,
            (pageSize < 1) ? 1 : ((pageSize <= 100) ? pageSize : 100),
            (page < 1) ? 1 : page
        );
        this.q = q;
        this.qInTitle = qInTitle;
        this.from = from;
        this.to = to;
        this.sortBy = sortBy;
        this.domains = domains?.filter(domain => !Utils.isEmptyOrWhiteSpace(domain) && Utils.checkHostName(domain));
        this.excludeDomains = excludeDomains?.filter(domain => !Utils.isEmptyOrWhiteSpace(domain) && Utils.checkHostName(domain));
    }

    /**
     * Returns the query to the Everything endpoint in textual format which can be sent along as the part of the request url.
     */
    public toString(): string {
        let query = '';

        if(this.q && this.q?.toString() != '') {
            query += `&q=${this.q.toString()}`;
        }
        if(this.qInTitle && this.qInTitle?.toString() != '') {
            query += `&qInTitle=${this.qInTitle.toString()}`;
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
        if(this.domains && this.domains?.length != 0) {
            query += `&domains=`;
            for(let i = 0; i < this.domains.length; i++) {
                query += this.domains[i];
                // The list is comma-seperated, but after the last source id in the list there is no comma (,).
                if(i < this.domains.length - 1) {
                    query += ',';
                }
            }
        }
        if(this.excludeDomains && this.excludeDomains?.length != 0) {
            query += `&excludeDomains=`;
            for(let i = 0; i < this.excludeDomains.length; i++) {
                query += this.excludeDomains[i];
                // The list is comma-seperated, but after the last source id in the list there is no comma (,).
                if(i < this.excludeDomains.length - 1) {
                    query += ',';
                }
            }
        }
        if(this.from) {
            query += `&from=${Utils.formatDate(this.from)}`;
        }
        if(this.to) {
            query += `&to=${Utils.formatDate(this.to)}`;
        }
        if(this.sortBy != SortBy.PUBLISHEDAT) {
            query += `&sortBy=${SortBy[this.sortBy].toString().toLowerCase()}`;
        }
        if(this.language != Language.ALL) {
            query += `&language=${Language[this.language].toString().toLowerCase()}`;
        }
        query += `&pageSize=${this.pageSize}&page=${this.page}`;
        
        return query;
    }
}