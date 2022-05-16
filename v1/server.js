let http = require('http');
let fs= require('fs');
let server = http.createServer(function (req, res)
{
    console.log("O cerere;");
    let url_parts=new URL(req.url,'http://localhost:8080/');
    if(url_parts.pathname === '/cale'){
        var query=url_parts.searchParams;
        fs.appendFileSync('date.txt', query.get('nume') + ', ' + query.get('prenume') + ', ' + query.get('email') + ', ' + query.get('atasament') + '\n');
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(query.get('nume') + ', ' + query.get('prenume') + ', ' + query.get('email') + ', ' + query.get('atasament'));}
}).listen(8080);



console.log ('Serverul creat asteapta cereri la http://localhost:8080/');