var friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

  app.post("/api/friends", function(req, res) {
    // This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic.
    var newFriend = req.body;
    var currentMatch;
    var currentDiff;
    var bestDiff;

    for (var i = 0; i < friendsData.length; i++) {
      currentDiff = 0;
      for (var j = 0; j < 10; j++) {
        currentDiff = currentDiff + Math.abs((parseInt(newFriend.scores[j]) - friendsData[i].scores[j]));
      }
      if (i === 0) { //our first compare, noone to check against
        currentMatch = 0;
        bestDiff = currentDiff;
      } else {
        if (currentDiff < bestDiff) {
          currentMatch = i;
          bestDiff = currentDiff;
        }
      }
    }
    friendsData.push(newFriend);
    //display best match
    res.send(friendsData[currentMatch]);
  });

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];

    console.log(friendsData);
  });
};