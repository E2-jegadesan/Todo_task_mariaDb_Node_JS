function successMsg(data,message){
    var response = {
        data:data,
        message:message,
        status:"Success"
    }
    return response
}

function failureMsg(message){
    var response ={
        message:message,
        status:"Failure"
    }
    return response
}

module.exports = {
    successMsg:successMsg,
    failureMsg:failureMsg

}

