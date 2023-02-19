const express = require('express')
const fs = require('fs')
const requests = require('requests')

const port = process.env.PORT || 3000 ;
const app = express();
app.set('view engine','hbs')
app.use(express.static(__dirname + '/views')) 
app.get('/',(req,res)=>{

     
 res.render('index.hbs')
    
  

})


app.get('/about',(req,res)=>{
    requests('https://api.covid19api.com/summary') 
    .on('data',(chunks)=>{
      console.log("Nobero");
      obj= JSON.parse(chunks);

      const countryChosen = req.query.country ;
    //   const countryChosen = "Armenia" ;
    console.log(countryChosen);

      for(x in obj["Countries"])
      {
        if(obj["Countries"][x].Country == countryChosen)
        {
           
            console.log(obj["Countries"][x]);
            res.render('index.hbs',{
                confirmed : obj["Countries"][x].TotalConfirmed,
                recovered : obj["Countries"][x].TotalRecovered,
                deaths :    obj["Countries"][x].TotalDeaths
            })
        }
      }
     

     

    //   console.log(JSON.parse(chunks));
    //     obj= JSON.parse(chunks) ;
    //    console.log( obj["Countries"]);
     
    })
    .on('end',(err)=>{
      if(err)
      console.log(err);
    })

    
     
})
app.listen(port,(err)=>
{
    if(err)
console.log(err)
else
{
    console.log(`listening ...`);
}
}
)



