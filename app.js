const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require('request');


const app =express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req,res) {
  res.sendFile(__dirname+"/signup.html")
})

app.post("/", function (req,res) {
  const firstname= req.body.fn;
  const lastname= req.body.ln;
  const email= req.body.email;

  const data ={
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields:{
          FNAME:firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const jsonData =JSON.stringify(data);

  const url ="https://us21.api.mailchimp.com/3.0/lists/d63b364d3f";

  const options = {
    method: "POST",
    auth:"sweta1:fadb6505016fa7b06825817f6f33e928-us21"
  }

  const request = https.request(url, options, function (response) {

    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html")
    }
    else {
      res.sendFile(__dirname+"/failure.html")
    }


    response.on("data", function (data) {
      //console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

})

app.listen(process.env.PORT || 3000,function () {
  console.log("The server is running at port 3000");
})

//APi key = fadb6505016fa7b06825817f6f33e928-us21
//list id =d63b364d3f
