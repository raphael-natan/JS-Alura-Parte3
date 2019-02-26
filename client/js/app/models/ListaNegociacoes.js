class ListaNegociacoes {
    constructor(/*armadilha*/) {
        this._negociacoes = [];
        // this._armadilha=armadilha;
    }

    adiciona(negociacao) {
        // this._negociacoes=[].concat(this._negociacoes, negociacao);
        this._negociacoes.push(negociacao);
        // this._armadilha(this);
        // Reflect.apply(this._armadilha, this._contexto, [this]); aqui seria com a function que é dinamica e muda contexto
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }

    esvazia() {
        this._negociacoes = [];
        // this._armadilha(this);
        // Reflect.apply(this._armadilha, this._contexto, [this]); aqui seria com a function que é dinamica e muda contexto
    }

    get volumeTotal(){
        return this._negociacoes.reduce((total, n) => total + n.volume, 0.0);
    }
}