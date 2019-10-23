const path=require('path') //core module.no need to install
const express=require('express');
const app=express();
const port=process.env.PORT||3000 //gets value if it can  otherwise run 3000(locally)
const hbs=require('hbs')

const request=require('request')
const geocode=require('../src/utils/geocode')
const forecast=require('../src/utils/forecast')

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up handlebers engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)

//configuring partials path
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res)=>{
	res.render('index',{
		title:'weather app',
		name:'swagath'
	}) //no need of .hbs
})

app.get('/about',(req,res)=>{
	res.render('about',{
		title:'about me',
		name:'swagath shetty'
	})
})

app.get('/help',(req,res)=>{
	res.render('help',{
		helptxt:'i am stranded herer',
		title:'Help',
		name:'swagath shetty'
	}) 
})

app.get('/weather',(req,res)=>{
	
	if(!req.query.address){
		return res.send({error:"no address added"})
	}
    
	geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
		if(error){
			return res.send({error:error})
		}	 
		//the below function runs after the above ends
		//input for forecast comes from output of geocode
		forecast(latitude,longitude,(error,forecastData)=>{
			if(error){
				return res.send({error:error})
			}
			res.send(
				{location:location,
			     forecast:forecastData})
		})
	})
});

app.get('/products',(req,res)=>{
	//if search doesnt exist
	if(!req.query.search){
		return res.send({
			error:"you must provide a search term"
		});
	}
	//no need for else because "if" runs due to return the below will not run
	console.log(req.query.search)
	res.send({
		products:[]
	})
 
});

app.get('/help/*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'swagath shetty',
		errorMessage:'Help page doesnt exist'		
	})
})

app.get('*',(req,res)=>{
	res.render('404',{
		title:'404',
		name:'swagath shetty',
		errorMessage:'Page not found'		
	})
})

app.listen(port,()=>{
	console.log('server has started on'+port)
})