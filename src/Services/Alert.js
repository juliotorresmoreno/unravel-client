import ServiceBase from '../Lib/ServiceBase';

export default class Alert extends ServiceBase
{
    constructor(store)
    {
        super();
        this.error = (error) => {
            var texto = '';
            switch (typeof error) {
                case "string":
                    texto = error; 
                    break;
                case "object":
                    for (var i in error) {
                        if (error.hasOwnProperty(i) && i !== 'success') {
                            texto+= error[i] + "\n";                
                        }
                    }
                    break;
                default:
            }
            alert(texto);
        };
        store.alert = this;
    }
}