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
        ketua_pelaksana: req.body.ketua_pelaksana,
        nama_kegiatan: req.body.nama_kegiatan,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        deskripsi: req.body.deskripsi,
        biaya: req.body.biaya,
        status: req.body.status,
        jenis: req.body.jenis,
        tanggal_pengeluaran: new Date(),
        tipe: "Kegiatan"
    }
    db.query('INSERT INTO kegiatan ( ketua_pelaksana, nama_kegiatan, tanggal_kegiatan, deskripsi,biaya,status) VALUES (?,?,?,?,?,?)', [data.ketua_pelaksana, data.nama_kegiatan, data.tanggal_kegiatan, data.deskripsi, data.biaya, data.status], function(error, results) {
        if (error) throw error;

        var id = results.insertId;
        if (id) {
            data.id = results.insertId;
            res.send(data, 201)

            db.query('UPDATE kas SET total_kas=total_kas-? WHERE jenis_bendahara=?', [data.biaya, data.jenis],
                function(error, results) {

                })

            db.query('INSERT INTO pengeluaran(id_dd, pengeluaran, jenis_pengeluaran, tanggal_pengeluaran) VALUE (?,?,?,?)', [data.ketua_pelaksana, data.biaya, data.tipe, data.tanggal_pengeluaran], function(error, results) {

            })

        } else {
            res.send(400)

        }
    })


}


exports.update = function(req, res) {
    var id = req.params.id;
    var data = {
        nama_kegiatan: req.body.nama_kegiatan,
        tanggal_kegiatan: new Date(),
        deskripsi: req.body.deskripsi,
        status: req.body.status
    }
    db.query('UPDATE kegiatan set nama_kegiatan=?, tanggal_kegiatan=?, deskripsi=?, status=? WHERE id=?', [data.nama_kegiatan, data.tanggal_kegiatan, data.deskripsi, data.status, id],
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