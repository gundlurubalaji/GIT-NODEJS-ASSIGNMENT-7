const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  

let students=require("./InitialData")


app.get("/api/student",(req,resp)=>{
    resp.status(200).json({
        students

    })
})
app.get("/api/student/:id", (req, resp) => {
    const studentid = parseInt(req.params.id);
    const student = students.find(s => s.id === studentid);
    if (student) {
      resp.json({
        student,
        message:"student id found"
      });
    } else {
      resp.status(404).json({ message: 'Studentid not found' });
    }
  });

  app.post('/api/student/', (req, resp) => {
    const name = req.body.name;
    const currentClass = parseInt(req.body.currentClass);
    const division = req.body.division;
    console.log(name)
  
    if (name && currentClass && division) {
      const newStudent = { id: generateId(), name, currentClass, division };
      students.push(newStudent);
      resp.json({ id: newStudent.id });
    } else {
      resp.status(400).json({ message: 'Incomplete student details provided' });
    }
 });
 let currentId = students.length + 1;
 function generateId() {
   const newId = currentId;
   currentId++;
   return newId;
 }

 app.put('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);
  
    if (!student) {
      res.status(400).json({ message: 'Invalid student id' });
      return;
    }
    const name = req.body.name;
    if (name) {
      student.name = name;
      res.json({ message: 'Student details updated' });
    } else {
      res.status(400).json({ message: 'Invalid update provided' });
    }
  });

  app.delete('/api/student/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
  
    if (index === -1) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      students.splice(index, 1);
      res.json({ message: 'Student record deleted' });
    }
  });











app.listen(port, () => console.log(`backend appilication Running on port ${port}`))

module.exports = app;   




