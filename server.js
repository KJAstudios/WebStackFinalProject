const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/idle_game', {
    useNewUrlParser: true
});

const upgradeSchema = new mongoose.Schema({
    upgradeId: Number, name: String, initalPrice: Number,
    startingIncome: Number
})
const Upgrade = mongoose.model('Upgrade', upgradeSchema);

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + "/static"));

app.post('/upgrade', function(request, response){
    console.log("recieve upgrade search request");
    console.log(request.body);
    Upgrade.find({upgradeId: request.body.upgradeId}).then(data =>{
        response.send(data);
    });
});

app.post('/createUpgrade', function(request, response){
    console.log("received post");
    console.log(request.body);
    let upgrade = new Upgrade();
    upgrade.upgradeId = request.body.upgradeId;
    upgrade.name = request.body.name;
    upgrade.initalPrice = request.body.initalPrice;
    upgrade.startingIncome = request.body.startingIncome;
    upgrade.save().then(newUpgrade => console.log('upgrade created: ' + newUpgrade)).catch(error => console.log(error));
    response.end();
});

app.get('/clear', function(request, response){
   Upgrade.deleteMany({}, function(){
       response.end();
   });
})

app.listen(8000, () => console.log("listening on port 8000"))