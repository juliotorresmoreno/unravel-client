const langs = {
    es: require('./es').default
};

export default class Lang {
    lang = 'es';
    constructor(store) {
        store.lang = this;
    }
    get = (key) => {
        if(langs[this.lang] !== undefined && langs[this.lang][key] !== undefined)
        {
            return langs[this.lang][key];
        }
        return langs.es[key];
    }
}