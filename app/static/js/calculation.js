window.addEventListener('load',()=>{
    console.log("page loaded");
    // Add your JS code here
     
    const addend1       = document.querySelector("div.summationblock input[name='addend1']");
    const addend2       = document.querySelector("div.summationblock input[name='addend2']")
    let multiplicand    = document.querySelector("#multiplicand"); 
    let multiplier      = document.querySelector("#multiplier"); 
    let tempval         = document.querySelector("#tempval");
    let Summationbtn    = document.querySelector(".Sumbtn");
    let Multbtn         = document.querySelector(".Multbtn");
    let Convbtn         = document.querySelector(".Convbtn");  // Query by HTML class & element type. Select <>button element
    let Sumanswer       = document.querySelector(".sumanswer");       // Query by HTML class & element type. Select <p> element
    let Multanswer      = document.querySelector(".multanswer"); 
    let Convanswer      = document.querySelector(".convanswer"); 

    Summationbtn.addEventListener("click", async ()=>{ 
        //send message 
        console.log("Summation button clicked");
        // GET REQUEST EXAMPLE
        //const sendGET= async(number1, number2)=>{
            // Create URL
            console.log("Get request entered");
            const URL = `/sum?number1=${addend1.value}&number2=${addend2.value}`;
            console.log(URL);
            // Send GET request
            const response = await fetch(URL);
            if(response.ok){
                // Convert response to text
                let res = await response.text();
                // Print response to console
                console.log(res); 
                Sumanswer.innerHTML= res;
            }
       // }
        
    });

    Multbtn.addEventListener("click", async ()=>{ 
        //const sendPOST = async (number1, number2)=>{
            // Create URL 
            console.log("Multiplication button clicked");
            const URL = `/mul`;
            // Create data object for sending
            let data = {"number1":multiplier.value,"number2":multiplicand.value}
            // Send POST request
            const response = await fetch(URL,{method:"POST", body:JSON.stringify(data),headers:
            {'Content-Type': 'application/json' }});

            if(response.ok){
                // Convert response to text
                let res = await response.text();
                // Print response to console
                console.log(res); 
                Multanswer.innerHTML= res;
            }
            //}
    });


    // You suck at efficient copy and pasting :) you forgot the .value part
    Convbtn.addEventListener("click", async ()=>{ 
        const URL = `/conv`;
        // Create data object for sending
        let data = {"number1":tempval.value}
        // Send POST request
        const response = await fetch(URL,{method:"POST", body:JSON.stringify(data),headers:
        {'Content-Type': 'application/json' }});
        if(response.ok){
            // Convert response to text
            let res = await response.text();
            // Print response to console
            console.log(res); 
            Convanswer.innerHTML= res;
        }
    });

        //const sendPOST = async (number1, number2)=>{
            // Create URL 
        /*    console.log("Conversion button clicked");
            const URL = `/conv`;
            // Create data object for sending
            let data = {"number1":tempval.value}
            console.log(data);
            // Send POST request
            const response = await fetch(URL,{method:"POST", body:JSON.stringify(data),headers:
            {'Content-Type': 'application/json' }});

            if(response.ok){
                //console.log("response is ok");
                // Convert response to text
                let res = await response.text();
                // Print response to console
                console.log(res); 
                Convanswer.innerHTML= res;
            }
            //}
    });*/

});