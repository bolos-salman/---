const fs = require("fs");
const path = require("path");

// Define the names of the 10 input files
const inputFiles = [
  "file1.txt",
  "file2.txt",
  "file3.txt",
  "file4.txt",
  "file5.txt",
  "file6.txt",
  "file7.txt",
  "file8.txt",
  "file9.txt",
  "file10.txt",
];

// Output file
const outputFile = "output.txt";

// Function to copy the required lines from the files
async function copyLines() {
  const outputStream = fs.createWriteStream(outputFile);

  for (let i = 0; i < inputFiles.length; i++) {
    const file = inputFiles[i];
    const linesToCopy = i + 1; // File i (0-indexed) should contribute i + 1 lines

    try {
      const data = await fs.promises.readFile(file, "utf8");
      const lines = data.split("\n");

      // Get the number of lines we need to copy, if the file is smaller, just copy all lines
      const linesToWrite = lines.slice(0, linesToCopy);

      // Write these lines to the output file
      linesToWrite.forEach((line) => outputStream.write(line + "\n"));
    } catch (err) {
      console.error(`Error reading file ${file}: ${err.message}`);
    }
  }

  outputStream.end(() => {
    console.log("File copying completed.");
  });
}

// Start the copying process
copyLines();
