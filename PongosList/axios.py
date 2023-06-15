from rest_framework import serializers
from rest_framework.response import Response



class Axios_response():
    class Response_Type():
        Success = 'success'
        Failed = 'failed'
        Error = 'error'

    Status = Response_Type()
    statu = None
    message = None
    data = {}

    def __init__(self, status: Response_Type = None, message=None, data=None, dataname=None, response: Response = None):
        self.response = Response
        self.data = {}
        self.status = status
        self.message = message
        if data is not None:
            if dataname is None:
                self.data['data'] = data
            else:
                self.data[dataname] = data

    @staticmethod
    def AppendData(data, dataname):
        Axios_response.data[dataname] = data

    @staticmethod
    def serializersData(serializers: serializers, dataname=None):
        datatype = serializers.instance.__module__.replace(".models", "")
        if dataname != None:
            datatype = dataname
        data = serializers.data
        Axios_response.AppendData(dataname=datatype, data=data)

    @staticmethod
    def Success(data=None, dataname=None, message=None, serializersdata: serializers = None):
        Axios_response.status = Axios_response.Status.Success

        Axios_response.message = message
        if data is not None:
            Axios_response.data[dataname] = data
        elif serializersdata is not None:
            Axios_response.serializersData(serializers=serializersdata)

        return Axios_response.response()

    @staticmethod
    def Failed(message=None):
        Axios_response.status = Axios_response.Status.Failed
        Axios_response.message = message

        return Axios_response.response()

    @staticmethod
    def ResponseSuccess(data=None, dataname=None, message=None, serializersdata: serializers = None):
        return Response(Axios_response.Success(data=data, dataname=dataname, message=message, serializersdata=serializersdata))

    @staticmethod
    def ResponseFailed(message=None):
        return Response(Axios_response.Failed(message=message))

    @staticmethod
    def response():
        responsedata = {'status': Axios_response.status,
                        'message': Axios_response.message,
                        'data': Axios_response.data}

        Axios_response.status = None
        Axios_response.message = None
        Axios_response.data = {}

        return responsedata
