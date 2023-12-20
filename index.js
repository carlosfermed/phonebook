const http = require("node:http");
let contacts = require("./data/data");
const {getList, getContactForm, saveContact} = require("./controllers");
const {deleteContact, redirectToMainPage} = require("./util");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {

    const urlParts = req.url.split("/");

    if (urlParts.includes("delete")) {                              // Borrar contacto.
        contacts = deleteContact(contacts, urlParts[2]);
        redirectToMainPage(res);
    }
    else if (urlParts.includes("new")) {                            // Servir formulario para añadir contacto.
        res.end(getContactForm(contacts));
    }
    else if (req.url === "/") {                                     // Servir página principal.
        res.writeHead(200, "content-type", "text/html");  
        res.end(getList(contacts));
    }
    else if (urlParts.includes("save") && req.method === "POST") {  // Añadir contacto a la agenda.
        saveContact(req, res, contacts, redirectToMainPage);        
    }
    else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");    
        res.write("404 Web not found");
        res.end();
    }

}).listen(PORT, () => console.log('Server is listening in port', PORT));



