import * as cheerio from 'cheerio';

export interface IContentParserProvider {
    provide(): IContentParser[];
}
export interface IContentParser {
    name: string;
    parse(context: IParseContext): any
}

export interface IParseContext {
    selector: cheerio.Selector;
    parseFragment(key: string, selector: cheerio.Selector): any;
}

export class ParserService {

    private parsers: Map<string, IContentParser> = new Map();

    constructor() {
        // Push all known parsers into the parser map
        this.addParsers('./Clubhouse');
        this.addParsers('./Owners');
        this.addParsers('./Scoreboard');
    }

    parseHtmlContent(key: string, html: string): any {
        const selector = cheerio.load(html);

        let rootParser = this.parsers.get(key);

        if (!rootParser) {
            throw new Error(`Unable to find parser '${key}' avaliable parsers -> [${this.parsers.keys().map(k => `'${k}'`).join(', ')}]`)
        }

        return rootParser.parse(new ParseContext(selector, this));
    }

    getParser(key: string) {
        return this.parsers.get(key);
    } x

    private addParsers(path: string) {
        let ParserImplCtor: any = require(path);
        ParserImplCtor = ParserImplCtor.default ? ParserImplCtor.default : ParserImplCtor;

        let instance: any = new ParserImplCtor();

        // TODO: Could make this better
        if (instance.parse && instance.name) {
            this.parsers.set(instance.name, instance);
        }

        if (instance.provide) {
            let instances: IContentParser[] = instance.provide();

            if (instances) {
                instances.forEach(childParser => this.parsers.set(childParser.name, childParser))
            }
        }
    }
}

class ParseContext implements IParseContext {
    constructor(public selector: cheerio.Selector, private parent: ParserService) {
    }

    parseFragment(key: string, selector: cheerio.Selector): any {
        let parser = this.parent.getParser(key);
        parser.parse(new ParseContext(selector, this.parent));
    }
}

