if(Meteor.isClient) {

    console.log("Hello Browser!");

    Template.leaderboard.helpers({
        'player': function(){return PlayersList.find();},
        'players': function(){return PlayersList.find().count();},
        'selectedClass': function(){
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (playerId == selectedPlayer) {
                return "selected";
            }
        }
    });

    Template.leaderboard.events({
        'click .player': function(){
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
        },
        'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc, {score: 5}});
        }
        'click .decrement': function(){
            var selectedPlayer = Session.get('selectedPlayer');
            PlayersList.update(selectedPlayer, {$inc, {score: -5}});
        }
    });
}

if(Meteor.isServer) {
    console.log("Hello Server!");
}

PlayersList = new Mongo.Collection('players');

function insertPlayer(name, score) {
    PlayersList.insert({
        name: name,
        score: score
    });
}

function removeDuplicatePlayers()
{
    // Do it 
}
/*
insertPlayer("David", 0);
insertPlayer("Bob", 0);
insertPlayer("Mary", 0);
insertPlayer("Bill", 0);
insertPlayer("Warren", 0);
insertPlayer("Tim", 0);
*/
