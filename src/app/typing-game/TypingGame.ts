enum LetterCorrectness {
    "CORRECT",
    "INCORRECT",
    "NOT_TYPED"
}
    
export class TypingGame {

    private translations = [
        'prueba', 
        'país', 
        'nombre', 
        'el / la', 
        'ser',
        'de', 
        'y', 
        'uno / una', 
        'a', 
        'en', 
        'su', 
        'ellos', 
        'a',
        'uno', 
        'tener', 
        'esto', 
        'de', 
        'o', 
        'tenido', 
        'por',
        'no', 
        'palabra', 
        'pero', 
        'qué', 
        'alguno', 
        'nosotros'
    ];

    private currentWordIndex = 0;

    private wordsToType = [
        ['test', []],
        ['country', []],
        ['name', []],
        ["the", []],
        ["be",[]],
        ["of",[]],
        ["and",[]],
        ["a",[]],
        ["to",[]],
        ["in",[]],
        ["his",[]],
        ["they",[]],
        ["at",[]],
        ["one",[]],
        ["have",[]],
        ["this",[]],
        ["from",[]],
        ["or",[]],
        ["had",[]],
        ["by",[]],
        ["not",[]],
        ["word",[]],
        ["but",[]],
        ["what",[]],
        ["some",[]],
        ["we",[]]
    ];

    constructor() {
        this.initalize();
    }

    initalize() {
        this.wordsToType.forEach(word => {
            var currentWord = word[0];
            var correctnessArray = [];
            for (var i = 0; i <currentWord.length; i++) {
                correctnessArray.push(LetterCorrectness[LetterCorrectness.NOT_TYPED]);
            }
            word[1] = correctnessArray;
        });
    }

    get wordsToTypeArray() {
        return this.wordsToType;
    }

    get currentWordTranslation() {
        return this.translations[this.currentWordIndex];
    }

    get currentWord() {
        return this.wordsToType[this.currentWordIndex][0].toString();
    }

    get allWords() {
        var words = "";
        this.wordsToType.map(function(val, index){
            words = words + " " + val[0];
        })
        return words;
    }

    /**
     * Returns a list of numbers that represents
     * the correct letters in the current word.
     */
    checkWord(input: string): boolean {
        var currentWordWithCorrectness = this.wordsToType[this.currentWordIndex];
        var currentWord: string = currentWordWithCorrectness[0].toString();
        var letterCorrectnessArray = new Array(currentWordWithCorrectness[1]);

        var index = 0;
        currentWord.split('').forEach(letterInCurrentWord => {
            var inputLetterForCurrentIndex = input.split('')[index];
            if (inputLetterForCurrentIndex == letterInCurrentWord) {
                letterCorrectnessArray[index] = LetterCorrectness[LetterCorrectness.CORRECT]
            } else {
                letterCorrectnessArray[index] = LetterCorrectness[LetterCorrectness.INCORRECT]
            }
            index ++;
        })

        this.wordsToType[this.currentWordIndex].pop();
        this.wordsToType[this.currentWordIndex].push(letterCorrectnessArray);

        return this.onCorrectWordMoveToNext(letterCorrectnessArray)
    }

    onCorrectWordMoveToNext(letterCorrectnessArray) {
        let totalMissingOrInCorrect = letterCorrectnessArray.filter(entry => {
            return entry == LetterCorrectness[LetterCorrectness.INCORRECT] || entry == LetterCorrectness[LetterCorrectness.NOT_TYPED];
        }).length;
        if (totalMissingOrInCorrect == 0) {
            if (this.currentWordIndex < this.wordsToType.length) {
            this.currentWordIndex ++;
            return true;
            }
        }
        return false;
    }

}
