// Importação do cardápio atualizado do arquivo "produtos".
import { cardapioDoDia } from "./produtos";

// Classe CaixaDaLanchonete, responsável por calcular o valor da compra e lidar com os itens do carrinho.
class CaixaDaLanchonete {
  // método para calcular o valor dos items(sem desconto/acrescimo)
  // essa método também irá lidar com o erro de quantidade, erro dos itens extras  e erro se o produto solicitado não existir.
  valorSemAcrescimoOuDesconto(itens) {
    // inicialização das variaveis que irão mudar de acordo com a lógica
    let valorFinal = 0;
    let errorMessage = null;

    // Flags criadas para lidar com a lógica dos itens extras
    // inicialmente todas as flags são marcadas como falsas
    let flagChantily = false;
    let flagQueijo = false;
    let flagCafe = false;
    let flagSanduiche = false;

    // loop para percorrer todos os itens, e separar cada item do seu codigo e quantidade e trabalhar com essas informações
    // esse loop também irá verificar se existem os produtos que precisam de item extra e seus respectivos produtos principais, e caso haja, irá
    // modificar a flag como true.
    for (let item of itens) {
      // separando produto e quantidade de cada item utilizando o metodo split separando pela virgula.
      let [produto, quantidade] = item.split(",");

      // verificação de itens extras e principais e atualização do valor das flags para verdadeiro caso existam
      if (produto === "chantily") {
        flagChantily = true;
      }

      if (produto === "queijo") {
        flagQueijo = true;
      }

      if (produto === "cafe") {
        flagCafe = true;
      }

      if (produto === "sanduiche") {
        flagSanduiche = true;
      }

      // Erro caso informe uma quantidade inválida.
      if (quantidade < 1) {
        errorMessage = "Quantidade inválida!";
        break;
      }

      // Erro caso não haja o produto informado.
      if (!cardapioDoDia[produto]) {
        errorMessage = "Item inválido!";
        break;
      }

      // calculo do valor final sem descontos/acrescimos
      valorFinal += cardapioDoDia[produto].getValor() * quantidade;
    }

    // Condições para lidar com itens extras, são apenas duas, quando a flag for verdadeira para queijo/chantily e for falsa para o café/sanduiche, lança as mensagens de erro conforme solicitado.
    if (flagChantily && !flagCafe) {
      errorMessage = "Item extra não pode ser pedido sem o principal";
    }

    if (flagQueijo && !flagSanduiche) {
      errorMessage = "Item extra não pode ser pedido sem o principal";
    }

    // retorna um objeto com o valorFinal sem desconto/acrescimo e as mensagens de erro, para poder manipular essas variaveis em outros metodos.
    return { valorFinal, errorMessage };
  }

  // Método para retornar o valor final já formatado da compra com base na escolha de pagamento e os ítens escolhidos pelo cliente
  // e lidar com os erros do input do usuário
  calcularValorDaCompra(metodoDePagamento, itens) {
    // verificação se o input é diferente de um vetor ou se o vetor está vazio e assim, lançar a mensagem de erro.
    if (!Array.isArray(itens) || itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    //desestruturação com os objetos retornados pela função valorSemAcrescimoOuDesconto.
    const { valorFinal, errorMessage } =
      this.valorSemAcrescimoOuDesconto(itens);

    // se existir uma mensagem de erro, retornar ela, se não, utilizar a função de aplicar acrescimo ou desconto de acordo com o método de pagamento
    // e retornar a função que formata o valor com o valor atualizado de desconto/acrescimo.
    if (errorMessage) {
      return errorMessage;
    } else {
      const valorComDescontoOuAcrescimo = this.aplicarAcrescimoOuDesconto(
        valorFinal,
        metodoDePagamento
      );
      return this.formatarValor(valorComDescontoOuAcrescimo, metodoDePagamento);
    }
  }

  // função para aplicar acréscimo ou desconto de acordo com o valor calculado pelo método valorSemAcrescimoOuDesconto
  aplicarAcrescimoOuDesconto(valor, metodoDePagamento) {
    // Pagamento em dinheiro tem 5% de desconto
    // Pagamento a crédito tem acréscimo de 3% no valor total
    // Pagamento no debito não sofre alteração no valor
    // objeto com os valores de acrescimo/desconto.
    const tiposDeMetodoDePagamento = {
      debito: 1,
      credito: 1.03,
      dinheiro: 0.95,
    };

    // retorna o valor final do produto.
    return valor * tiposDeMetodoDePagamento[metodoDePagamento];
  }

  // função para formatar o valor final e também verificar se o método de pagamento está correto.
  formatarValor(valor, metodoDePagamento) {
    if (
      metodoDePagamento === "dinheiro" ||
      metodoDePagamento === "credito" ||
      metodoDePagamento === "debito"
    ) {
      return `R$ ${valor.toFixed(2)}`.replace(".", ",");
    } else {
      return "Forma de pagamento inválida!";
    }
  }
}

// Exporta a classe CaixaDaLanchonete para ser utilizada em outros módulos.
export { CaixaDaLanchonete };
