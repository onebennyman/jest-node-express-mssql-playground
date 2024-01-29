const express = require('express');
const { singleFileValidator } = require('../validator/filesValidator');

const router = express.Router();

router.get('/', (req, res) => res.status(200).send());

router.post('/', (req, res) => {
  const validacion = singleFileValidator(req);
  if (validacion === true) {
    return res.status(200).send();
  }
  return res.status(500).send();
});

module.exports = router;
