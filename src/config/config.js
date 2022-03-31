function Successmsg(data,message){
    var response = {
        data:data,
        message:message,
        status:"Success"
    }
    return response
}

function Failuremsg(message){
    var response ={
        message:message,
        status:"Failure"
    }
    return response
}

module.exports = {
    Successmsg:Successmsg,
    Failuremsg:Failuremsg

}

