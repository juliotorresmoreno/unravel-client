import ServiceBase from '../Lib/ServiceBase';

const save = "/groups";

export default class Groups extends ServiceBase
{
    constructor(store)
    {
        super();
        this.save = (data) => {
            const url = store.getState().config.api + save;
            return new Promise((resolve, reject) => {
                this.post(url, data)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json.error)
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error))
            });
        };
        store.groups = this;
    }
}