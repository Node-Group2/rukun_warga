let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM kegiatan",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}
exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM kegiatan WHERE id = ?", [id],
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
        ketua_pelaksana: req.body.ketua_pelaksana,
        nama_kegiatan: req.body.nama_kegiatan,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        deskripsi: req.body.deskripsi,
        biaya: req.body.biaya,
        status:req.body.status
    }
    db.query('INSERT INTO kegiatan (id_dd, ketua_pelaksana, nama_kegiatan, tanggal_kegiatan, deskripsi,biaya,status) VALUES (?,?,?,?,?,?,?)', [data.id_dd, data.ketua_pelaksana, data.nama_kegiatan, data.tanggal_kegiatan, data.deskripsi,data.biaya,data.status], function(error, results) {
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
        ketua_pelaksana: req.body.ketua_pelaksana,
        nama_kegiatan: req.body.nama_kegiatan,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        deskripsi: req.body.deskripsi,
        biaya: req.body.biaya,
        status:req.body.status
    }
    db.query('UPDATE kegiatan set id_dd=?, ketua_pelaksana=?, nama_kegiatan=?, tanggal_kegiatan=?, deskripsi=?, biaya=?, status=? WHERE id=?', [data.id_dd, data.ketua_pelaksana, data.nama_kegiatan, data.tanggal_kegiatan, data.deskripsi ,data.biaya, data.status,id],
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
    db.query('DELETE FROM kegiatan WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}