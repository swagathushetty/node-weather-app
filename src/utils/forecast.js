const request=require('request')


const forecast=(latitude,longitude,callback)=>{

const url='https://api.darksky.net/forecast/0d68a37bffe18edac1e56549f50482ae/'+latitude+','+longitude


request({url,json:true},(error,{body})=>{
	if(error){
		callback('cannot connect to the API.try later',undefined)
	}else if(body.error){
		 callback('sorry location doesnt exist',undefined)
	}else{
		
		fTemp = Number(body.currently.temperature)
		Ctemp = (fTemp-32)*5/9

		fhightemp = Number(body.daily.data[0].temperatureHigh )
		chightemp=(fhightemp-32)*5/9
		flowtemp = Number(body.daily.data[0].temperatureLow )
        clowtemp=(flowtemp-32)*5/9
		callback(undefined,body.daily.data[0].summary + ' It is currently ' +Ctemp+ ' degress out. This high today is ' + chightemp+ ' with a low of ' +clowtemp+ '. There is a ' + body.currently.precipProbability + '% chance of rain.')
	     }
})

}
module.exports=forecast