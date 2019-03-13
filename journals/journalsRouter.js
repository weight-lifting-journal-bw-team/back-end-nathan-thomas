const express = require("express");
const Journals = require("./journalsModel.js");

const router = express.Router();

// Get all journals request
router.get("/", async (req, res) => {
  try {
    const journals = await Journals.find();
    if (journals.length) {
      res.status(200).json({
        error: false,
        message: "The journals were found in the database",
        journals
      });
    } else {
      res.status(404).json({
        error: true,
        journals: [],
        message: "The journals could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      journals: [],
      message: "There was an error processing your request."
    });
  }
});

// Get all journals request
router.get("/:id", async (req, res) => {
  try {
    const journal = await Journals.findById(req.params.id);
    if (journal) {
      res.status(200).json({
        error: false,
        message: "The journal was found in the database",
        journal
      });
    } else {
      res.status(404).json({
        error: true,
        journal: {},
        message: "The journal could not be found in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      journals: {},
      message: "There was an error processing your request."
    });
  }
});

// Get all journals request
router.post("/", async (req, res) => {
  if (!req.body.userId) {
    res.status(406).json({
      error: true,
      user: {},
      message: "Please include all required fields and try again."
    });
  }
  try {
    const journal = await Journals.insert(req.body);
    if (journal) {
      res.status(200).json({
        error: false,
        message: "The journal was created in the database.",
        journal
      });
    } else {
      res.status(404).json({
        error: true,
        journal: {},
        message: "The journal could not be created in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      journals: {},
      message: "There was an error processing your request."
    });
  }
});

// Get all journals request
router.put("/:id", async (req, res) => {
  try {
    const journal = await Journals.update(req.params.id, req.body);
    if (journal) {
      res.status(200).json({
        error: false,
        message: "The journal was updated in the database.",
        journal
      });
    } else {
      res.status(404).json({
        error: true,
        journal: {},
        message: "The journal could not be updated in the database."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      journals: {},
      message: "There was an error processing your request."
    });
  }
});

// Get all journals request
// router.delete("/:id", async (req, res) => {
//   try {
//     const journal = await Journals.remove(req.params.id);
//     console.log(journal);
//     if (journal) {
//       res.status(200).json({
//         error: false,
//         message: "The journal was deleted from the database.",
//         journal
//       });
//     } else {
//       res.status(404).json({
//         error: true,
//         journal: {},
//         message: "The journal could not be deleted in the database."
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       error: true,
//       journals: {},
//       message: "There was an error processing your request."
//     });
//   }
// });

module.exports = router;
