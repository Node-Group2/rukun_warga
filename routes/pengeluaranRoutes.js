const express = require('express')
const router = express.Router()

let pengeluaranController = require('../controllers/dev-4/pengeluaranController')

router.get('/', pengeluaranController.index)
router.get('/:id', pengeluaranController.detail)
router.post('/', pengeluaranController.create)
router.put('/:id', pengeluaranController.update)
router.delete('/:id', pengeluaranController.delete)

module.exports = router