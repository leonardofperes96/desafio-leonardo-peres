// Definição da classe Produto, responsável por representar os itens do cardápio.
// criando uma classe e deixando um constructor com o codigo, descricao e valor irá permitir melhor manutenção no código
// permitindo uma reusabilidade em diferentes partes do codigo, mantendo consistência das propriedades e métodos associados ao produto.
class Produto {
  // O construtor inicializa as propriedades de cada item do cardápio.
  constructor(codigo, descricao, valor) {
    this.codigo = codigo;
    this.descricao = descricao;
    this.valor = valor;
  }

  //metodo para retornar o valor de cada item do cardápio
  getValor() {
    return this.valor;
  }
}

// Objeto cardápioDoDia contém os produtos disponíveis para compra, com seu respectivo código, descrição e valor.
const cardapioDoDia = {
  cafe: new Produto("cafe", "Café", 3.0),
  chantily: new Produto("chantily", "Chantily (extra do Café)", 1.5),
  suco: new Produto("suco", "Suco Natural", 6.2),
  sanduiche: new Produto("sanduiche", "Sanduiche", 6.5),
  queijo: new Produto("queijo", "Queijo (extra do Sanduíche)", 2.0),
  salgado: new Produto("salgado", "Salgado", 7.25),
  combo1: new Produto("combo1", "1 Suco e 1 Sanduíche", 9.5),
  combo2: new Produto("combo2", "1 Café e 1 Sanduíche", 7.5),
};

// Exporta o objeto cardapioDoDia para uso em outros módulos.
export { cardapioDoDia };
