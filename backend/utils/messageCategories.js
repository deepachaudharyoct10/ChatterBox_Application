export const MESSAGE_CATEGORIES = [
    "Happy", "Sad", "Surprise", "Love", "Funny", "Angry", "Motivational",
    "Congratulations", "Apology", "Excited", "Nervous", "Grateful", "Curious",
    "Confused", "Proud", "Jealous", "Bored", "Scared", "Hopeful", "Disappointed",
    "Relieved", "Embarrassed", "Confident", "Nostalgic", "Sarcastic",
];

export const GUESS_OPTION_COUNT = 4;
export const MAX_GUESS_ATTEMPTS = 3;

const shuffle = (arr) => arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(([, v]) => v);

export const buildGuessOptions = (correctCategory) => {
    const distractors = shuffle(MESSAGE_CATEGORIES.filter(c => c !== correctCategory)).slice(0, GUESS_OPTION_COUNT - 1);
    return shuffle([correctCategory, ...distractors]);
};
