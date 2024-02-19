const messages = {
    invalidInput: "Invalid input format",
    entryExists: word => `Warning! '${word}' already exists.`,
    entryRecorded: (requestNumber, word, definition) => `Request #${requestNumber}. New entry recorded: "${word} : ${definition}"`,
    wordNotFound: (requestNumber, word) => `Request# ${requestNumber}, word '${word}' not found!`,
    notFound: "Not Found",
};

module.exports = messages;
