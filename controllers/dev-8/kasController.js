let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM kas",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}
exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM kas WHERE id = ?", [id],
        function(error, results) {
            if (error) throw error

            if (results.length > 0) {
                res.send(results[0], 200)
            } else {
                res.send(400)
            }
        })
}
exports.create = function(req, res) {
    var data = {
        kepala_bendahara: req.body.kepala_bendahara,
        jenis_bendahara: req.body.jenis_bendahara,
        total_kas: req.body.total_kas,
        tanggal_diperbarui: new Date()
    }
    db.query('INSERT INTO kas (kepala_bendahara, jenis_bendahara, total_kas, tanggal_diperbarui) VALUES (?,?,?,?)', [data.kepala_bendahara, data.jenis_bendahara, data.total_kas, data.tanggal_diperbarui], function(error, results) {
        if (error) throw error;

        var id = results.insertId;
        if (id) {
            data.id = results.insertId;
            res.send(data, 201)
        } else {
            res.send(400)
        }
    })
}
exports.update = function(req, res) {
    var id = req.params.id;
    var data = {
        kepala_bendahara: req.body.kepala_bendahara,
        jenis_bendahara: req.body.jenis_bendahara,
        total_kas: req.body.total_kas,
        tanggal_diperbarui: new Date()
    }
    db.query('UPDATE kas set kepala_bendahara=?, jenis_bendahara=?, total_kas=?, tanggal_diperbarui=? WHERE id=?', [data.kepala_bendahara, data.jenis_bendahara, data.total_kas, data.tanggal_diperbarui, id],
        function(error, results) {
            if (error) throw error
            var changedRows = results.changedRows;
            if (changedRows > 0) {
                data.id = id
                res.send(data, 200)
            } else {
                res.send(404)
            }
        })
}
exports.delete = function(req, res) {
    var id = req.params.id
    db.query('DELETE FROM kas WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}