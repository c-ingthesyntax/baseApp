window.onload = (event) => {
    
  console.log('page is fully loaded');
  
  var mqtt;
  var connected_flag      =  0	
  var reconnectTimeout    = 2000;  
  var pubtopic            = "620151519_lab3";       //Replace with your ID number ex. 620012345_lab3  
  var subtopic            = "620151519";            //Replace with your ID number ex. 620012345. MQTT topic for subscribing to
  var host                = "www.yanacreations.com";  // MQTT HOST
  var port                = 8883;                     // MQTT Port
  var messages;
  var elevationData = [ ];
  
  /* HTML ELEMENT SELECTORS */
  // Query selector objects used to manipulate HTML elements
  let printMessage        = document.querySelector("#messages");          // Query by HTML Element's id. Select <div> element
  let printStatus         = document.querySelector("#status"); 

  let kitchenCard         = document.querySelector(".kitchen > p");       // Query by HTML class & element type. Select <p> element
  let kitchenCardBtn      = document.querySelector(".kitchen > button");  // Query by HTML class & element type. Select <button> element
  let kitchenImg          = document.querySelector(".kitchen > img");

  let livingroomCard         = document.querySelector(".livingroom > p");       // Query by HTML class & element type. Select <p> element
  let livingroomCardBtn      = document.querySelector(".livingroom > button");  // Query by HTML class & element type. Select <button> element
  let livingroomImg          = document.querySelector(".livingroom > img");

  let bedroomCard         = document.querySelector(".bedroom > p");       // Query by HTML class & element type. Select <p> element
  //let bedroomCardBtn      = document.querySelector(".bedroom > button");  // Query by HTML class & element type. Select <button> element
  //let bedroomTitle        = document.querySelector(".bedroom > h4");       // Query by HTML class & element type. Select <p> element
  //let bedroomImg          = document.querySelector(".bedroom > img");

  let bathroomCard         = document.querySelector(".bathroom > p");       // Query by HTML class & element type. Select <p> element
  let bathroomCardBtn      = document.querySelector(".bathroom > button");  // Query by HTML class & element type. Select <button> element
  //let bathroomTitle        = document.querySelector(".bathroom > h4");       // Query by HTML class & element type. Select <p> element
  let bathroomImg          = document.querySelector(".bathroom > img");

  let studyroomCard         = document.querySelector(".studyroom > p");       // Query by HTML class & element type. Select <p> element
  let studyroomCardBtn      = document.querySelector(".studyroom > button");  // Query by HTML class & element type. Select <button> element
  // let studyroomTitle        = document.querySelector(".studyroom > h4");       // Query by HTML class & element type. Select <p> element
  let studyroomImg          = document.querySelector(".studyroom > img");

  let hallCard         = document.querySelector(".hall > p");       // Query by HTML class & element type. Select <p> element
  let hallCardBtn      = document.querySelector(".hall > button");  // Query by HTML class & element type. Select <button> element
  //let hallTitle        = document.querySelector(".hall > h4");       // Query by HTML class & element type. Select <p> element
  let hallImg          = document.querySelector(".hall > img");

  let frontdoorCard       = document.querySelector(".frontdoor > p"); 
  let frontdoorImg      = document.querySelector(".frontdoor >img");

  let balcdoorCard       = document.querySelector(".balconydoor > p"); 
  let balcdoorImg      = document.querySelector(".balconydoor >img");

  let start = document.querySelector("#start"); 
  let end = document.querySelector("#end"); 
  let plotBtn = document.querySelector(".plot"); 

  let limit = 10;

  /* EVENT LISTENERS */

  // Add event listener which sends fetch request to server once plot button is clicked   
  plotBtn.addEventListener("click", async ()=>{      
    let starttime  = new Date(start.value).getTime() / 1000;     
    let endtime     = new Date(end.value).getTime() / 1000;          
    // Request data from server     
    const URL = `/data?start=${starttime}&end=${endtime}&variable=OUTTEMP`;     
    const response = await fetch(URL);     
    if(response.ok){         
      let res = await response.json();                  
      elevationData = [...res];         
      //Print data  received to console         
      console.log(elevationData);                   
      // Render plot with received data         
      graph.update({           
        series: [{             
          data: res,            
          lineColor: Highcharts.getOptions().colors[1],             
          color: Highcharts.getOptions().colors[2],             
          fillOpacity: 0.5,            
          name: 'Temperature',             
          marker: {               
            enabled: false             
          },             
          threshold: null           
        }]      
      });    
    }       
  });

  //KITCHEN CODE
  kitchenCardBtn.addEventListener("click", ()=>
  { 
    console.log("Kitchen Button clicked");
    // Send message
    let message = {"type":"toggle","sensor":"KITCHEN"};
    send_message(JSON.stringify(message));
  });
  
  //LIVINGROOM CODE  
  livingroomCardBtn.addEventListener("click", ()=>
  { 
    console.log("Livingroom Button clicked");
    // Send message
    let message = {"type":"toggle","sensor":"LIVINGROOM"};
    send_message(JSON.stringify(message));
  });
  
   //BEDROOM CODE
   /*bedroomCardBtn.addEventListener("click", ()=>
   { 
     console.log("Bedroom Button clicked");
 
       // Send message
       let message = {"type":"toggle","sensor":"BEDROOM"};
       send_message(JSON.stringify(message));
    }); */
    
     
  //BATHROOM CODE
  bathroomCardBtn.addEventListener("click", ()=>
  { 
    console.log("Bathroom Button clicked");
    // Send message
    let message = {"type":"toggle","sensor":"BATHROOM"};
    send_message(JSON.stringify(message));
  });

  
   //STUDYROOM CODE
  studyroomCardBtn.addEventListener("click", ()=>
  { 
    console.log("Studyroom Button clicked");
    // Send message
    let message = {"type":"toggle","sensor":"STUDYROOM"};
    send_message(JSON.stringify(message));
  });

  //HALL CODE
  hallCardBtn.addEventListener("click", ()=>
  { 
    console.log("Hall Button clicked");
    // Send message
    let message = {"type":"toggle","sensor":"HALL"};
    send_message(JSON.stringify(message));
  });

  /* MQTT FUNCTIONS  */  
  onMessageArrived = (r_message)=>{    
      
      try
      {
        // Convert message received to json object
        let mssg  = JSON.parse(r_message.payloadString); 
        messages = mssg;
        console.log(r_message.payloadString);  
        console.log(".....");

        // Print json message to console(View in Browser Dev Tools)
        console.log(mssg); 

        if(mssg.TYPE == "SENSOR")
        {   
          // Update webpage 

          ///////KITCHEN CODE
          kitchenCard.innerHTML  =  mssg.KITCHEN;          
          if (kitchenCard.innerHTML == "OFF" )
          {        
            kitchenImg.src = "../static/lightbulb-off-svgrepo-com.png";
            kitchenCard.innerHTML = "OFF";       
          }
          else if(kitchenCard.innerHTML== "ON")
          {        
            kitchenImg.src = "../static/lightbulb-on-svgrepo-com.png";
            kitchenCard.innerHTML = "ON";        
          }
          else
          {        
            console.error(error);
          }


          ///////LIVINGROOM CODE
          livingroomCard.innerHTML = mssg.LIVINGROOM;
          if (livingroomCard.innerHTML == "OFF" )
          {        
            livingroomImg.src = "../static/lightbulb-off-svgrepo-com.png";
            livingroomCard.innerHTML = "OFF";      
          }
          else if(livingroomCard.innerHTML == "ON")
          {        
            livingroomImg.src = "../static/lightbulb-on-svgrepo-com.png";
            livingroomCard.innerHTML = "ON";       
          }           
          else
          {        
            console.error(error);
          }     
          
          ///////BEDROOM CODE --- no button on webpage for it so it's commented out
          bedroomCard.innerHTML   =  mssg.BEDROOM;   
          /*if (bedroomCard.innerHTML == "OFF" )
          {        
            bedroomImg.src = "../static/lightbulb-off-svgrepo-com.png";
            bedroomCard.innerHTML = "OFF";      
          }
          else if(bedroomCard.innerHTML == "ON")
          {        
            bedroomImg.src = "../static/lightbulb-on-svgrepo-com.png";
            bedroomCard.innerHTML = "ON";       
          }           
          else
          {        
            console.error(error);
          }     */
          
          //BATHROOM CODE
          bathroomCard.innerHTML = mssg.BATHROOM;
          if (bathroomCard.innerHTML == "OFF" )
          {        
            bathroomImg.src = "../static/lightbulb-off-svgrepo-com.png";
            bathroomCard.innerHTML = "OFF";      
          }
          else if(bathroomCard.innerHTML == "ON")
          {        
            bathroomImg.src = "../static/lightbulb-on-svgrepo-com.png";
            bathroomCard.innerHTML = "ON";       
          }           
          else
          {        
            console.error(error);
          }     

          //STUDYROOM CODE
          studyroomCard.innerHTML   =  mssg.STUDYROOM;   
          if (studyroomCard.innerHTML == "OFF" )
          {        
            studyroomImg.src = "../static/lightbulb-off-svgrepo-com.png";
            studyroomCard.innerHTML = "OFF";      
          }
          else if(studyroomCard.innerHTML == "ON")
          {        
            studyroomImg.src = "../static/lightbulb-on-svgrepo-com.png";
            studyroomCard.innerHTML = "ON";       
          }           
          else
          {        
            console.error(error);
          }     

          //HALL CODE  
          hallCard.innerHTML = mssg.HALL;
          if (hallCard.innerHTML == "OFF" )
          {        
            hallImg.src = "../static/lightbulb-off-svgrepo-com.png";
            hallCard.innerHTML = "OFF";      
          }
          else if(hallCard.innerHTML == "ON")
          {        
            hallImg.src = "../static/lightbulb-on-svgrepo-com.png";
            hallCard.innerHTML = "ON";       
          }           
          else
          {        
            console.error(error);
          }      

          //FRONTDOOR CODE
          frontdoorCard.innerHTML = mssg.FRONTDOOR;
          if (frontdoorCard.innerHTML== "CLOSED" )
          {
            frontdoorImg.src = "../static/door-svgrepo-com.svg";
          }
          else if(frontdoorCard.innerHTML == "OPEN")
          {
            frontdoorImg.src = "../static/door-open-svgrepo-com.svg";
          }
          else
          {
            console.error(error);
          }


          //BALCONYDOOR CODE
          balcdoorCard.innerHTML = mssg.BALCONYDOOR;
          if (balcdoorCard.innerHTML == "CLOSED" )
          {
            balcdoorImg.src = "../static/door-svgrepo-com.svg";
          }
          else if(balcdoorCard.innerHTML == "OPEN")
          {
            balcdoorImg.src = "../static/door-open-svgrepo-com.svg";
          }
          else
          {
            console.error(error);
          }
           
          //GRAPH 
          console.log(mssg.TIMESTAMP);
          console.log(mssg.TEMP);          
          let timestamp = mssg.TIMESTAMP;
          let temperature = mssg.TEMP; 
          if(limit > 0){
            liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, false);
            limit--;
          }
          else{
            liveGraph.series[0].addPoint({y:parseFloat(temperature) ,x:((parseInt(timestamp) - 18000 )*1000) }, true, true);
          }
        }
        
   
      }
      catch (error){
        console.error(error);
      }
   
         
  }
  
  onConnectionLost = ()=>{
      console.log("connection lost"); 
      printMessage.classList.remove("mqttConnected");
      printMessage.classList.add("mqttdisconnected");
      setTimeout(connect,3000);
    }
    
    
  onFailure = (message) => {
    console.log("Failed"); 
    printMessage.classList.remove("mqttConnected");
    printMessage.classList.add("mqttdisconnected");
    setTimeout(MQTTconnect, reconnectTimeout);
  }
    

  onConnected = (recon,url)=>{
    console.log(" in onConnected " +recon);
  }
  
  onConnect = ()=>{
   // Once a connection has been made, make a subscription and send a message. 
  connected_flag          = 1 
  printMessage.classList.add("mqttConnected");
  printMessage.classList.remove("mqttDisconnected");
  console.log(`on Connect ${connected_flag}`); 
  sub_topics();
   }
  
  
  makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
  }
  
  var IDstring = makeid(12);
  
  MQTTconnect = ()=> {
  
  console.log(`connecting to  ${host}   ${port}`);
  mqtt = new Paho.MQTT.Client( host ,port,IDstring);
  
 
  var options = {
          timeout: 3,
          onSuccess: onConnect,
          onFailure: onFailure,   
          useSSL:true  
       };
  
  mqtt.onConnectionLost = onConnectionLost;
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnected = onConnected;
  mqtt.connect(options);
  return false;
   
   
  }
  
  
  sub_topics = ()=>{   
  console.log("Subscribing to topic = "+ subtopic);
  mqtt.subscribe(subtopic);
  return false;
  }
  
  send_message = (msg)=>{

    printStatus.innerHTML ="";
    if (connected_flag == 0){
        out_msg="<b style='color:red'> Not Connected so can't send </b>"
        console.log(out_msg);
        printStatus.innerHTML = out_msg;
        setTimeout(function(){ printStatus.innerHTML = " ";  }, 3000);
        return false;
    }
    else{  
        // Send message                   
        var message = new Paho.MQTT.Message(msg);
        message.destinationName = pubtopic;
        mqtt.send(message);
        return true;
        }   
  }

  btntog=()=>
  {
    console.log("btntog entered");
    
        
    
  }  
  
  // Connect to MQTT broker
  MQTTconnect();
  

  /* GRAPH  */    
  graph = Highcharts.chart('container', {      
    chart: {       
      type: 'area',       
      zoomType: 'x',       
      panning: true,       
      panKey: 'shift',       
      scrollablePlotArea: {         
        minWidth: 600       
      }     
    },   

    title: {       
      text: 'Average Outside Temperature',       
      align: 'center'     
    },         

    xAxis: {       
      type: "datetime"      
    },    

    yAxis: {       
      startOnTick: true,       
      endOnTick: false,       
      maxPadding: 0.35,       
      title: {         
        text: null       
      },       
      labels: {         
        format: '{value} °C'       
      }      
    },        
    tooltip: {       
      // headerFormat: 'Distance: {point.x:.1f} km<br>',       
      pointFormat: '{point.y:.1f} °C',       
      shared: true     
    },        
    legend: {       
      enabled: false     
    },        
    series: [{       
      data: elevationData,       
      lineColor: Highcharts.getOptions().colors[1],       
      color: Highcharts.getOptions().colors[2],       
      fillOpacity: 0.5,       
      name: 'Temperature',       
      marker: {         
        enabled: false       
      },       
      threshold: null     
    }]      
  }); 

  // Render live Graph   
  liveGraph = Highcharts.chart('livedata', {     
    chart: {       
      type: 'spline',       
      zoomType: 'x',       
      panning: true,       
      panKey: 'shift',       
      scrollablePlotArea: {         
        minWidth: 600       
      }     
    },       
    title: {       
      text: 'Live Temperature Data',       
      align: 'center'     
    },          
    xAxis: {       
      type: "datetime"      
    },       
    yAxis: {       
      startOnTick: true,       
      endOnTick: false,       
      maxPadding: 0.35,       
      title: {         
        text: null       
      },       
      labels: {         
        format: '{value} °C'       
      }      
    },       
    tooltip: {       
      // headerFormat: 'Distance: {point.x:.1f} km<br>',       
      pointFormat: '{point.y:.1f} °C',       
      shared: true     
    },        
    legend: {       
      enabled: false     
    },        
    series: [{       
      data: [],       
      lineColor: Highcharts.getOptions().colors[3],       
      color: Highcharts.getOptions().colors[2],       
      fillOpacity: 0.5,       
      name: 'Temperature',       
      marker: {         
        enabled: false       
      },       
      threshold: null     
    }]      
  });
  };