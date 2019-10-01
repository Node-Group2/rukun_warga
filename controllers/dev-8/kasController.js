let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM kas",
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
        total_kas: "0"
    }

                var str = data.jenis_bendahara;
            str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });
            

    db.query("SELECT id FROM kas WHERE jenis_bendahara = ?",[data.jenis_bendahara],function(error,results){
        if(error) throw error

        if(results.length == 0)
        {
            
                if(str == "PKK" || str == "Karang Taruna" || str == "Pengurus"){
                    db.query("SELECT id FROM data_diri WHERE id = ?",[data.kepala_bendahara],
                    function(error,results){
                        if(error) throw error

                        if(results.length == 0)
                        {
                            res.send("ID Data Diri Belum Terdaftar",400);
                        }

                        else if(results.length == 1)
                        {
                            db.query('INSERT INTO kas (kepala_bendahara, jenis_bendahara, total_kas) VALUES (?,?,?)', [data.kepala_bendahara, data.jenis_bendahara, data.total_kas], function(error, results) {
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
                        else
                        {
                            res.send(404);
                        }
                    }) 
                } else{
                    res.send("Tidak ada pilihan jenis", 400)
                }
        }
        else if (results.length == 1)
        {
        res.send("Jenis Kas Sudah Terdaftar",400);
        }
    })

}

exports.update = function(req, res) {
    var id = req.params.id;
    var data = {
        kepala_bendahara: req.body.kepala_bendahara
    }
    db.query("SELECT id FROM data_diri WHERE id = ?",[data.kepala_bendahara],
    function(error,results){
        if(error) throw error

        if(results.length == 0)
        {
            res.send("ID Data Diri Belum Terdaftar",400);
        }

        else if(results.length == 1)
        {
            db.query('UPDATE kas set kepala_bendahara=? WHERE id=?', [data.kepala_bendahara, id],
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
        else
        {
            res.send(404);
        }
    })   
}

exports.delete = function(req, res) {
    var id = req.params.id
    db.query('DELETE FROM kas WHERE id = ?', [id],
        function(error, results) {
            if (error) throw error

            if (results.affectedRows > 0) {
                res.send("Data Berhasil Dihapus", 200)
            } else {
                res.send(404)
            }
        })
}