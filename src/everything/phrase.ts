import { Utils } from "../common/utils";

/**
 * Search phrase can be passed as a parameter (q) to the query (EverythingQuery) sent to the Everything endpoint of the News API.
 */
export class Phrase {
    readonly exactMatches?: string[];
    readonly presentWords?: string[];
    readonly absentWords?: string[];

    /**
     * Creates a phrase which words, syntagms are (not) wanted to be in the result arctiles.
     * @param exactMatches Contains those syntagms for which we want to get an exact match in the articles.
     * @param presentWords Words wanted to be present in the articles.
     * @param absentWords Words wanted to be absent.
     */
    public constructor(exactMatches?: string[], presentWords?: string[], absentWords?: string[]) {
        this.exactMatches = exactMatches?.filter(str => !Utils.isEmptyOrWhiteSpace(str));
        this.presentWords = presentWords?.filter(str => !Utils.isEmptyOrWhiteSpace(str));
        this.absentWords = absentWords?.filter(str => !Utils.isEmptyOrWhiteSpace(str));
    }

    /**
     * Returns the parameter value as URL encoded.
     */
    public toString(): string {
        let phrase = '';

        if(this.exactMatches && this.exactMatches?.length != 0) {
            this.exactMatches.forEach(syntagm => { phrase += `"${syntagm}"`; });
        }
        if(this.presentWords && this.presentWords?.length != 0) {
            this.presentWords.forEach(presentWord => {
                // If a syntagm found instead a word we will add the parts of the syntagm as an independent word.
                // Double occurrences will be omitted by using a set.
                const wordsWithoutWhiteSpace = new Set(presentWord.trim().split(new RegExp(/\s/g)));
                wordsWithoutWhiteSpace.forEach(word => { phrase += `+${word}`; });
            });
        }
        if(this.absentWords && this.absentWords?.length != 0) {
            this.absentWords.forEach(absentWord => {
                // If a syntagm found instead a word we will add the parts of the syntagm as an independent word.
                // Double occurrences will be omitted by using a set.
                const wordsWithoutWhiteSpace = new Set(absentWord.trim().split(new RegExp(/\s/g)));
                wordsWithoutWhiteSpace.forEach(word => { phrase += `-${word}`; });
            });
        }
        // If all parts of the phrase are undefined, then the phrase is an empty string.
        return encodeURI(phrase);
    }
}