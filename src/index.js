import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
const contacts = require('./contacts.js')
console.log(contacts)

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const allContacts = await contacts.listContacts();
      break;

    case "get":
        const oneContact = await contacts.getContactById(id);
      break;

    case "add":
      const newContact = await contacts.addContact({name, email, phone});
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);

