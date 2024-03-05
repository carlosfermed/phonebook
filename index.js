const http = require("node:http");
let contacts = require("./data/data");
const {getList, getContactForm, saveContact} = require("./controllers");
const {deleteContact, redirectToMainPage} = require("./util");
const { readFileSync } = require("node:fs");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {  

    const urlParts = req.url.split("/");

    if (urlParts.includes("delete")) {                              // Delete contact.                              
        contacts = deleteContact(contacts, urlParts[2]);                                 
        redirectToMainPage(res);
    }
    else if (urlParts.includes("new")) {                            // Serve form to add contact.
        res.end(getContactForm(contacts));
    }
    
    else if (urlParts.includes("save") && req.method === "POST") {  // Add contact to the app.
        saveContact(req, res, contacts, redirectToMainPage);        
    }
    else if (req.url === "/") {                                     // Serve main page.
        res.writeHead(200, "content-type", "text/html");  
        res.end(getList(contacts));
    }
    else if (req.url === "/styles.css") {                           // Serve style file.
        const data = readFileSync("./public/styles.css");
        res.writeHead(200, {"content-type": "text/css"});
        res.end(data);
    }
    else if (urlParts.includes("public")) {                         // Provide photo if it exists.
        res.end(readFileSync(`./public/img/${urlParts[3]}`))
    }
    else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");    
        res.write("404 Web not found");
        res.end();
    }

}).listen(PORT, () => console.log('Server is listening in port', PORT));



