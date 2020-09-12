const http = require("https")
const express = require("express")
const googleDictionaryApi = require("google-dictionary-api")
const bodyParser = require("body-parser")
const cors = require("cors")
var unirest = require("unirest")
//const router = express.Router();
const app = express()

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
// parse application/json
//app.use(bodyParser.json())

app.use(express.json({limit: '5mb'}))

app.get('/', function (req,res){
    console.log('server is runnung')



  /*  var req = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");

    req.headers({
      "x-rapidapi-host": "google-translate1.p.rapidapi.com",
      "x-rapidapi-key": "a837b33adamsh15de0231996bd6ap121a07jsnf72c0f476b04",
      "accept-encoding": "application/gzip",
      "content-type": "application/x-www-form-urlencoded",
      "useQueryString": true
    });

    req.form({
      "source": "es",
      "q": "thank",
      "target": "zh-TW"
    });

    req.end(function (res) {
      if (res.error) throw new Error(res.error);

      console.log(res);
      console.log(req)
    });*/






    /*var request = unirest("POST", "https://google-translate1.p.rapidapi.com/language/translate/v2");
    console.log("Hello")
    request.headers({
    "x-rapidapi-host": "google-translate1.p.rapidapi.com",
    "x-rapidapi-key": "a837b33adamsh15de0231996bd6ap121a07jsnf72c0f476b04",
    "accept-encoding": "application/gzip",
    "content-type": "application/x-www-form-urlencoded",
    "useQueryString": true
   })

    request.form({
    "source": "en",
    "q": "Fuck your mother",
    "target": "zh-TW"
   })

    request.end(function (resp) {
    if (resp.error) throw new Error(resp.error)

    console.log(resp.body.data[Object.keys(resp.body.data)][0])

  })*/

   })



app.post('/translate', function(req,res){
    res.status(200)
    //console.log(req.body)
    var s = req.body.Source
    var t = req.body.Target
    var q = req.body.Enquiry
    //console.log(req.body)

    var request = unirest("POST", "https://deep-translate1.p.rapidapi.com/language/translate/v2");

request.headers({
	"x-rapidapi-host": "deep-translate1.p.rapidapi.com",
	"x-rapidapi-key": "a07f9cb4d8msh83509fea0e3f6aap121007jsne4c63eea2053",
	"content-type": "application/json",
	"accept": "application/json",
	"useQueryString": true
})

request.type("json")
request.send({
	"q": q,
	"source": s,
	"target": t
})

request.end(function (response) {
	if (response.error) throw new Error(response.error)

  var textTranslate = response.body.data.translations.translatedText
  res.json({translation:textTranslate})
	console.log(response.body.data.translations.translatedText)
})

})






app.post('/api', function(req,res){
   res.status(200)
   //console.log(req.body)
   var word = req.body.wordRequest
   var language = req.body.languageOfword.languageSelect


  const url = "https://api.dictionaryapi.dev/api/v1/entries/"+language+"/"+word
   //console.log(url)

   http.get(url, function(resp){
    console.log(resp.statusCode)
    resp.on("data", function(data){
      const responseData = JSON.parse(data)
      var resTitle,resMessage,solution
      if(Object.getOwnPropertyNames(responseData)[0]=="title"){

       if(responseData.title=="No Definitions Found"){

         resTitle = "No results found"
         resMessage = responseData.message
         solution = responseData.resolution

         res.json({resTitle,resMessage,solution})
         res.end()
       }
       else if(responseData.title=="API Rate Limit Exceeded"){

         resTitle = "Limit Exceeded"
         resMessage = responseData.message
         solution = responseData.resolution

         res.json({resTitle,resMessage,solution})
         res.end()
       }

     } else {

       const description = responseData[0]
       var vocabulary = description.word
       var phon = description.phonetics

       var i
       var phoneticsText = new Array()
       var soundtrack = new Array()
       for(i in phon){
          phoneticsText[i] = phon[i].text
          soundtrack[i] = phon[i].audio
       }

       var detail = description.meaning
       console.log(detail)

       res.json({vocabulary,phon,detail})
       res.end()

     }

    })

  })
 }
)

app.listen(5000, function(){
    console.log("Server is running on port 5000.")
})
