function read(query, user, request) {

    if(user.level === 'authenticated') {
   mssql.query("SELECT se.id, se.title, se.description, sp.name as 'speakerName', favs.sessionId as 'isFavorite' FROM sessions se INNER JOIN speakers sp ON se.speakerId = sp.id LEFT JOIN favorites favs ON se.id = favs.sessionId AND favs.userId = ?", user.userId, 
    {
        success: function(results){
            request.respond(200, results);
        },
        error: function(error) {
            console.log(error);
            request.respond(500, error);
        }
    });
    }
    else {
        mssql.query("SELECT se.id, se.title, se.description, sp.name as 'speakerName' FROM sessions se INNER JOIN speakers sp ON se.speakerId = sp.id", 
    {
        success: function(results){
            request.respond(200, results);
        },
        error: function(error) {
            console.log(error);
            request.respond(500, error);
        }
    });
    }
}