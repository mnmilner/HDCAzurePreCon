/// <reference path="client.js" />
/// <reference path="common.js" />

function indexViewModel(){
    var self = this;
    self.sessions = [];
    self.speakers = [];
    self.favorites = [];
    self.mobileClient = new azClient();
    self.dialogs = new common();

    ///switches the view to show either sessions or speakers
    self.switchView = function (newView) {
        switch (newView) {
            case "sessions":
                $("#sessionContent").show();
                $("#speakerContent").hide();
                $("#sessionsMenuItem").addClass("active");
                $("#speakersMenuItem").removeClass("active");
                break;
            case "speakers":
                $("#sessionContent").hide();
                $("#speakerContent").show();
                $("#speakersMenuItem").addClass("active");
                $("#sessionsMenuItem").removeClass("active");
                break;
            case "favorites":
                $("#sessionContent").hide();
                $("#speakerContent").hide();
                $("#favoritesContent").show();
                $("#speakersMenuItem").removeClass("active");
                $("#sessionsMenuItem").removeClass("active");
                $("#favoritesMenuItem").addClass("active");
                break;
        }

        self.loadContent(newView);
    };

    ///loads the sessions or speakers if they are not already populated
    self.loadContent = function (view, force) {
        switch (view) {
            case "sessions":
                if (self.sessions === undefined || self.sessions.length == 0 || force === true) {

                    self.mobileClient.getSessions(function (results, error) {
                        if (error === undefined) {
                            self.sessions = results;
                            var sessionHtml = $.templates("#sessionTemplate").render(self.sessions);
                            document.getElementById("sessions").innerHTML = sessionHtml;
                        }
                        else {
                            self.dialogs.showError(error);
                        }
                    });
                }
                break;
            case "speakers":
                if (self.speakers === undefined || self.speakers.length == 0) {
                    self.mobileClient.getSpeakers(function (results, error) {
                        if (error === undefined) {
                            self.speakers = results;
                            for (var speakerIndex = 0; speakerIndex < self.speakers.length; speakerIndex++) {
                                self.addSpeakerToList(self.speakers[speakerIndex]);
                            }
                        }
                        else {
                            self.dialogs.showError(error);
                        }
                    });
                }
                break;
            case "favorites":
                self.mobileClient.getFavorites(function (results, error) {
                    if (error === undefined) {
                        self.favorites = results;
                        var favoritesHtml = $.templates("#favoriteTemplate").render(self.favorites);
                        document.getElementById("favorites").innerHTML = favoritesHtml;
                    }
                    else {
                        self.dialogs.showError(error);
                    }
                });
                break;
        }
    };

    //add a session to the conference
    self.addSession = function () {
        var title, description, speakerID;
        //get data from form
        title = document.getElementById("sessionTitle").value;
        description = document.getElementById("sessionDescription").value;
        speakerID = document.getElementById("speakerList").value;

        //add session to mobile backend
        self.mobileClient.addSession(title, description, speakerID, function (result, error) {
            //on success, add session to the list of sessions
            if (error === undefined) {
                if (self.sessions === undefined) {
                    self.sessions = [result];
                }
                else {
                    self.sessions.push(result);
                }
                //update ui with new session (REAL-WORLD: use a framework with binding)
                self.addSessionToList(result);
            }
            else {
                self.dialogs.showError(error);
            }
            $("#newSessionDialog").modal("hide");
        });



    };

    //add a speaker to the conference
    self.addSpeaker = function () {

        var speakerName, speakerTwitter;
        //get data from form
        speakerName = document.getElementById("speakerName").value;
        speakerTwitter = document.getElementById("speakerTwitter").value;


        //add speaker to mobile back end
        self.mobileClient.addSpeaker(speakerName, speakerTwitter, function (result, error) {
            if (error === undefined) {
                //on success add speaker to the collection
                if (self.speakers === undefined) {
                    self.speakers = [result];
                }
                else {
                    self.speakers.push(result);
                }

                //update UI items with the new speaker (REAL-WORLD: use a framework with binding)
                self.addSpeakerToList(result);
            }
            else {
                //on error show error message
                self.dialogs.showError(error);
            }
            $("#newSpeakerDialog").modal("hide");
        });

    };

    /// mark a session as a favorite
    self.markSessionAsFavorite = function (sessionId) {
        self.mobileClient.addFavorite(sessionId, function (error) {
            if (error === undefined) {
                //get session from array and change favorite flag
                for (var itemIndex = 0; itemIndex < self.sessions.length; itemIndex++) {
                    if (self.sessions[itemIndex].id == sessionId) {
                        self.sessions[itemIndex].isFavorite = true;
                        break;
                    }
                }
                //re-render the items in the session list (REAL-WORLD: re-render just the item you updated
                document.getElementById("sessions").innerHTML = $.templates("#sessionTemplate").render(self.sessions);
            }
            else {
                self.dialogs.showError(error);
            }
        });
    };

    self.login = function () {
        self.mobileClient.login(function (userName, error) {
            if (error === undefined) {
                //show username and reload sessions to show favorites
                $("#userId").text(userName);
                self.loadContent("sessions", true);
            }
            else {
                self.dialogs.showError(error);
            }

        });
    };


    //internal ui methods
    self.addSessionToList = function (session) {
        //add session item to HTML
        var sessionHtml = $.templates("#sessionTemplate").render(session);
        $("#sessions").append(sessionHtml);
    };

    self.addSpeakerToList = function (speaker) {
        document.getElementById("speakerList").options.add(new Option(speaker.name, speaker.id));

        var speakerHtml = $.templates("#speakerTemplate").render(speaker);
        $("#speakers").append(speakerHtml);

       
    };

    self.dismissAlert = function () {
        self.dialogs.hideDialog();
    };
   
}

var model = new indexViewModel();
model.switchView("sessions");
model.loadContent("speakers");

