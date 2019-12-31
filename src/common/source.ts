/**
 * Represents a news source which is returned as part of the response of the Sources endpoint of the News API.
 */
export interface Source {
    readonly id: string | null;
    readonly name: string | null;
    readonly description: string | null;
    readonly url: string | null;
    readonly category: string | null;
    readonly language: string | null;
    readonly country: string | null;
}