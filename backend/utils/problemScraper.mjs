import '../config/config.mjs';
import '../config/db.mjs';

import axios from 'axios';
import { load } from 'cheerio';

import mongoose from 'mongoose';

const Problem = mongoose.model('Problem');

async function fetchProblemData(year, level, version, number) {
    const url = `https://artofproblemsolving.com/wiki/index.php/${year}_AMC_${level}${version}_Problems/Problem_${number}`;
    try {
        const { data } = await axios.get(url);

        const $ = load(data);

        const problem = $('#Problem').closest('h2').next('p').html().trim();

        const answerChoices = [];
        const imgAltText = $('#Problem').closest('h2').next('p').next('p').find('img').attr('alt');

        if (imgAltText) {
            const regex = /\\textbf{(\([A-E]\))\s*}(.*?)(?:\\qquad|\$)/g;
            let match;
            while ((match = regex.exec(imgAltText)) !== null) {
                answerChoices.push(`${match[1]} ${match[2].trim()}`);
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
        
        const correctAnswer = null;
        const contest = [year, level, version, number];
        const category = { alg: false, combo: false, geo: false, nt: false };

        return { problem, answers, correctAnswer, solutions, contest, category };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// TODO: second scrape to get correct answer

// TODO: function to save to mongo

async function main() {
    // TODO: loop over all below variables
    const year = 2025, level = 12, version = 'A', number = 1;
    const problemData = await fetchProblemData(year, level, version, number);
    console.log(problemData)
    // TODO: save to mongo call function above
}

main();