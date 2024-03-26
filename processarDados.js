
const axios = require('axios');

/**
 * Função assíncrona para processar dados a partir de uma lista de URLs.
 * 
 * Usamos `await` aqui pela sua capacidade de simplificar a sintaxe de operações assíncronas,
 * tornando o código mais intuitivo e fácil de seguir. Isso é particularmente útil quando lidamos
 * com múltiplas chamadas assíncronas simultâneas através de `Promise.all()`, permitindo um
 * tratamento de erro mais direto com blocos `try`/`catch`.
 * 
 * Importante:
 * - `await` pode melhorar a legibilidade e facilitar o tratamento de erros, mas seu uso inadequado,
 *   especialmente em loops, pode levar a performance reduzida por execução sequencial não
 *   intencional de promessas.
 * - A alternativa, usar `then`, permite flexibilidade e composição de promessas, mas pode resultar
 *   em "callback hell" se não for bem estruturado, complicando a legibilidade e manutenção.
 *
 * @param {Array<string>} urls - Lista de URLs para buscar os dados.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para uma lista de dados processados de cada URL.
 * @throws {Error} Lança um erro se a lista de URLs for vazia ou se ocorrer um erro na recuperação dos dados.
 */
async function processarDados(urls) {
  // Verifica se a lista de URLs foi fornecida e não está vazia.
  if (!urls || !urls.length) {
    // Lança um erro se a lista de URLs estiver vazia ou não fornecida.
    throw new Error('Bad Request: Lista de URLs vazia ou não fornecida.');
  }

  try {
    // Mapeia cada URL para uma chamada assíncrona de axios.get e armazena as promessas em um array.
    const promises = urls.map(url => axios.get(url));
    // Usa 'await' com 'Promise.all()' para realizar as chamadas assíncronas em paralelo.
    const responses = await Promise.all(promises);
    // Processa e retorna os dados de cada resposta. Aqui, você pode adicionar qualquer processamento específico necessário.
    return responses.map(response => response.data);
  } catch (error) {
    // Lança um novo erro se houver falhas nas chamadas assíncronas.
    throw new Error(`Erro ao processar dados: ${error.message}`);
  }
}

module.exports = { processarDados };
