const express = require('express')
const router = express.Router()

let ddController = require('../controllers/dev-2/ddController')

router.get('/', ddController.index)
router.get('/:id', ddController.detail)
router.post('/', ddController.create)
router.put('/:id', ddController.update)
router.delete('/:id', ddController.delete)

module.exports = router