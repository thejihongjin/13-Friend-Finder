var friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        friendsData.push(req.body);

        var user = friendsData[friendsData.length - 1];
        var lastDifference = 0;
        var bestMatch;

        for (var i = 0; i < friendsData.length - 1; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                totalDifference += Math.abs(parseInt(user.scores[j]) - parseInt(friendsData[i].scores[j]));
            }

            if (lastDifference === 0) {
                lastDifference = totalDifference;
            } else {
                if (totalDifference < lastDifference) {
                    lastDifference = totalDifference;
                    bestMatch = friendsData[i];
                }
            }
        }

        res.json(bestMatch);
    });
};