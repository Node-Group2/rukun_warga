const express = require('express')
const router = express.Router()

let kasController = require('../controllers/dev-8/kasController')

router.get('/', kasController.index)
router.get('/:id', kasController.detail)
router.post('/', kasController.create)
router.put('/:id', kasController.update)
router.delete('/:id', kasController.delete)

module.exports = router