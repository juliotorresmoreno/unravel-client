import ServiceBase from '../Lib/ServiceBase';

const consulta = '/friends';

export default class Friends extends ServiceBase
{
    constructor(store)
    {
        super();
        this.find = (data) => 
        {
            return new Promise((resolve, reject) => {
                const url = store.getState().config.api + consulta;
                this.get(url + "?token=" + store.getState().session.token + "&q=" + encodeURI(data.query))
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({friends: json.data});
                                response.ok ?
                                    this.secure(resolve)({response: response,data: json}):
                                    this.secure(reject)(json);
                            })
                            .catch((error) => {
                                response.ok ?
                                    this.secure(resolve)({response: response}):
                                    this.secure(reject)({error: error});
                            });
                    })
                    .catch((error) => this.secure(error)(error));
            });
        };
        store.friends = this;
    }
}