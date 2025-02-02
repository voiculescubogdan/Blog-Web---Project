import express from "express"
import bodyParser from "body-parser"
import methodOverride from "method-override"

const app = express();
const port = 3000;
const arrayPostari = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    arrayP: arrayPostari,
  });
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
})

function addPostare(fName, lName, casuta) {
  if(fName === "" || lName === "" || casuta === "") {
    return false;
  } else {
    const postare = [fName, lName, casuta];
    arrayPostari.push(postare);
    console.log(arrayPostari);
  }
}

app.post("/submit", (req, res) => {
  const firstName = req.body["fName"];
  const lastName = req.body["lName"];
  const textIntrodus = req.body["casuta"];
  addPostare(firstName, lastName, textIntrodus);
  res.redirect("/");
})

app.post("/editPost", (req, res) => {
  const index = req.body["index"];
  const firstNameEdit = req.body["fNameEdit"];
  const lastNameEdit = req.body["lNameEdit"];
  const casutaEdit = req.body["casutaEdit"];
  if(index !== undefined && arrayPostari[index]) {
    arrayPostari[index] = [firstNameEdit, lastNameEdit, casutaEdit];
    console.log(arrayPostari);
  }
  res.redirect("/");
})

app.post("/delete", (req, res) => {
  const indexDelete = req.body["indexDelete"];
  if(indexDelete !== undefined && arrayPostari[indexDelete]) {
    arrayPostari.splice(indexDelete, 1);
    console.log(arrayPostari);
  }
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})