var express = require("express");
var moment = require("moment");
var app = express();

app.set('port', (process.env.PORT || 5000));



app.get("/", function(req, res){
    res.send("Enter a number or date as parameter in the address Bar.");
});

app.get('/:datestring', function(request, response) {
    var dateString = request.params.datestring;
    var date;
    if(/^\d{8,}$/.test(dateString)){
        date = moment(dateString, "X");
    }
    else {
        date = moment(dateString, "MMMM D, YYYY")
    }
    
    if(date.isValid()){
        response.json({"unix": date.format("X"), "natural": date.format("MMMM D, YYYY")});
    }
    else{
        response.json({"unix": null, "natural": null});
    }
    
    
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});