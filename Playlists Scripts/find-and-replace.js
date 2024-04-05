const fs = require('fs');
const c = require('colors');


const YTM = 'Music/YouTubeMusic.txt';
const YT = 'Music/YouTube.txt';


const BROWSE = 'browse/VL';
const WWW = 'www.youtube.com';
const MUSIC = 'music.youtube.com';

fs.readFile(YTM, 'utf8', (err, data) => {
    if (err) {
        console.error(c.bold.brightRed('⚠ Error reading the file:'), err);
        return;
    }

    const lines = data.split('\n');
    let found = false;

    lines.forEach((line, lineNumber) => {
        if (line.includes(BROWSE) || line.includes(WWW)) {
            console.error(c.bold.brightRed(`⚠ Unwanted string found at line ${lineNumber + 1} within ${YTM} ⚠`));
            let highlightedLine = line.replace(BROWSE, c.bold.brightYellow(BROWSE));
            highlightedLine = highlightedLine.replace(WWW, c.bold.brightYellow(WWW));
            console.error(highlightedLine);
            found = true;
        }
    });

    if (!found) {
        console.log(c.bold.brightGreen(`✅ No unwanted strings found in ${YTM}, now searching within ${YT}`));

        fs.readFile(YT, 'utf8', (err, data) => {
            if (err) {
                console.error(c.bold.brightRed('⚠ Error reading the file:'), err);
                return;
            }

            const lines = data.split('\n');
            let found = false;

            lines.forEach((line, lineNumber) => {
                if (line.includes(BROWSE) || line.includes(MUSIC)) {
                    console.error(c.bold.brightRed(`⚠ Unwanted string found at line ${lineNumber + 1} within ${YT}`));
                    let highlightedLine = line.replace(BROWSE, c.bold.brightYellow(BROWSE));
                    highlightedLine = highlightedLine.replace(MUSIC, c.bold.brightYellow(MUSIC));
                    console.log(highlightedLine);
                    found = true;
                }

            });

            if (!found) {
                console.log(c.bold.brightGreen(`✅ No unwanted strings found in ${YT}, now executing duplicate & replace functions`));

                function replace(inputFile, outputFile, replacements, callback) {

                    fs.readFile(inputFile, 'utf8', (err, data) => {
                        if (err) {
                            console.error(c.bold.brightRed(`⚠ Error reading ${inputFile}:`), err);
                            return;
                        }


                        let replacedData = data;
                        const {
                            find,
                            replace
                        } = replacements;
                        replacedData = replacedData.replace(new RegExp(find, 'g'), replace);


                        fs.writeFile(outputFile, replacedData, 'utf8', err => {
                            if (err) {
                                console.error(c.bold.brightRed(`⚠ Error writing to ${outputFile}:`), err);
                                return;
                            }

                            console.log(c.bold.brightGreen(`✅ ${outputFile} has been updated successfully.`));


                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    });
                }

                function duplicate(sourceFile, destinationFile, callback) {
                    fs.copyFile(sourceFile, destinationFile, err => {
                        if (err) {
                            console.error(c.bold.brightRed(`⚠ Error duplicating ${sourceFile}:`), err);
                            return;
                        }

                        console.log(c.bold.brightGreen(`✅ ${sourceFile} contents duplicated to ${destinationFile} successfully.`));


                        if (typeof callback === 'function') {
                            callback();
                        }
                    });
                }


                const SHARE_TO_NULL = {
                    find: '&feature=shared',
                    replace: ''
                };
                const BROWSE_TO_PLAYLIST = {
                    find: 'browse/VL',
                    replace: 'playlist?list='
                };
                const MUSIC_TO_WWW = {
                    find: 'music.',
                    replace: 'www.'
                };
                const WWW_TO_MUSIC = {
                    find: 'www.',
                    replace: 'music.'
                };

                replace(YTM, YTM, SHARE_TO_NULL, () => {
                    replace(YTM, YTM, BROWSE_TO_PLAYLIST, () => {
                        duplicate(YTM, YT, () => {
                            replace(YT, YT, MUSIC_TO_WWW, () => {
                                replace(YTM, YTM, WWW_TO_MUSIC, () => {
                                    console.log(c.bold.brightBlue("✅ Process complete"));
                                });
                            });
                        });
                    });
                });
            };
        });
    }
});