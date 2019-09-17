let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM pkk",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}
exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM pkk WHERE id = ?", [id],
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
        jabatan: req.body.jabatan,
        status: req.body.status
    }
    db.query('INSERT INTO pkk (id_dd, jabatan, status) VALUES (?,?,?)', [data.id_dd, data.jabatan, data.status], function(error, results) {
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
        id_dd: req.body.id_dd,
        jabatan: req.body.jabatan,
        status: req.body.status
    }
    db.query('UPDATE pkk set id_dd=?, jabatan=?, status=? WHERE id=?', [data.id_dd, data.jabatan, data.status, id],
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
    db.query('DELETE FROM pkk WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}