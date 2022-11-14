let axios=require("axios")

let getLondonWeather=async function(req,res){

    try{
        let london=req.query.q
        let appid=req.query.appid
        let options={
            method:"get",
            url:`http://api.openweathermap.org/data/2.5/weather?q=${london},&appid=${appid}`,

        }
        let result=await axios(options)
        console.log(result.data)
        res.status(200).send({msg:result.data})
    }catch(err){
        console.log(err)
        res.send(500).send({msg:err.message})
    }
}

let getLondonTemprature=async function(req,res){
    try{
        let london=req.query.q
        let appid=req.query.appid
        let options={
            method:"get",
            url:`http://api.openweathermap.org/data/2.5/weather?q=${london},&appid=${appid}`
        }
        let result=await axios(options)
        console.log(result.data)
        res.status(200).send({Temperature:result.data.main.temp})
    }catch(err){
        console.log(err)
        res.status(500).send({msg:err.message})
    }
}

let getSelectedCities=async function(req,res){
    try{
        let cities=[
            "Bengaluru",
            "Mumbai",
            "Delhi",
            "Kolkata",
            "Chennai",
            "London",
            "Moscow",
        ]
        let cityObjArray=[]
        for(i=0;i<cities.length;i++){
            let obj={city:cities[i]}
            let resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=c8d2f0516760ce59972ac981f3c2cc20`)
            obj.temp=resp.data.main.temp
            cityObjArray.push(obj)
        }
        let sorted=cityObjArray.sort(function(a,b){return a.temp-b.temp})
        res.status(200).send({status:true,data:sorted})
    }catch(err){
        console.log(err)
        res.status(500).send({msg:err.message})


    }
}

let meme=async function(req,res){
    try{
        let templateid=req.query.template_id
        let text0=req.query.text0
        let text1=req.query.text1
        let username=req.query.username
        let password=req.query.password
        let options={
            method:"post",
            url:`https://api.imgflip.com/caption_image?template_id=${templateid}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
        }
        let result=await axios(options)
        res.send({data:result.data})
    }catch(err){
        console.log(err)
        res.status(500).send({msg:err.message})
    }
}
module.exports.getLondonWeather=getLondonWeather
module.exports.getLondonTemprature=getLondonTemprature
module.exports.getSelectedCities=getSelectedCities
module.exports.meme=meme