class NegociacaoController {
    constructor() {
        this._ordemAtual = '';
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');
        // this._listaNegociacoes = new ListaNegociacoes(model => this._negociacoesView.update(model));
        // let self=this;
        // this._listaNegociacoes=new Proxy(new ListaNegociacoes(), {
        //     get(target, prop, receiver){
        //         if(['adiciona','esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)){
        //             return function(){
        //                 console.log(`método '${prop}' interceptado`);
        //                 Reflect.apply(target[prop], target, arguments);
        //                 self._negociacoesView.update(target);
        //             }
        //         }
        //         return Reflect.get(target, prop, receiver);
        //     }
        // });
        // this._listaNegociacoes=ProxyFactory.create(new ListaNegociacoes(), ['adiciona','esvazia'], model=>this._negociacoesView.update(model));        

        this._listaNegociacoes=new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');
        // this._negociacoesView.update(this._listaNegociacoes);

        // this._mensagem=ProxyFactory.create(new Mensagem(), ['texto'], model=>this._mensagemView.update(model));    
        // this._mensagem = new Mensagem();
        this._mensagem=new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        // this._mensagemView.update(this._mensagem);


    }

    adiciona(event) {
        event.preventDefault();
        // let data = new Date(this._inputData.value.split('-').join(',')); Forma não regular tratando data string
        // let data = new Date(this._inputData.value.replace(/-/g,',')); Expressão regular
        try{
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            // this._negociacoesView.update(this._listaNegociacoes);
    
            this._mensagem.texto = 'Negociação adicionada com sucesso';
            // this._mensagemView.update(this._mensagem);
    
            //this._listaNegociacoes.negociacoes.push(this._criaNegociacao()); serve tb porém está fora do adiciona, preciso de cópia da lista
            this._limpaFormulario();
        }catch(erro){
            this._mensagem.texto=erro;
        }

        console.log(this._listaNegociacoes.negociacoes.length);
        //this._listaNegociacoes.negociacoes.length=0; não zera devido ao concat, cópia da lista
        console.log(this._listaNegociacoes.negociacoes);
        //alert('Chamei ação no controller');
    }

    importaNegociacoes(){
        let service = new NegociacaoService();
        
        service
        .obterNegociacoes()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso';
        })
        .catch(error => this._mensagem.texto = error);
    }
        
    apaga() {
        this._listaNegociacoes.esvazia();
        // this._negociacoesView.update(this._listaNegociacoes);

        this._mensagem.texto = 'Negociações removidas com sucesso';
        // this._mensagemView.update(this._mensagem);
    }

    _criaNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value);
    }

    _limpaFormulario() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}