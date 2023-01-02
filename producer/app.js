const kafka = require('kafka-node');
require("dotenv").config();

const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});
const producer = new kafka.Producer(client);
const payload = [{ topic: "test_topic", messages: "Test message"}];

setInterval(() => {  
  producer.send(payload, (error, result) => {   
    console.log("Sending payload to Kafka");    
    if (error) {      
      console.log( "Sending payload failed: ", error); 
      return;   
    }

    console.log("Sending payload result:", result);       
  });
}, 10000) 