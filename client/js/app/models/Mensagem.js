class Mensagem {
    constructor(texto) {
        this._texto=texto || '';// solução pro edge 13 pq não aplica polyfill, se texto for undefined, vai passar '' 
    }

    get texto() {
        return this._texto;
    }

    set texto(texto) {
        this._texto = texto;
    }
}