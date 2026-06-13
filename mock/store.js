const bcrypt = require("bcryptjs");
const crypto = require("crypto");

let users = [];
let contacts = [];
const DEMO_USER_ID = "demo-user-1";

async function seed() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("demo123", salt);
  users = [
    {
      id: DEMO_USER_ID,
      name: "Demo User",
      email: "demo@demo.com",
      password: hashedPassword
    }
  ];
  contacts = [
    {
      _id: "contact-1",
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "555-0101",
      type: "Personal",
      user: DEMO_USER_ID,
      date: new Date()
    },
    {
      _id: "contact-2",
      name: "John Smith",
      email: "john@example.com",
      phone: "555-0102",
      type: "Work",
      user: DEMO_USER_ID,
      date: new Date()
    }
  ];
}

function newId() {
  return crypto.randomBytes(8).toString("hex");
}

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function findUserById(id) {
  return users.find(u => u.id === id);
}

function createUser({ name, email, password }) {
  const user = { id: newId(), name, email, password };
  users.push(user);
  return user;
}

function getContactsForUser(userId) {
  return contacts
    .filter(c => c.user === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function createContact(data) {
  const contact = { _id: newId(), ...data, date: new Date() };
  contacts.push(contact);
  return contact;
}

function findContactById(id) {
  return contacts.find(c => c._id === id);
}

function updateContact(id, updates) {
  const index = contacts.findIndex(c => c._id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updates };
  return contacts[index];
}

function deleteContact(id) {
  const index = contacts.findIndex(c => c._id === id);
  if (index === -1) return false;
  contacts.splice(index, 1);
  return true;
}

module.exports = {
  seed,
  DEMO_USER_ID,
  findUserByEmail,
  findUserById,
  createUser,
  getContactsForUser,
  createContact,
  findContactById,
  updateContact,
  deleteContact
};
