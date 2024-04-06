// ! npm packages
const fs = require('fs');
const c = require('colors');

// ! Replace function
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

// ! Duplicate function
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

// ! File paths
const YTM = 'Music/YouTubeMusic.txt';
const YT = 'Music/YouTube.txt';

// ! Unwanted strings
const BROWSE = 'browse/VL';
const WWW = 'www.youtube.com';
const MUSIC = 'music.youtube.com';
const FS = '&feature=shared'

// ! Find & replace objects
const STN = {
    find: '&feature=shared',
    replace: ''
};

const BTP = {
    find: 'browse/VL',
    replace: 'playlist?list='
};

const MTW = {
    find: 'music.',
    replace: 'www.'
};

const WTM = {
    find: 'www.',
    replace: 'music.'
};

fs.readFile(YTM, 'utf8', (err, data) => {
    if (err) {
        console.error(c.bold.brightRed('⚠ Error reading the file:'), err);
        return;
    }

    const lines = data.split('\n');
    let found = false;

    lines.forEach((line, lineNumber) => {
        if (line.includes(BROWSE) || line.includes(WWW) || line.includes(FS)) {
            console.error(c.bold.brightRed(`⚠ Unwanted string found at line ${lineNumber + 1} within ${YTM}`));
            let highlightedLine = line.replace(BROWSE, c.bold.brightYellow(BROWSE));
            highlightedLine = highlightedLine.replace(WWW, c.bold.brightYellow(WWW));
            highlightedLine = highlightedLine.replace(FS, c.bold.brightYellow(FS));
            console.error(highlightedLine);
            console.log('');
            console.info(c.bold.brightBlue(`ℹ Now executing replacing and duplicating functions`));
            replace(YTM, YTM, BTP, () => {
                console.log(c.bold.brightGreen(`✅ Successfully replaced any ${BTP.find} to ${BTP.replace} in ${YTM}`));
                replace(YTM, YTM, WTM, () => {
                    console.log(c.bold.brightGreen(`✅ Successfully replaced any ${WTM.find} to ${WTM.replace} in ${YTM}`));
                    replace(YTM, YTM, STN, () => {
                        console.log(c.bold.brightGreen(`✅ Successfully replaced any ${STN.find} to ${STN.replace} in ${YTM}`));
                        duplicate(YTM, YT, () => {
                            console.log(c.bold.brightGreen(`✅ Successfully duplicated ${YTM} to ${YT}`));
                            replace(YT, YT, MTW, () => {
                                console.log(c.bold.brightGreen(`✅ Successfully replaced any ${MTW.find} to ${MTW.replace} in ${YT}`));
                            });
                        });
                    });
                });
            });
            found = true;
        }
    })

    if (!found) {
        console.info(c.bold.brightBlue(`ℹ No unwanted strings found in ${YTM}, now duplicating and replacing to ${YT}`));
        duplicate(YTM, YT, () => {
            console.log(c.bold.brightGreen(`✅ Successfully duplicated ${YTM} to ${YT}`));
            replace(YT, YT, MTW, () => {
                console.log(c.bold.brightGreen(`✅ Successfully replaced any ${MTW.find} to ${MTW.replace} in ${YT}`));
                console.info(c.bold.brightBlue(`ℹ Process complete`));
            });
        });
    }
});