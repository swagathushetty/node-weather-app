const request=require('request')


const forecast=(latitude,longitude,callback)=>{

const url='https://api.darksky.net/forecast/0d68a37bffe18edac1e56549f50482ae/'+latitude+','+longitude


request({url,json:true},(error,{body})=>{
	if(error){
		callback('cannot connect to the API.try later',undefined)
	}else if(body.error){
		 callback('sorry location doesnt exist',undefined)
	}else{
		callback(undefined,{temp:body.currently.temperature,
				  rain:body.currently.precipProbability

		});
		
	}
})

}
module.exports=forecast