const express = require('express')
const router = express.Router()

let katarController = require('../controllers/dev-7/katarController')

router.get('/', katarController.index)
router.get('/:id', katarController.detail)
router.post('/', katarController.create)
router.put('/:id', katarController.update)
router.delete('/:id', katarController.delete)

module.exports = router