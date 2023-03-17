from rest_framework import serializers
class Response_Type():
    Success = 'success'
    Failed = 'failed'


class Axios_response():
    Status = Response_Type()

    def __init__(self, status=None, message=None, data=None, dataname=None):
        self.data = {}
        self.status = status
        self.message = message
        if data != None:
            self.data[dataname] = data

    def Success(self, data=None, dataname=None, message=None, serializersdata:serializers=None):
        self.status = self.Status.Success

        self.message = message
        if data != None:
            self.data[dataname] = data
        elif serializersdata != None:
            self.serializersData(serializers=serializersdata)

        return {'status': self.status,
                'message': self.message,
                'data': self.data}

    def Failed(self, message=None):
        self.status = self.Status.Failed
        self.message = message
        return {'status': self.status,
                'message': self.message,
                'data': self.data}

    def AppendData(self, data, dataname):
        self.data[dataname] = data

    def serializersData(self, serializers:serializers, dataname=None):
        datatype = serializers.instance.__module__.replace(".models", "")
        if dataname != None:
            datatype = dataname
        data = serializers.data
        self.AppendData(dataname=datatype, data=data)

    def response(self):
        return {'status': self.status,
                'message': self.message,
                'data': self.data}
