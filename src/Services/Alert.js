import ServiceBase from '../Lib/ServiceBase';

export default class Alert extends ServiceBase
{
    constructor(store)
    {
        super();
        this.error = (error) => {
            var r = '';
            for (var i in error)
            {
                if (error.hasOwnProperty(i) && i !== 'success')
                {
                    r+= error[i] + "\n";
                }
            }
            alert(r);
        };
        store.alert = this;
    }
}