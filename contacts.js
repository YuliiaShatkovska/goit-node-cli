const path = require("path");

const fs = require("fs").promises;

const contactPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath);

    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((cont) => cont.id === contactId);

    return contact || null;
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const removeContact = contacts.find((contact) => contact.id === contactId);

    if (!removeContact) {
      return null;
    }

    const newContacts = contacts.filter((c) => c.id !== contactId);

    await fs.writeFile(contactPath, JSON.stringify(newContacts));
    return removeContact;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now().toString(), name, email, phone };

    contacts.push(newContact);

    await fs.writeFile(contactPath, JSON.stringify(contacts));

    return newContact;
  } catch (err) {
    console.log(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
