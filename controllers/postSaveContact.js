const queryString = require("querystring"); // Uso de librería de terceros.

let idCount = 4;    // Comenzamos con el valor 4 dado que la agenda tiene 3 contactos por defecto.

function saveContact(req, res, contacts, redirect) {
    let body = "";
    req.on("data", (data) => {
        body += data;
    })

    req.on("end", () => {
        const parsedContact = queryString.parse(body);
        
        const contactToAdd = {
            id: idCount++,
            name: parsedContact.name,
            phone: parsedContact.phone,
            img: parsedContact.image
        }
        contacts.push(contactToAdd);
        redirect(res);
    })
}

module.exports = saveContact;