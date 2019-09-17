const express = require('express')
const router = express.Router()

let pemasukanController = require('../controllers/dev-3/pemasukanController')

router.get('/', pemasukanController.index)
router.get('/:id', pemasukanController.detail)
router.post('/', pemasukanController.create)
router.put('/:id', pemasukanController.update)
router.delete('/:id', pemasukanController.delete)

module.exports = router