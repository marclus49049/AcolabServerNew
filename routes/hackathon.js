const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const Hackathon = require("../model/hackathon");
const {
  registerMentor,
  registerParticipant,
} = require("../controller/hakathonService");

router.post("/addhackathon", async (req, res) => {
  hackathon = new Hackathon({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    // status:req.body.status,
  });
  await hackathon
    .save()
    .then((result) => {
      res.status(200).json({ message: "done", result: result });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/gethackathon", (req, res) => {
  Hackathon.find({})
    .limit(4)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/completehackathon", async (req, res) => {
  await Hackathon.findByIdAndUpdate(req.body.id, { status: "complete" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Register APIs

// !Participant
router.post("/registerhackathon", auth, registerParticipant);

// !Mentor
router.post("/registermentor", auth, registerMentor);

module.exports = router;
