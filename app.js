const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'))

const tf = require('@tensorflow/tfjs')
require('@tensorflow/tfjs-node')
const models = require('./Model');

const jpeg = require('jpeg-js');

const NUMBER_OF_CHANNELS = 3

const readImage = base64 => {
    const buf = Buffer.from(base64, 'base64') 
    const pixels = jpeg.decode(buf, true);
    return pixels
}

const imageByteArray = (image, numChannels) => {
    const pixels = image.data
    const numPixels = image.width * image.height;
    const values = new Int32Array(numPixels * numChannels);
  
    for (let i = 0; i < numPixels; i++) {
      for (let channel = 0; channel < numChannels; ++channel) {
        values[i * numChannels + channel] = pixels[i * 4 + channel];
      }
    }
  
    return values
}
  
const imageToInput = (image, numChannels) => {
const values = imageByteArray(image, numChannels)
const outShape = [image.height, image.width, numChannels];
const input = tf.tensor3d(values, outShape, 'int32');

return input
}

const loadModel = async path => {
    const model = await models.load(path);
    return model;
  }

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

let mn_model;
io.on('connection',async function (socket) {
    console.log('client connected');
    
    socket.on('request',async function (data) {
        const image = readImage(data)
        const input = imageToInput(image, NUMBER_OF_CHANNELS)
        
        
        const predictions = await mn_model.detect(input)
        // console.log(predictions);

        socket.emit('response', predictions);
    })

});


server.listen(3000 , async () =>{
    mn_model = await loadModel('./public/model_web');
    console.log('server listening on port 3000')
});
