const fs = require("fs/promises");
const path = require("path");
const id = require("bson-objectid");

//   Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = await allContacts.find(
    (el) => Number(el.id) === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(
    (el) => Number(el.id) === Number(contactId)
  );
  if (idx === -1) {
    return null;
  }
  const [result] = allContacts.splice(idx, 1);
  return result;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: id(),
  };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
