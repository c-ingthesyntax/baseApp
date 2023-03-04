window.addEventListener('load',()=>{
    console.log("page loaded");
    // Add your JS code here
     
    const addend1 = document.querySelector("div.summationblock input[name='addend1']");
    const addend2 = document.querySelector("div.summationblock input[name='addend2']")

    let multiplicand    = document.querySelector("#multiplicand"); 
    let multiplier      = document.querySelector("#multiplier"); 
    let tempval         = document.querySelector("#tempval");
    let Summationbtn    =document.querySelector(".Sumbtn");
    let Multiplicationbtn    =document.querySelector(".summationblock > button");
    let Conversionbtn        =document.querySelector(".summationblock > button");  // Query by HTML class & element type. Select <>button element
    let Sumanswer            = document.querySelector(".sumanswer");       // Query by HTML class & element type. Select <p> element
    let Multanswer           = document.querySelector(".summationblock  > p"); 
    let Convanswer           = document.querySelector(".summationblock  > p"); 

    Summationbtn.addEventListener("click", async ()=>{ 
        //send message 
        console.log("Summation button clicked");
        const URL = '/sum?number1=${addend1.value}&number2=${addend2.value}';
        //URL.createobjectURL();
        const response = await fetch(URL);
        if (response.ok){
            //convert response to text format
            let res = await response.text();
            //print response to console
            console.log(res);
            Sumanswer.innerHTML= res;
        }
    });
    

});