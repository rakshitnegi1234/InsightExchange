const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname,"./public/css")));
app.use(express.static(path.join(__dirname,"./public/js")));
app.use(methodOverride("_method"));


app.listen(port, ()=>
    {
        console.log(`listening on ${port}`);
    
    });

    app.get("/",(req,res)=>
        {
            res.send("Welcome");
        
        });



let post = [
    {
        id:1,
        username: "Rakshit Negi",
        content: "This blog explores how coding enthusiasts can balance their caffeine intake while maintaining productivity and health. It includes tips on selecting the right type of coffee, the effects of caffeine on coding performance, and healthy alternatives to traditional caffeinated drinks. The blog also features interviews with fellow students who share their favorite coffee spots and coding tips."
    },

    {
        id:2,
        username: "Shubhranshi",
        content: "This blog focuses on quick, budget-friendly recipes that students can prepare between classes or study sessions. It offers easy-to-follow recipes with step-by-step instructions, nutritional information, and tips for making meals in dorm kitchens. The blog also includes occasional posts about meal prep strategies and student-friendly kitchen gadgets."
    },

    {
        id:3,
        username: "Ashish",
        content: "A travel blog tailored for students who want to explore new places without breaking the bank. It provides guides on budget-friendly travel tips, local attractions, and hidden gems in various cities. The blog features personal travel experiences, reviews of affordable accommodations, and recommendations for student discounts and deals."
    }
];

 // main index

app.get("/posts",(req,res)=>
    {
        let data = post;
        res.render("index.ejs" , {data:data});
    
    });

    app.get("/posts/new", (req,res)=>
    {
        res.render("new.ejs");
    });
    

   // create post
app.post("/posts",(req,res)=>
{
    let obj = req.body;

    post.push({
        id: post.length + 1,
        username : obj.username,
        content: obj.content
    });
    
     res.redirect("/posts");
});

// show specific data

app.get("/posts/:id",(req,res)=>
{
    let {id} = req.params;
    id = parseInt(id);
    let p = post.find((val) => val.id === id);
    res.render("show.ejs",{p:p});
   
});
// update route

app.get("/posts/:id/edit",(req,res)=>
{
    let {id} = req.params;
    id = parseInt(id);
    let  p =post.find((val) =>  val.id === id);
    res.render("edit.ejs",{p:p});


});

app.patch("/posts/:id",(req,res)=>
{
     let {id} = req.params;
     id = parseInt(id);
     let newC = req.body.content;
     let p = post.find((val) => val.id === id);
     p.content = newC;
     res.redirect(`/posts`);
});

app.delete("/posts/:id", (req,res)=>
{
    let {id} = req.params;
    id = parseInt(id);
    post =post.filter((val) => val.id != id);
    res.redirect("/posts");

});


