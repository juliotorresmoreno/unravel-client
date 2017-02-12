import ServiceBase from '../Lib/ServiceBase';

const consultar = '/category';

export default class Category extends ServiceBase
{
    constructor(store)
    {
        super();
        this.consultar = () => {
            var url = store.getState().config.api + consultar;
            return new Promise((resolve, reject) => {
                this.get(url)
                    .then((response) => {
                        response.json()
                            .then((json) => {
                                store.setState({categorys: json.data});
                                response.ok ?
                                    this.secure(resolve)(json):
                                    this.secure(reject)(json);
                            })
                            .catch((e) => this.secure(reject)(e));
                    })
                    .catch((e) => this.secure(reject)(e));
            });
        }
        store.category = this;
    }
}