const formidable = require("formidable");       // Uso de librería de terceros.

// Comenzamos con el valor 4 ya que hemos introducido 3 contactos por defecto.
let idCount = 4;    

function saveContact(req, res, contacts, redirect) {

    const form = new formidable.IncomingForm({  // formidable ya maneja los eventos "data" y "end".
        uploadDir: __dirname + '/public/img'
    }); 
    try {

        form.parse(req, (err, contacto, files) => {
            if (err) {
                console.log('err :>> ', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error interno del servidor');
                return
            }
            if (Object.keys(files).length > 0) {

                // `fields` contiene los datos del formulario (name, phone).
                // `files` contiene los archivos (en este caso, `image`).

                const contactToAdd = {
                    id: idCount++,
                    name: contacto.name[0],
                    phone: contacto.phone[0],
                    image: `/public/img/${files.image[0].originalFilename}`
                }
                console.log("^^^^^^^^^^^^^^^^^^")
                console.log('contactToAdd con foto :>> ', contactToAdd);
                contacts.push(contactToAdd);
                redirect(res);
            }  
            else {
                const contactToAdd = {
                    id: idCount++,
                    name: contacto.name[0],
                    phone: contacto.phone[0],
                    image: ""
                }
                contacts.push(contactToAdd);
                redirect(res);
            }          
        });
    }
    catch (err) {
        console.log('err :>> ', err);
        res.end()
        return;
    }
}

module.exports = saveContact;

// FUNCIÓN para gestionar el contacto sin foto.

// function saveRawContact(req, res, contacts, redirect) {
//     let body = "";
//     req.on("data", (data) => {
//         body += data;
//     })

//     req.on("end", () => {
//         const parsedContact = queryString.parse(body);
//         console.log('parsedContact :>> ', parsedContact);
//         const contactToAdd = {
//             id: idCount++,
//             name: parsedContact.name,
//             phone: parsedContact.phone,
//             img: parsedContact.image
//         }
//         contacts.push(contactToAdd);
//         redirect(res);
//     })
// }
