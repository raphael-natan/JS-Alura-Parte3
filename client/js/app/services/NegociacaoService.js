class NegociacaoService{
    obterNegociacaoDaSemana(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/xsemana');//configura
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    JSON.parse(xhr.responseText).map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                    this._mensagem.texto='Negociações importadas com sucesso';
                    // console.log('Obtendo as negociações do servidor.');
                    // console.log(xhr.responseText);
                } else{
                    console.log(xhr.responseText);
                    console.log('Não foi possível obter as negociações do servidor.');
                }    
            }
        };
        xhr.send();//executa
    }
}