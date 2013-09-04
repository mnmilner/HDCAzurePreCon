///client code for interacting with the Azure mobile service back end

function azClient (){
    var self = this;

    self.client = new WindowsAzure.MobileServiceClient("https://hdc13.azure-mobile.net/","JYfNaXuTCOjTJKRAUwmoEwhMgPAjna42");

    //get all the sessions
    self.getSessions = function (callback) {

        
        //mock for testing
        callback([{"id":"1", "title":"session 1", "description":"session 1 description", "speakerName":"Speaker 1", "isFavorite":true},
        {"id":"2", "title":"session 2", "description":"session 2 description", "speakerName":"Speaker 2", "isFavorite":false}]);
    };

    //get all speakers
    self.getSpeakers = function (callback) {
        
        //mock for testing
        callback([{ "id": "1", "name": "matt milner", "twitter": "milnertweet" },
        { "id": "2", "name": "adam grocholski", "twitter": "codel8r"}]);
    };

    self.getFavorites = function (callback){
        
        callback(null, 'not implemented');
    }

    //add a new speaker
    self.addSpeaker = function (speakerName, speakerTwitter, callback) {
        
        //testing
        //success
        callback({ "id": "1", "name": speakerName, "twitter": speakerTwitter });
        //error
        // callback(null, "error inserting speaker");

    };

    //add a new session
    self.addSession = function (title, description, speakerId, callback) {

        
        //testing
        //success
        callback({ "id": "1", "title": title, "description": description, "speakerId": speakerId, "speakerName":"Mock" });
        //error
        //callback(null, "error inserting session");
    };

    //mark a session as your favorite
    self.addFavorite = function (sessionId, callback) {
        //testing success
        callback();
    };

    self.login = function (callback) {
        
    };

}