const express = require('express')
const router = express.Router()

let pkkController = require('../controllers/dev-5/pkkController')

router.get('/', pkkController.index)
router.get('/:id', pkkController.detail)
router.post('/', pkkController.create)
router.put('/:id', pkkController.update)
router.delete('/:id', pkkController.delete)

module.exports = router