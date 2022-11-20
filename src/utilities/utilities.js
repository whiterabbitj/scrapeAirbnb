const fs = require("fs");

const clearOutputFileIfExists = async (filename) => {
    if (await fileExists(filename)) {
        fs.unlink(filename, (err) => {
            if (err) throw err;
        });
    }
};
const writeToFile = (filename, data) => {
    console.log(`Writing data to file...`);
    fs.writeFile(filename, JSON.stringify(data, null, 4), (error) => {
        if (error) console.log(`Failed to write data to file.`);
    })
    console.log(`Data successfully written to file.`);
};
const fileExists = async (path) =>
    !!(await fs.promises.stat(path).catch((e) => false));



module.exports =
    { writeToFile,
        clearOutputFileIfExists,
        fileExists};
