const request=require('request')


const forecast=(latitude,longitude,callback)=>{

const url='https://api.darksky.net/forecast/0d68a37bffe18edac1e56549f50482ae/'+latitude+','+longitude


request({url,json:true},(error,{body})=>{
	if(error){
		callback('cannot connect to the API.try later',undefined)
	}else if(body.error){
		 callback('sorry location doesnt exist',undefined)
	}else{
		callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
	     }
})

}
module.exports=forecast