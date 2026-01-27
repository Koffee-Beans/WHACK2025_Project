# MathByte

This project was submitted to [Wellesley Hacks 2025](https://www.wellesleyhacks.org/) and won the **Best use of Google AI Tools** and **Best Use of AI powered by Reach Capital** awards.

## Inspiration
We were challenged to make an app that would create social impact, and one of the first things that came to mind was education. Due to one of our members' experience with competitive math in high school, we opted to make an application that would help make preparing for such math contests more accessible, giving the resources to succeed to students across the country.

## What it does
A user can log in (using Discord OAuth), and be presented with short quizzes of 5 problems where they can try to simulate a shorter AMC testing environment. Students can take these quizzes, look back on the answers they chose, and interact with Gemini, which uses solutions scraped from the Art of Problem Solving website in order to guide the student to understanding problems that they missed or got stuck on.

## How we built it
We used a MERN stack (Mongo, Express, React, Node), along with integration with Google Gemini. We also used passport-discord for authentication and Render to deploy our app.

## Challenges we ran into
Art of Problem Solving has some very inconsistent typesetting, so it was difficult to get a regular expression that would properly parse the answers. A lot of our answers ended up with extra noise and random backslashes, which we were unfortunately unable to fix, but did consider using an LLM to parse the LaTeX into a JSON before realizing that we did not have 1800 credits at our disposal.

## What's next for MathByte
Having image processing through Google Gemini, so that students can take pictures of their work and submit it to be constructively criticized. We'd also like to have personalized difficulty levels; we had it in our data schemas, but unfortunately weren't able to implement it today. And of course, there's always room for better design.

## Try it out
- [Website](https://whack-2025.onrender.com/)
- [Devpost Submission](https://devpost.com/software/sinewave)