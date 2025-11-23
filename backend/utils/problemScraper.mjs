import '../config/config.mjs';
import '../config/db.mjs';

import axios from 'axios';
import { load } from 'cheerio';

import mongoose from 'mongoose';

const Problem = mongoose.model('Problem');

const stopSelector = 'h1, h2, h3, h4, h5, h6'

async function fetchProblemData(year, level, version, number) {
    const url = `https://artofproblemsolving.com/wiki/index.php/${year}_AMC_${level}${version}_Problems/Problem_${number}`;
    try {
        const { data } = await axios.get(url);

        const $ = load(data);

        const problemElements = $('[id^="Problem"]').closest('h2').nextUntil(stopSelector).slice(0, -1);

        let problem = '';
        problemElements.each(function() {
            problem += $(this).html().trim() + '\n';
        });

        const answerChoices = [];
        const imgAltTexts = []

        $('[id^="Problem"]').closest('h2').nextUntil(stopSelector).last().find('img').each( (_, imgElement) => {
            if ($(imgElement).next().is('h2')) {
                imgAltTexts.push($(imgElement).attr('alt').trim());
                return false;
            }
            imgAltTexts.push($(imgElement).attr('alt')?.trim());
        });

        const imgAltText = imgAltTexts.join(' ');

        if (imgAltText) {
            const cleanedAltText = imgAltText.replace(/\s/g, '');
            const regex = /([A-E])[\}\)\s]*([\s\S]*?)(?=(?:\\qquad|\$|\\\\\\\\))/g;
            let match;
            while ((match = regex.exec(cleanedAltText)) !== null) {
                answerChoices.push(`${match[2].trim()}`);
            }
        }

        const answers = {a: answerChoices[0], b: answerChoices[1], c: answerChoices[2], d: answerChoices[3], e: answerChoices[4]};

        const solutions = [];
        let currentSolution = [];

        $('h2').each((_, h2Element) => {
            const h2Text = $(h2Element).text().trim();

            if (h2Text.startsWith('Solution')) {
                $(h2Element).nextAll('p').each((_, pElement) => {
                    if ($(pElement).next().is('h2')) {
                        currentSolution.push($(pElement).html().trim());
                        return false;
                    }
                    currentSolution.push($(pElement).html().trim());
                });
                if (currentSolution.length > 0) {
                    solutions.push(currentSolution.join(' '));
                }
                currentSolution = [];
            }
        });
        
        return { problem, answers, solutions };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchCorrectAnswer(year, level, version, number) {
    const url = `https://artofproblemsolving.com/wiki/index.php?title=${year}_AMC_${level}${version}_Answer_Key`;
    try {
        const { data } = await axios.get(url);

        const $ = load(data);

        const correctAnswer = $('ol li').eq(number - 1).html().trim();

        return correctAnswer;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// TODO: function to save to mongo

async function main() {
    for (let year = 2002; year <= 2025; year++) {
        for (let level of [10, 12]) {
            for (let version of ['A', 'B']) {
                for (let number = 1; number <= 25; number++) {
                    const contest = [ [year, level, version, number] ];
                    const { problem, answers, solutions } = await fetchProblemData(year, level, version, number);
                    console.log(problem, year, level, version, number)

                    const correctAnswer = await fetchCorrectAnswer(year, level, version, number);
                    const category = { alg: false, combo: false, geo: false, nt: false };

                    const fullData = { problem, answers, correctAnswer, solutions, year, level, version, number, category };
                    try {
                        const searchDatabase = await Problem.findOne({ problem });
                        if (!searchDatabase) {
                            await Problem.create(fullData);
                        }
                        else {
                            await searchDatabase.year.push(year);
                            await searchDatabase.level.push(level);
                            await searchDatabase.version.push(version);
                            await searchDatabase.number.push(number);
                            await searchDatabase.save();
                        }
                    }
                    catch (err) {
                        console.log(fullData);
                    }
                }
            }
        }
    }
}

// const debug = await fetchProblemData(2002, 12, 'A', 1);
// console.log(debug);
main();