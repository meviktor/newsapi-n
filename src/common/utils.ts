export class Utils{
    /**
     * Indicates whether a specified string is null, empty or consists only of white-space characters.
     * @param str The string to test.
     */
    static isEmptyOrWhiteSpace(str: string): boolean {
        return !str || !str.trim();
    }
    /**
     * Checks whether a specified string is a valid hostname or not.
     * @param str The string to test.
     */
    static checkHostName(str: string): boolean {
        const pattern = new RegExp('^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$');
        return pattern.test(str);
    }
    /**
     * Formats a date to the format "YYYY-MM-DD'T'HH:mm:ss" .
     * @param date The date to format as string.
     */
    static formatDate(date: Date): string {
        console.log(date);
        return date.toISOString().substr(0, 19);
    }
}