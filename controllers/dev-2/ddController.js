let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM data_diri",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}
exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM data_diri WHERE id = ?", [id],
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
        nik: req.body.nik,
        id_kk: req.body.id_kk,
        nama: req.body.nama,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin
    }


    db.query("SELECT * FROM data_diri WHERE nik = ?", [data.nik],
    function(error, results) {
        if (error) throw error

        if (results.length > 0) {
            res.send("Nik Sudah Terdaftar", 200)
        }
        else if (results.length == 0)
        {
              
            db.query('INSERT INTO data_diri (nik, id_kk, nama, tanggal_lahir, jenis_kelamin) VALUES (?,?,?,?,?)', [data.nik, data.id_kk, data.nama, data.tanggal_lahir, data.jenis_kelamin], function(error, results) {
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
        else {
            res.send(400)
        }
    })

}
exports.update = function(req, res) {
    var id = req.params.id;
    var data = {
        nik: req.body.nik,
        id_kk: req.body.id_kk,
        nama: req.body.nama,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin:req.body.jenis_kelamin
    }
    db.query('UPDATE data_diri set nik=?, id_kk=?, nama=?, tanggal_lahir=?, jenis_kelamin=? WHERE id=?', [data.nik, data.id_kk, data.nama, data.tanggal_lahir, data.jenis_kelamin ,id],
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
    db.query('DELETE FROM data_diri WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}