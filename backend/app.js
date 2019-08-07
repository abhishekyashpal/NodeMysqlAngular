const express = require('express');
const mysql = require('mysql');

const cors = require('cors');

var app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if(!err)
    console.log('DB connection succeded');
    else
   console.log('DB connection failed Error' + JSON.stringify(err, undefined, 2));
});

app.get('/', (req, res) => {
    res.send('This is Home page');
});

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if(!err)
     //   res.send({rows});
        res.json(rows);
        else 
        console.log(err);
    });
});

app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    });
});

app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) =>{
        if(!err)
        res.send('Deleted Successfully');
        else
        console.log(err);
    });
});

app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO employee (EmpID, Name, EmpCode, Salary) VALUES (?,?,?,?)";
    console.log(sql);
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) =>{
        if(!err) 
        res.send('Added Successfully');    
        else
        console.log(err);
    });
});

app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = 'UPDATE employee SET Name = ?, EmpCode=?, Salary=? WHERE EmpID = ?';
    mysqlConnection.query(sql, [emp.Name, emp.EmpCode, emp.Salary, emp.EmpID], (err, rows, fields) =>{
        if(!err) 
        res.send('Updated Successfully');    
        else
        console.log(err);
    });
});






























app.listen(2300, ()=> console.log('Express Server running at port no. 2300'));