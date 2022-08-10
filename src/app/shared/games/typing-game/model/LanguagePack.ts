import { WordTranslation } from "./WordTranslation";

/**
 * A language pack represent's some concept that has been split into 10 words (bitsize chunks) for learning
 * words within a set that revolves around some concept such as `eating-at-a-resturant` or `100-most-common-words`.
 */
export class LanguagePack {

    sourceCountryCode: string;
    targetCountryCode: string;
    languagePackName: string;   
    packs: Pack[];
    
}

export class Pack {

    packId: string;
    packNumber: number;
    wordTranslations: WordTranslation[];
    
}
