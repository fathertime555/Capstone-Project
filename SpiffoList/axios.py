class Response_Type():
    Success = 'success'
    Failed = 'failed'


class Axios_response():
    Status = Response_Type()

    def __init__(self, status=None, massage=None, data=None, dataname=None):
        self.data = {}
        self.status = status
        self.massage = massage
        if data != None:
            self.data[dataname] = data

    def Success(self, data=None, dataname=None, message=None):
        self.status = self.Status.Success

        self.massage = message
        if data != None:
            self.data[dataname] = data

    def Failed(self, massage=None):
        self.status = self.Status.Failed
        self.massage = massage

    def AppendData(self, data, dataname):
        self.data[dataname] = data

    def serializersData(self, serializers):
        datatype = serializers.instance.__module__.replace(".models", "")
        data = serializers.data
        self.AppendData(dataname=datatype, data=data)
        print(self.data)

    def response(self):
        res = {'status': self.status,
               'massage': self.massage,
               'data': self.data}
        print(res)
