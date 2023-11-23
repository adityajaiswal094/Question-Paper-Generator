# Reelo Assignment - Question Paper Generator

## About this application

This Node.js application is a question paper generator which generates a question paper containing 3 levels of difficulty namely `Easy`, `Medium` and `Hard` based on the following queries provided by the user:

- Subject name
- Total marks
- What proportion of marks distributed among the 3 difficulty levels
- What proportion of marks a particular topic should contain

## Getting Started

1. Fork this repository and clone it into your local system.
2. Open it in your IDE.
3. Open the terminal and run `npm install` to install all the necessary packages.
4. Run `npm run dev` to start the application.

## Testing the APIs

1. This application contains APIs for 2 `GET` requests.
2. For the first `GET` request, users can provide subject, total marks, and what proportion of marks each difficulty level should contain.

   Eg: `http://localhost:4000/generatepaper?subject=Mathematics&totalMarks=70&easy=0.4&medium=0.4&hard=0.2`.

3. For the second `GET` request, users can provide subject, total marks, what proportion of total marks each difficulty level should contain and what proportion of total marks particular topic should contain. At the current moment, users can add **ONLY 1** topic for the last condition mentioned.

   Eg: `http://localhost:4000/generatepaper/topic?subject=Mathematics&topic=Geometry&topicPercentage=0.2`.

4. Users can provide proportions for either 1 or 2 or all 3 difficulty levels. If proportion for only 1 difficulty level is provided, the application will calculate the remaining proportion and divide it equally into the other 2 levels.
5. If the proportions for any 2 difficulty levels are provided, the remaining proportion is calculated and assigned to the 3rd level.

## Things to Note

1. This application currently supports only 2 subjects namely Physics and Mathematics.
2. The default subject is set as `Physics`, i.e. if no subject is provided as query parameter, the application will generate a Physics question paper.
3. The default total marks is set as `100`, i.e. if total marks is not provided as query parameter, the application will generate a question paper of full marks 100.
4. The default proportions for each difficulty are set as **0.2** for Easy, **0.5** for Medium and **0.3** for Hard. If proportions for all 3 difficulty levels do not add up to 100%, then the default proportions are assigned to each difficulty level.
5. The second api can be tested for topics **Waves** in Physics and **Geometry** in Mathematics. It **may** provide undesired results for other topics.
6. Since the question bank doesn't have enough questions on every topic present in the data, it may produce undesired results sometimes.
7. Please try to stick to the conventions and notes mentioned to get the desired results.
8. Finally, feel free to add to the application.
