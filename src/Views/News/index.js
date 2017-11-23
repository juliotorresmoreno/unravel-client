import React from 'react';

import Publicacion from './publicacion';
import NewsCtrl from './index.ctrl';
import Publicar from './publicar';

export default class News extends NewsCtrl {
    componentWillMount() {
        const {store, params} = this.props;
        store.subscribe(this, ['news'], "News");
        store.getState().news = {};
        if (typeof params.user !== "undefined") {
            store.news.consultar({usuario: params.user});
            return;
        }
        store.news.consultar();
    }
    getNews = function() {
        const {store} = this.props;
        if (!store.getState().news)
            return [];
        return store.getState().news.data || [];
    }
    render = function() {
        const isme = this.props.params.user === undefined;
        const {store, router} = this.props;
        const news = this.getNews();
        return (
            <div>
                {isme?<Publicar store={store} />:null}
                {news.map((noticia, index) => 
                    <Publicacion key={index} store={store} router={router} noticia={noticia} />)}
                <a onClick={this.onHandlerMore} href="">Mas</a>
                <br />
                <br />
            </div>
        )
    }
}