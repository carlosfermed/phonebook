const http = require("node:http");

const PORT = process.env.PORT || 3000;

const contacts = [
    {
        id: 1,
        name: "Robert",
        phone: "555-321233"
    },
    {
        id: 2,
        name: "Ian",
        phone: "535-098787"
    },
    {
        id: 3,
        name: "Jennifer",
        phone: "535-548887"
    }
]


http.createServer((req, res) => {

    res.statusCode = 200;
    res.setHeader("content-type", "text/html");

    const responseBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PhoneBook</title>
    </head>
    <body>
        <h1>The Minimalist PhoneBook</h1> 
        <table>
        <tr>
            <th>ID</th><th>Name</th><th>Phone</th><th>Delete</th>            
        </tr>
        ${contacts.map(createContactItem).join('')}
    </table>    
    </body>
    </html>`;

    res.end(responseBody);

}).listen(PORT, () => console.log('Server is listening in port', PORT));


function createContactItem(contact) {
    return `<tr><td>${contact.id}</td><td>${contact.name}</td><td>${contact.phone}</td><td><a href=/delete/${contact.id}>delete</a></tr>`;
}