const http = require("node:http");
let contacts = require("./data");
const getList = require("./getList");
const deleteContact = require("./delete");
const redirect = require("./redirect");
const getContactForm = require("./getContactForm");
const queryString = require("querystring");
const { parse } = require("node:path");

const PORT = process.env.PORT || 3000;
let idCount = 4;

http.createServer((req, res) => {

    const urlParts = req.url.split("/");

    if (urlParts.includes("delete")) {
        idToDelete = urlParts[2];
        contacts = deleteContact(contacts, idToDelete);
        redirect(res);
    }
    else if (urlParts.includes("new")) {
        res.end(getContactForm(contacts));
    }
    else if (req.url === "/") {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html");    
        const responseBody = getList(contacts);    
        res.end(responseBody);
    }
    else if (urlParts.includes("save") && req.method === "POST") {
        // let body = "";
        // req.on("data", (data) => {
        //     body += data;
        // })
        // const parsedContact = queryString.parse(body);
        
        // const contactToAdd = {
        //     id: idCount++,
        //     name: parsedContact.name,
        //     phone: parsedContact.phone,
        //     img: parsedContact.image
        // }
        // contacts.push(contactToAdd);
        // redirect(res);

    }
    else {
        res.statusCode = 404;
        res.setHeader("content-type", "text/plain");    
        res.write("404 Web not found");
        res.end();
    }

}).listen(PORT, () => console.log('Server is listening in port', PORT));



