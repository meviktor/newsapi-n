/**
 * Represents an article which is returned as part of the response of the Everything and Top headlines endpoints of the News API.
 */
export interface Article {
    readonly sourceId: string | null;
    readonly sourceName: string | null;
    readonly author: string | null;
    readonly title: string | null;
    readonly description: string | null;
    readonly url: string | null;
    readonly urlToImage: string | null;
    readonly publishedAt: Date | null;
    readonly content: string | null;
}