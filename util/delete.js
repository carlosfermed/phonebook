
function deleteContact(contacts, id) {
    filteredContacts = contacts.filter(contacto => contacto.id !== parseInt(id));
    return filteredContacts;
}

module.exports = deleteContact;