let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM kartu_keluarga",
        function(error, results) {
            if (error) throw error;

            res.send(results, 200)
        })
}
exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM kartu_keluarga WHERE id = ?", [id],
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
        no_kk: req.body.no_kk,
        kepala_keluarga: req.body.kepala_keluarga,
        total_anggota: req.body.total_anggota,
        status: req.body.status
    }


    db.query("SELECT * FROM kartu_keluarga WHERE no_kk = ?", [data.no_kk],
    function(error, results) {
        if (error) throw error

        if (results.length > 0) {
            res.send("No KK Sudah Terdaftar", 200)
        }
        else if (results.length == 0)
        {
              
            db.query('INSERT INTO kartu_keluarga (no_kk, kepala_keluarga, total_anggota, status) VALUES (?,?,?,?)', [data.no_kk, data.kepala_keluarga, data.total_anggota, data.status], function(error, results) {
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
        no_kk: req.body.no_kk,
        kepala_keluarga: req.body.kepala_keluarga,
        total_anggota: req.body.total_anggota,
        status: req.body.status
    }
    db.query('UPDATE kartu_keluarga set no_kk=?, kepala_keluarga=?, total_anggota=?, status=? WHERE id=?', [data.no_kk, data.kepala_keluarga, data.total_anggota, data.status ,id],
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
    db.query('DELETE FROM kartu_keluarga WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send(204)
            } else {
                res.send(404)
            }
        })
}



