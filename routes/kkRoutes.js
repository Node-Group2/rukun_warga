const express = require('express')
const router = express.Router()

let kkController = require('../controllers/dev-1/kkController')

router.get('/', kkController.index)
router.get('/:id', kkController.detail)
router.post('/', kkController.create)
router.put('/:id', kkController.update)
router.delete('/:id', kkController.delete)

module.exports = router