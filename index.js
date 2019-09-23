let kkRoutes = require('./routes/kkRoutes')
let ddRoutes = require('./routes/ddRoutes')
let kegiatanRoutes = require('./routes/kegiatanRoutes')
let pemasukanRoutes = require('./routes/pemasukanRoutes')
let pengeluaranRoutes = require('./routes/pengeluaranRoutes')
let pkkRoutes = require('./routes/pkkRoutes')
let pengurusRoutes = require('./routes/pengurusRoutes')
let katarRoutes = require('./routes/katarRoutes')
let kasRoutes = require('./routes/kasRoutes')

const express = require('express')
const app = express()
const port = 8000

let body_parser = require('body-parser')
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

app.use('/RukunWarga/kartuKeluarga/', kkRoutes)
app.use('/RukunWarga/dataDiri/', ddRoutes)
app.use('/RukunWarga/kegiatan/', kegiatanRoutes)
app.use('/RukunWarga/pemasukan/', pemasukanRoutes)
app.use('/RukunWarga/pengeluaran/', pengeluaranRoutes)
app.use('/RukunWarga/pkk/', pkkRoutes)
app.use('/RukunWarga/pengurus/', pengurusRoutes)
app.use('/RukunWarga/katar/', katarRoutes)
app.use('/RukunWarga/kas/', kasRoutes)

app.listen(port, () => console.log('App Port ' + port))