const { BadRequestError } = require("../errors/bad-request")
const Users = require("../models/users")
const multer = require("multer")
const express = require("express")
const router = express.Router()


const FILE_TYPE_MAP = {
  "application/pdf": "pdf",
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype]

    let uploadError = new Error("invalid image type")

    if (isValid) {
      uploadError = null
    }
    cb(uploadError, "uploads")
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-")
    cb(null, fileName)
  },
})

const uploadOptions = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 250, //Less than 
  },
})

router.post("/create-user", uploadOptions.single("avatar"), async (req, res) => {

    const file = req.file
    if (!file) return res.status(400).send("No file in the request")

    const fileName = file.filename
    //const basePath = `${req.protocol}://${req.get('host')}/uploads/`; filename to URL

    const bufferedFile = Buffer.from(JSON.stringify(fileName)).toString("base64")

    await Users.create({
      newMindId: req.body.id,
      email: req.body.email,
      fullName: req.body.fullName,
      isAdmin: req.body.isAdmin,
      matterId: req.body.matterId,
      cStoreId: req.body.cStoreId,
      avatar: bufferedFile,
      avatarMimeType: req.body.avatarMimeType,
      clientId: req.body.clientId,
      isActive: req.body.isActive,
    })
      .then((newUser) => {
        res.send(newUser);
      })
      .catch((error) => {
        res.json({ Error: error });
      })
  }
)

module.exports = router
