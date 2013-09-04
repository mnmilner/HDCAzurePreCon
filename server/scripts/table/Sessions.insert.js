function insert(item, user, request) {

    request.execute({
        success: function(){
            tables.getTable("speakers").where({id:item.speakerId}).read({
                success:function(speakers){
                    
                    if(speakers.length===1){
                       item.speakerName = speakers[0].name;
                    }    
                   request.respond(201, item);
                },
                error:function(error){
                    console.log(error);
                    request.respond(201, item);
                }
            });
        },
        error: function(errorMsg){
            console.log(errorMsg);
            request.respond(500, errorMsg);
        }
        
    });

}