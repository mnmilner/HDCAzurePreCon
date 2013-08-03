///client code for interacting with the Azure mobile service back end

function azClient (){
    var self = this;

    self.client = new WindowsAzure.MobileServiceClient("https://hdcazureconference.azure-mobile.net");

    self.getSessions = function(){
        
    }

    self.getSpeakers = function() {
        
    }

    self.addSpeaker = function(speakerName) {
        
    }

    self.addSession = function (title, speakerId) {
        
    }

}