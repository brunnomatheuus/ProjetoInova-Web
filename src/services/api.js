export default function getBaseUrl(nodeEnv) {
    switch (nodeEnv) {
      case 'local':
        return 'http://localhost:3001/api'
      case 'development':
        return console.error('Url de development ainda não foi definida.', nodeEnv)
      case 'production':
        let urlApi = 'http://api.multiprova3.ufrn.br/api'
        console.info('ambiente: ' + nodeEnv + ' url: ' + urlApi)
        return urlApi
      case 'test':
        //return 'http://multiprova3.ufrn.br/api/api/'
        return 'http://localhost:3010/api/'
      default:
        return console.error('Variável de ambiente NODE_ENV desconhecida.', nodeEnv)
    }
  }