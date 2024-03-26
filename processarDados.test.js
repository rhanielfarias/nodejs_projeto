
const { processarDados } = require('./processarDados');
const axios = require('axios');

// Mock do Axios para simular chamadas HTTP
jest.mock('axios');

describe('processarDados', () => {
  it('deve processar dados corretamente quando as URLs são válidas', async () => {
    axios.get.mockResolvedValueOnce({ data: { resultado: 'dados 1' } });
    axios.get.mockResolvedValueOnce({ data: { resultado: 'dados 2' } });

    const urls = ['http://url1.com', 'http://url2.com'];
    const resultado = await processarDados(urls);

    expect(resultado).toEqual([{ resultado: 'dados 1' }, { resultado: 'dados 2' }]);
    expect(axios.get).toHaveBeenCalledTimes(urls.length);
  });

  it('deve lançar um erro quando a lista de URLs é vazia', async () => {
    await expect(processarDados([])).rejects.toThrow('Bad Request: Lista de URLs vazia ou não fornecida.');
  });

  it('deve lançar um erro quando uma chamada falha', async () => {
    axios.get.mockRejectedValueOnce(new Error('Erro de rede'));

    const urls = ['http://urlfalha.com'];
    await expect(processarDados(urls)).rejects.toThrow('Erro ao processar dados: Erro de rede');
  });
});
