const fs = require("fs");
const express = require("express");
const app = express();

// Importing discussions from discussions.json file
const blogs = JSON.parse(fs.readFileSync(`data/blogs.json`));

// Middlewares
app.use(express.json());


app.get("/api/v1/blogs", (req, res) => {

    res.status(200).json({
        status: "Success",
        message: "Blogs fetched successfully",
        data: {
          blogs,
        },
      });

});


app.post("/api/v1/blogs", (req, res) => {

  var obj = req.body;
  obj['id'] = (blogs[blogs.length-1].id)+1;
  blogs.push(obj);

  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: "Blog added successfully"
      })
    }
  );

});

/*

Endpoint - /api/v1/blogs/:id
req.body = {
      "heading":"..",
      "body": "kddk djddk dkdkkd",
      "tags": "xyzzz"
      "creator_id": "kkdkdk"
    }

1. id will be given in api.
2. and all the field that need to be updated will be given in req body.
3. you need to update the field for given id.


Response ==> 

1. Success
Return 200 Status code
json = {
        status: "Success",
        message: "Blog Updated Successfully"
      }

2. Discussion with given id not found

Return 404 Status code
json = {
  status: "Failed",
  message: "Blog not found!",
}

*/

app.patch("/api/v1/blogs/:id", (req, res) => {

  
});

module.exports = app;