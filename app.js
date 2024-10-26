const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false}))

 app.use(bodyParser.json())


 //Mysql
 const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs_test'
 })


app.get('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)


        connection.query('SELECT * FROM test', (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)

            }else{
                console.log(err)
            }
        })


    })

})



// By ID
app.get('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * FROM test WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)

            }else{
                console.log(err)
            }
        })


    })

})



// Delete
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE FROM test WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Deym: ${[req.params.id]} has gone.`)

            }else{
                console.log(err)
            }
        })


    })

})



// create
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body
        
        connection.query('INSERT INTO test SET ?', params, (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Deym: ${params.id} has added.`)

            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })

})



// Update
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const {id, name, b_name, description} = req.body 

        connection.query('UPDATE test SET name = ? WHERE id = ?', [name, b_name, description, id], (err, rows) => {
            connection.release()

            if(!err){
                res.send(`Deym: ${params.id} has Updated`)

            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })

})




 //Listen
 app.listen(port, () => console.log('Listen on port ${port}'))