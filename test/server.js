const fs = require('fs');
const path = require('path');
const express = require('express');
const bp = require('body-parser');
const MarkdownIt = require('markdown-it');
const app = express();
const md = new MarkdownIt();

app.use(express.static('pub'));
app.use(bp.json());
app.use(bp.urlencoded({
    extended: true
}));

app.listen(3000, () => {
    console.log("Escuchando en: http://localhost:3000");
});

app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get('/priv', (request, response) => {
    fs.readdir(path.resolve(__dirname, 'priv'), (err, files) => {
        if (err) {
            console.error(err);
            response.json({ success: false });
        } else {
            response.json({ success: true, files: files.filter(file => file.endsWith('.md')) });
        }
    });
});

app.get('/priv/:filename', (request, response) => {
    let filename = request.params.filename;
    let filePath = path.resolve(__dirname, 'priv', filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            response.json({ success: false });
        } else {
            let htmlText = md.render(data);
            response.json({ success: true, htmlText: htmlText });
        }
    });
});

app.post('/', (request, response) => {
    console.log(request.body);
    let title = request.body.title;
    let content = request.body.content;

    let filename = title.replace(/\s+/g, '-') + '.md';
    let filePath = path.resolve(__dirname, 'priv', filename);
    
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(err);
            response.json({ success: false });
        } else {
            let htmlText = md.render(content);
            response.json({ success: true, htmlText: htmlText });
        }
    });
});
