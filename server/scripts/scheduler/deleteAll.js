function deleteAll() {
        var sql = "DELETE FROM favorites; DELETE FROM sessions; DELETE FROM speakers;";
    mssql.query(sql, {
        success: function(results) {            
            console.log('conference deleted');   
        }
    })
}