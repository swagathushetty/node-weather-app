const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message1')
const messageTwo=document.querySelector('#message2')




weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault() //prevents default behavour of refreshing page after submit
    const location=search.value

    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else {
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            
        }
    })
})

    console.log(location)
})


