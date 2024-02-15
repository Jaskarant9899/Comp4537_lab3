const http = require('http');
const url = require('url');

let dictionary = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/definitions') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const { word, definition } = JSON.parse(body);
                const existingWord = dictionary.find(entry => entry.word === word);
                if (existingWord) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ message: `Warning! '${word}' already exists.` }));
                }
                dictionary.push({ word, definition });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Request #${dictionary.length}`, dictionary }));
            });
        } else if (req.method === 'GET') {
            const word = parsedUrl.query.word;
            const entry = dictionary.find(item => item.word === word);
            if (entry) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(entry));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `Request# ${dictionary.length + 1}, word '${word}' not found!` }));
            }
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
