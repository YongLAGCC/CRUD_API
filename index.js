
// to start comment line: npm i -g nodemon
// then: nodemon index.js 
const Joi = require ('joi'); 
const express = require ('express'); // load module
const app = express(); // app this express in varialbe called "app"

app.use(express.json()); // middleware, enable json for post a new element

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},  
    
]
app.get ('/',(req,res) => {
    res.send ('Hello, World!!!!');
})  // ('road', 'call back fuction' to a block)-> this is how to define a rout  

app.get('/api/courses',(req,res) => {    
    res.send(courses);
});   // get all the courses, the one below to get single course

// /api/course/1
// response HTTP post request by post 
app.post('/api/courses',(req, res) =>{
    // schema for user input whehter have email, string, number etc..
    // const schema = {
    //     name: Joi.string().min(3).required()          //see document to find all the methods
    // };
    const { error } = validateCourse(req.body);// use library "Joi" for input errors
    if (error) return res.status(400).send(error.details[0].message);
     
    //console.log(result);
    //input validation 
    // if (!req.body.name || req.body.name.length < 3) {
    //     // 400 Bad Request
    //     res.status(400).send('Name is required and should be minimum 3 characters.')
    //     return; 
    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     reture; 
    // }
    const course = {
      id: courses.length + 1, //assign a id manully, as no database for now
      name: req.body.name,  // read from body request. 
    };
    courses.push(course); 
    res.send(course);  // we assign id to server(line 32), client need to know the  
});

// update course  
app.put( '/api/courses/:id', (req, res) => { // specific course
        const course = courses.find(c => c.id === parseInt(req.params.id)); 
        if (!course)  return res.status(404).send ('Bad request of the course with id ')

       const { error } = validateCourse(req.body); // destructor from const result //result.error
       if (error)  return res.status(400).send(error.details[0].message);
       
        // find course
        // if not existing, return 404
        // validate 
        // if invalid, return 400 - Bad request

        // UPdate the course 
        course.name = req.body.name; 
        res.send(course);
        // Return the updated course 
     })
function validateCourse(course) {
    　const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course,schema);
  
}


app.delete('/api/courses/:id', (req, res) => {
    // lookup course 
    // Not existing, return 404
    // delete 
    // Return the same course

    const course = courses.find( c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send(" This course id is not exist");
    //Delete  
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
})


//routs to get all the courses and single course by request from HTTP;
app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id) ); //get single id, and parse it to Int, and save it in course
    if(!course)  return res.status(404).send('This course with the id was not found.') // error(404)
    res.send(course); // else send this id and value
    
});

    //res.send(req.query); // query params. use query instead of params
 // id is paramater


const port = process.env.PORT || 3000; //PORT to creat a environment variable for host. instead of hard code for 3000
app.listen(port, () => console.log(`listening on the port ${port}`))



// input validation for user type a invalidate name. 