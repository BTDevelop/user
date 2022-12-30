const  Kafka  = require('kafkajs')

require('dotenv').config()

function ConnectKafka () {

const kafkaClient = new Kafka({
    clientId: process.env.SERVICE_NAME ,
    brokers: ['localhost:9092'],
})

const kafkaProducer = kafkaClient.producer();

kafkaProducer.connect().then( () => {
      console.log('kafka producer connected');
});

}

module.exports = ConnectKafka
