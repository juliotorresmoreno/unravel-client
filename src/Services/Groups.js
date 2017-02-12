import ServiceBase from '../Lib/ServiceBase';

const save = "/groups";
const describe = "/groups";
const change_peview = "/groups/changePreview";

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
        this.consultar = () => {
            const url = store.getState().config.api + save;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({groups: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json.error);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error))
            });
        };
        this.changePreview = (data) => {
            const url = store.getState().config.api + change_peview;
            return new Promise((resolve, reject) => {
                this.upload(url, data)
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
        this.describe = (group) => {
            const url = store.getState().config.api + describe + '/' + group;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({group: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json.error);
                            })
                            .catch((error) => this.secure(reject)(error))
                    })
                    .catch((error) => this.secure(reject)(error))
            });
        };
        store.groups = this;
    }
}