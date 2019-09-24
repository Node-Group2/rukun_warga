let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM pemasukan",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}


exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM pemasukan WHERE id = ?", [id],
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
        id_dd: req.body.id_dd,
        pemasukan: req.body.pemasukan,
        jenis_pemasukan: req.body.jenis_pemasukan,
        tanggal_pemasukan: new Date()
    }
    db.query('INSERT INTO pemasukan (id_dd, pemasukan, jenis_pemasukan, tanggal_pemasukan) VALUES (?,?,?,?)', [data.id_dd, data.pemasukan, data.jenis_pemasukan, data.tanggal_pemasukan], function(error, results) {
        if (error) throw error;

        var id = results.insertId;
        if (id) {
            data.id = results.insertId;
            res.send(data, 201)
        } else {
            res.send(400)
        }
    })
    db.query('UPDATE kas SET total_kas=total_kas+? WHERE jenis_bendahara=?', [data.pemasukan, data.jenis_pemasukan], function(error, results) {
        
    })
}


exports.update = function(req, res) {
    var id = req.params.id;
    var data = {
        pemasukan: req.body.pemasukan,
        tanggal_pemasukan: new Date()
    }
    db.query('UPDATE pemasukan set pemasukan=?, tanggal_pemasukan=? WHERE id=?', [data.pemasukan, data.tanggal_pemasukan, id],
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
    db.query('DELETE FROM pemasukan WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}