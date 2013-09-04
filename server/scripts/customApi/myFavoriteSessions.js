exports.get = function(request, response) {
    var mssql = request.service.mssql;
    var sql = "SELECT sessions.id, sessions.title, sessions.description, speakers.name " + 
        "FROM sessions " + 
        "INNER JOIN speakers on sessions.speakerId = speakers.id " + 
        "INNER JOIN favorites on sessions.id = favorites.sessionId "
    mssql.query(sql, {
        success: function(results) {   
            console.log(results);       
            response.send(200, results);                              
        }
    })
};