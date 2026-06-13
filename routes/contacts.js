const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Contact = require("../model/Contact");
const { isDemoMode } = require("../config/demo");
const demoStore = require("../mock/store");

router.get("/", auth, async (req, res) => {
  try {
    if (isDemoMode()) {
      return res.json(demoStore.getContactsForUser(req.user.id));
    }

    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [check("name", "Please provide name").not().isEmpty()]
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      if (isDemoMode()) {
        const contact = demoStore.createContact({
          name,
          email,
          phone,
          type,
          user: req.user.id
        });
        return res.json(contact);
      }

      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const updateContact = {};
  if (name) updateContact.name = name;
  if (email) updateContact.email = email;
  if (phone) updateContact.phone = phone;
  if (type) updateContact.type = type;

  try {
    if (isDemoMode()) {
      const contact = demoStore.findContactById(req.params.id);
      if (!contact) return res.status(404).json({ msg: "contact not found" });
      if (contact.user !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      return res.json(demoStore.updateContact(req.params.id, updateContact));
    }

    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updateContact },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    if (isDemoMode()) {
      const contact = demoStore.findContactById(req.params.id);
      if (!contact) return res.status(404).json({ msg: "contact not found" });
      if (contact.user !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
      demoStore.deleteContact(req.params.id);
      return res.json({ msg: "contact deleted" });
    }

    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
