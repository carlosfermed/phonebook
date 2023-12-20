const http = require("node:http");
let contacts = require("./contacts");
const getList = require("./getList");
const deleteContact = require("./delete");
const redirect = require("./redirect");

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {

    const urlParts = req.url.split("/");

    if (urlParts.includes("delete")) {
        // console.log('Ha entrado :>> ');
        idToDelete = urlParts[2];
        // console.log("filteredContacts: ", deleteContact(contacts, idToDelete));
        contacts = deleteContact(contacts, idToDelete);
        redirect(res);
    }
    else if (urlParts.includes("new")) {
        createNewContact(contacts);
    }
    else if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");    
        const responseBody = getList(contacts);    
        res.end(responseBody);
    }
    else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");    
        res.write("404 Web not found");
        res.end();
    }

}).listen(PORT, () => console.log('Server is listening in port', PORT));



