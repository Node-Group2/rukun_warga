let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM kegiatan",
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
    db.query("SELECT * FROM kegiatan WHERE id = ?", [id],
        function(error, results) {
            if (error) throw error

            if (results.length > 0) {
                res.send(results[0], 200)
            } else {
                res.send(404)
            }
        })
}


exports.create = function(req, res) {
    var data = {
        ketua_pelaksana: req.body.ketua_pelaksana,
        nama_kegiatan: req.body.nama_kegiatan,
        tanggal_kegiatan: req.body.tanggal_kegiatan,
        tanggal_pengeluaran:new Date(),
        deskripsi: req.body.deskripsi,
        biaya: req.body.biaya,
        status: "Belum Terlaksana",
        jenis: req.body.jenis,
        tipe: "Kegiatan"
    }
    
    var str = data.jenis;
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    db.query("SELECT id FROM data_diri WHERE id = ?",[data.ketua_pelaksana],
    function(error,results){
        if(error) throw error

        if(results.length == 0)
        {
            res.send("ID Data Diri Belum Terdaftar",400);
        }
        else if(results.length == 1)
        {
            db.query('INSERT INTO kegiatan ( ketua_pelaksana, nama_kegiatan, tanggal_kegiatan, deskripsi,biaya,status) VALUES (?,?,?,?,?,?)', [data.ketua_pelaksana, data.nama_kegiatan, data.tanggal_kegiatan, data.deskripsi, data.biaya, data.status], function(error, results) {
                if (error) throw error;
        
                var id = results.insertId;
                if (id) {
                    data.id = results.insertId;
                    res.send(data, 201)
        
                    if(str == "Pkk" || str == "Karang Taruna" || str == "Pengurus"){
                        db.query('UPDATE kas SET total_kas=total_kas-? WHERE jenis_bendahara=?', [data.biaya, data.jenis],
                    function() {
                    })
                        db.query('INSERT INTO pengeluaran(id_dd, pengeluaran, jenis_pengeluaran, tanggal_pengeluaran) VALUE (?,?,?,?)', [data.ketua_pelaksana, data.biaya, data.tipe, data.tanggal_pengeluaran], function(error, results) {
                   
                     })
                    }else{
                        res.send("Tidak ada jenis kegiatan", 400)
                    }  
                } else {
                    res.send(404)
                }
            })
        }
        else
        {
            res.send(404);
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
    
    var str = data.status;
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    if(str == "Belum Terlaksana" || str == "Sedang Terlaksana" || str == "Sudah Terlaksana") {
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
    } else{
        res.send("Tidak ada status pelaksanaan", 400)
    }
}


exports.delete = function(req, res) {
    var id = req.params.id
    db.query('DELETE FROM kegiatan WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send("Data Berhasil Dihapus", 200)
            } else {
                res.send(404)
            }
        })
}