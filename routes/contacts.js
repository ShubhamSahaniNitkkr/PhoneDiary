const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../model/User");
const Contact = require("../model/Contact");

// @route get api/contacts
// @des   get all users contact (mapped to single contact)
// @acess Private

router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Post api/contacts
// @des   Add Contact
// @acess Public

router.post(
  "/",
  [
    auth,
    [
      check("name", "Please provide name")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, email, phone, type } = req.body;
    try {
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

// @route PUT api/contacts/:id
// @des   Update Contact
// @acess Private

router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const updateContact = {};
  if (name) updateContact.name = name;
  if (email) updateContact.email = email;
  if (phone) updateContact.phone = phone;
  if (type) updateContact.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });

    // make sure user owns the contact
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: updateContact },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/contacts/:id
// @des   delete Contact
// @acess Private

router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "contact not found" });

    // make sure user owns the contact
    if (contact.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "contact deleted" });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
