function indexViewModel(){
    var self = this;

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
        }

        self.loadContent();
    }

    self.loadContent = function() {
        //TODO: load content for speakers and/or sessions if not populated

    }
}

var model = new indexViewModel();
model.switchView("sessions");

