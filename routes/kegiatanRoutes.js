const express = require('express')
const router = express.Router()

let KegiatanController = require('../controllers/dev-2/kegiatanController')

router.get('/', KegiatanController.index)
router.get('/:id', KegiatanController.detail)
router.post('/', KegiatanController.create)
router.put('/:id', KegiatanController.update)
router.delete('/:id', KegiatanController.delete)

module.exports = router