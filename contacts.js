import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function writeContact(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  try {
    console.log(contactsPath);
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((cont) => cont.id === contactId);
    return contactById || null;
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.find((contact) => contact.id === contactId);
    const filtredContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await writeContact(filtredContact);
    return removedContact || null;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    let contacts = await listContacts();
    const newContact = { id: crypto.randomUUID(), name, email, phone };
    contacts.push(newContact);
    await writeContact(contacts);
    return newContact;
  } catch (error) {
    throw error;
  }
}
export { addContact, removeContact, getContactById, listContacts };
