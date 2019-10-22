const request=require('request')

const geocode=(address,callback)=>{

	//we can use diectly use address in the url
	//ecodeURIComponent(address) converts special characters to URL 
	//for normal string address is fine
	const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3dhZ2F0aDU1IiwiYSI6ImNrMWFoamNndTA3dXAzY252eXFhM2ZtMW4ifQ.zrf2f-n0y7UndYASTGSB5A&limit=1'
	request({url,json:true},(error,{body})=>{
		if(error) {
			callback('unable to connect to location services',undefined)
		}else if(body.features.length==0){
			callback('UNABLE TO FIND LOCATION',undefined)
		}else{
			callback(undefined,{
				latitude:body.features[0].center[1],
				longitude:body.features[0].center[0],
				location:body.features[0].place_name
			})
		}

	})
}

module.exports=geocode