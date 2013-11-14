///client code for interacting with the Azure mobile service back end

function azClient (){
    var self = this;

    self.client = new WindowsAzure.MobileServiceClient("https://hdcazureconference.azure-mobile.net","[[YOUR APPLICATION KEY HERE]]");

    //get all the sessions
    self.getSessions = function (callback) {

        self.client.getTable("sessions").read().then(
        function (results) {
            callback(results);
        }, function (error) {
            callback(null, error);
        });

        //mock for testing
        //callback([{"id":"1", "title":"session 1", "description":"session 1 description", "speakerName":"Speaker 1", "isFavorite":true},
        //{"id":"2", "title":"session 2", "description":"session 2 description", "speakerName":"Speaker 2", "isFavorite":false}]);
    };

    //get all speakers
    self.getSpeakers = function (callback) {
        self.client.getTable("speakers").read().then(function (results) {
            callback(results);
        }, function (error) {
            callback(null, error);
        });
        //mock for testing
        //callback([{ "id": "1", "name": "matt milner", "twitter": "milnertweet" },
        //{ "id": "2", "name": "adam grocholski", "twitter": "aghoski"}]);
    };

    self.getFavorites = function (callback){
        self.client.invokeApi("myFavoriteSessions", {
            method: "get",
            body: null
        }).done(
            function (result){
                callback(JSON.parse(result.responseText));
            },
            function (error){
                callback(null, error);
            }
        );
    }

    //add a new speaker
    self.addSpeaker = function (speakerName, speakerTwitter, callback) {
        self.client.getTable("speakers").insert(
            { "name": speakerName, "twitter": speakerTwitter }).then(
            function (result) {
                callback(result);
            },
            function (error) {
                callback(null, error);
            });
        //testing
        //success
        //callback({ "id": "1", "name": speakerName, "twitter": speakerTwitter });
        //error
        // callback(null, "error inserting speaker");

    };

    //add a new session
    self.addSession = function (title, description, speakerId, callback) {

        self.client.getTable("sessions").insert(
            { "title": title, "description": description, "speakerId": speakerId }).then(
                function (result) {
                    callback(result);
                },
                function (error) {
                    callback(null, error);
                });

        //testing
        //success
        //callback({ "id": "1", "title": title, "description": description, "speakerId": speakerId });
        //error
        //callback(null, "error inserting session");
    };

    //mark a session as your favorite
    self.addFavorite = function (sessionId, callback) {
        self.client.getTable("favorites").insert(
        { "sessionId": sessionId }).then(
        function (result) {
            callback();
        },
        function (error) {
            callback(error);
        });

    };

    self.login = function (callback) {
        self.client.login("twitter").done(function (results) {
            if (results.userId !== null) {
                callback(results.userId);
            }
            else {
                callback(null, "Login failed");
            }
        });
    };

}