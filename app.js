const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/Signup.html");
});

app.post("/",function(req,res)
{
  var firstname=req.body.fname;
  var lastname=req.body.lname;
  var email=req.body.email;

  var data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }]
  };
  var jsondata=JSON.stringify(data);

  var options={
    url: "https://us7.api.mailchimp.com/3.0/lists/b25877b9ec",
    method:"POST",
    headers:{
      "Authorization":"Harsh 38c398eb08d7b6a2b91cb4901fa6840d-us7"
    },
    body:jsondata
  };
  request(options,function(error,response,body)
  {
    if(error)
    {
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode==200)
      res.sendFile(__dirname+"/success.html");
      else
      res.sendFile(__dirname+"/failure.html");
    }
  });
});
app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("port started on server 3000");
});
//38c398eb08d7b6a2b91cb4901fa6840d-us7
//b25877b9ec
