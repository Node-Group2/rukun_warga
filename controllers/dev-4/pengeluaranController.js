let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM pengeluaran",
    function(error, results) {
        if (error) throw error;

        if(results.length == 0){
            res.send("Data Kosong", 200)
        }else{
            res.send(results, 200)
        }
    })
}

exports.detail = function(req, res) {
    var id = req.params.id
    db.query("SELECT * FROM pengeluaran WHERE id = ?", [id],
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
        pengeluaran: req.body.pengeluaran,
        jenis_pengeluaran: req.body.jenis_pengeluaran,
        tanggal_pengeluaran: new Date()
    }
    
    var str = data.jenis_pengeluaran;
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    if(str == "Pkk" || str == "Karang Taruna" || str == "Pengurus" || data.jenis_pengeluaran == "Kegiatan"){
        db.query("SELECT id FROM data_diri WHERE id = ?",[data.id_dd],
        function(error,results){
            if(error) throw error

            if(results.length == 0)
            {
                res.send("ID Data Diri Belum Terdaftar",400);
            }
            else if(results.length == 1)
            {
                db.query('INSERT INTO pengeluaran (id_dd, pengeluaran, jenis_pengeluaran,  tanggal_pengeluaran) VALUES (?,?,?,?)', [data.id_dd, data.pengeluaran, data.jenis_pengeluaran, data.tanggal_pengeluaran], function(error, results) {
                    if (error) throw error;
            
                    var id = results.insertId;
                    if (id) {
                        data.id = results.insertId;
                        res.send(data, 201)
            
                        db.query('UPDATE kas SET total_kas=total_kas-? WHERE jenis_bendahara=?', [data.pengeluaran, data.jenis_pengeluaran],
                            function() {
            
                            })
            
                    } else {
                        res.send(400)
                    }
                })
            }
            else
            {
                res.send(404);
            }
        })
    }else{
        res.send("Tidak ada pilihan", 400)
    }
}

exports.delete = function(req, res) {
    var id = req.params.id
    db.query('DELETE FROM pengeluaran WHERE id = ?', [id],
    function(error, results) {
        if (error) throw error

        if (results.affectedRows > 0) {
            res.send("Data Berhasil Dihapus", 200)
        } else {
            res.send(404)
        }
    })
}