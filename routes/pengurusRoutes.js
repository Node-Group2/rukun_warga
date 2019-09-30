const express = require('express')
const router = express.Router()

let pengurusController = require('../controllers/dev-6/pengurusController')

router.get('/', pengurusController.index)
router.get('/:id', pengurusController.detail)
router.post('/', pengurusController.create)
router.put('/:id', pengurusController.update)
router.delete('/:id', pengurusController.delete)

module.exports = router