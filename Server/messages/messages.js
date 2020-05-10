const responce = {
    statusCode :0,
    success: false,
    messages: '',
    data: '',
    getResponce(statusCode,isSuccess,message,data=null){
        return {
            statusCode : statusCode,
            isSuccess : isSuccess,
            message : message,
            data : data
        }
    }
}
module.exports = responce;


