let db = require('../../config-routes/mysql-conn')

exports.index = function(req, res) {
    db.query("SELECT * FROM pkk",
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
        status: "Aktif"
    }
    
    db.query("SELECT id FROM data_diri WHERE id = ?",[data.id_dd],
    function(error,results){
        if(error) throw error

        if(results.length == 0)
        {
            res.send("ID Data Diri Belum Terdaftar",400);
        }
        else if(results.length == 1)
        {
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
        else
        {
            res.send(404);
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

    var str = data.status;
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });

    if(str == "Aktif" || str =="Tidak Aktif" ){
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
    }else{
        res.send("Status Tidak Ada", 400)
    }
}

exports.delete = function(req, res) {
    var id = req.params.id
    db.query('DELETE FROM pkk WHERE id = ?', [id],
    function(error, results) {
        if (error) throw error

        if (results.affectedRows > 0) {
            res.send("Data Berhasil Dihapus", 200)
        } else {
            res.send(404)
        }
    })
}