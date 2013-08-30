function common () {
    var self = this;

    self.showError = function (errorMessage, title) {
        $("#message").text(errorMessage);
        $("#messageContainer").show();
    };

    self.showWarning = function (warningText, title) {

    };

    self.showInformation = function (informationText, title) {

    };

    self.hideDialog = function () {
        $("#messageContainer").hide();
    };
}