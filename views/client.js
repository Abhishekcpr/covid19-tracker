 


 document.querySelector("#send").addEventListener('click',()=>{
    var target = document.querySelector("#country") ;
    var content = target.options[target.selectedIndex].text ; // this gives content of selected option
    console.log(content); 
    location.href = window.location.href + `about?country=${content}` ;
 })

