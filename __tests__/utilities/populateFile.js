const fs = require("fs");
const utilities = require("../../src/utilities/utilities");

describe("populating the file", () => {
    test("should write to file", () => {
        utilities.writeToFile("test.json", { data: "test" });
        fs.readFile("test.json", (err, data) => {
            if (!err) {
                const text = data.toString();
                expect(text).toBe('{"data":"test"}');
            }
        });
        fs.unlink("test.json", (err) => {
            if (err) throw err;
        });
    });
});
