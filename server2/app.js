// ChatGPT was used in this lab
const http = require('http');
const url = require('url');
const messages = require('./messages');

let dictionary = [];
let totalRequests = 0;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    totalRequests++;
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/definitions') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const { word, definition } = JSON.parse(body);
                    if (typeof word !== 'string' || typeof definition !== 'string' || !word.trim() || !definition.trim()) {
                        throw new Error(messages.invalidInput);
                    }

                    const existingWord = dictionary.find(entry => entry.word === word);
                    if (existingWord) {
                        res.writeHead(400, { 'Content-Type': 'application/json' });
                        return res.end(JSON.stringify({ message: messages.entryExists(word) }));
                    }
                    dictionary.push({ word, definition });
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        message: messages.entryRecorded(totalRequests, word, definition),
                        totalEntries: dictionary.length
                    }));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: messages.invalidInput }));
                }
            });
        } else if (req.method === 'GET') {
            const word = parsedUrl.query.word;
            const entry = dictionary.find(item => item.word === word);
            if (entry) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(entry));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: messages.wordNotFound(totalRequests, word) }));
            }
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: messages.notFound }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
