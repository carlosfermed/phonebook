
const formidable = require("formidable");                               // Use of third-party library.


let idCount = 4;                                                        // We start with the 4 value since we have entered 3 contacts by default.

function saveContact(req, res, contacts, redirect) {

    const form = new formidable.IncomingForm({                          // 'formidable' already handles the "data" and "end" events.
        uploadDir: 'C:\\Users\\user\\Desktop\\phonebook\\public\\img',  // Image saving directory.
        allowEmptyFiles: true,                                          // It allows to not have to upload an image.
        minFileSize: 0                                                  // Since it is not mandatory to upload images, it is necessary to write 0 in this property.
    }); 
    try {
        form.parse(req, (err, contacto, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                console.log('err :>> ', err);
                res.end('Error interno del servidor');
                return;
            }
            if (Object.keys(files).length > 0) {
                const contactToAdd = {
                    id: idCount++,
                    name: contacto.name[0],
                    phone: contacto.phone[0],
                    image: files.image[0].newFilename
                }
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
