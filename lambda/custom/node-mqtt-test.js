const mqtt = require('mqtt')
const config = require('./config')


console.log("connecting to client...")

// client.on('connect', function () {
//     console.log("connected!")
//     client.publish('presence', 'Hello mqtt')
// })

// client.on('error', error => {
//     console.log('error:')
//     console.log(error)
// })


exports.handler = async (event) => {
    // TODO implement
    
    function talkToMQTT (callback) {
        const client  = mqtt.connect('mqtt://m24.cloudmqtt.com', config)
      
        client.on('connect', function () {
          console.log("connected!")
          client.publish('presence', 'Hello mqtt')
        })
        
        client.on('error', error => {
            console.log('error:')
            console.log(error)
        })
    
     
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;

    
};
