// CloudFront Function (runtime cloudfront-js-2.0), evento "viewer request".
// 1. Manda www.ipirangaredutores.com.br para o domínio sem www
//    (o endereço *.cloudfront.net continua acessível para testes).
// 2. Redireciona (301) os endereços do site antigo em WordPress e as antigas páginas internas para as seções da página inicial
//    (/?secao=x: o site abre no topo e rola suave até a seção),
//    preservando o posicionamento no Google.
// 3. Converte /pagina/ em /pagina/index.html, que é como os arquivos estão no S3.

var DOMINIO = 'ipirangaredutores.com.br';

var REDIRECTS = {
  // Endereços do site antigo em WordPress
  '/2014/09/24/o-que-e-um-redutor-de-velocidade/': '/?secao=produtos',
  '/2014/10/29/redutor-de-velocidade-esferico/': '/?secao=produtos',
  '/2014/10/29/redutor-epicicloidal/': '/?secao=produtos',
  '/2014/11/05/linha-de-redutores-alumag/': '/?secao=produtos',
  '/2014/11/05/motorredutor-conimax/': '/?secao=produtos',
  '/2014/11/05/motorredutor-magmax/': '/?secao=produtos',
  '/2014/11/05/redutor-coaxial/': '/?secao=produtos',
  '/2014/11/05/redutor-vertimax/': '/?secao=produtos',
  '/2014/11/05/redutores-helimax-bipartido/': '/?secao=produtos',
  '/2014/11/06/redutores-helimax-1-estagio/': '/?secao=produtos',
  '/2014/11/06/redutores-helimax-monobloco/': '/?secao=produtos',
  '/2014/11/07/redutor-de-velocidade-magma-k/': '/?secao=produtos',
  '/2014/11/07/redutor-de-velocidade-magma-m/': '/?secao=produtos',
  '/fale-com-a-ipiranga-redutores/': '/?secao=contato',
  '/redutor-de-velocidade/': '/?secao=empresa',
  '/redutor-de-velocidade-bh/': '/?secao=servicos',
  '/redutores-de-velocidade/': '/?secao=produtos',
  '/redutores-de-velocidade-bh/': '/?secao=empresa',
  // Páginas internas que saíram em 30/10/2026: o site virou uma página só, com seções
  '/empresa/': '/?secao=empresa',
  '/aplicacoes/': '/?secao=empresa',
  '/manutencao/': '/?secao=servicos',
  '/usados/': '/?secao=produtos',
  '/pecas-e-acoplamentos/': '/?secao=produtos',
  '/o-que-e-um-redutor-de-velocidade/': '/?secao=produtos',
  '/produtos/': '/?secao=produtos',
  '/contato/': '/?secao=contato',
};

// Prefixos: páginas de cada produto e páginas automáticas do WordPress (categorias, tags, paginação, feed)
var PREFIXOS = [
  ['/produtos/', '/?secao=produtos'],
  ['/category/', '/?secao=produtos'],
  ['/tag/', '/?secao=produtos'],
  ['/page/', '/?secao=produtos'],
  ['/author/', '/'],
  ['/feed/', '/'],
  ['/comments/', '/'],
  ['/wp-', '/'],
];

function redirecionar(destino) {
  return {
    statusCode: 301,
    statusDescription: 'Moved Permanently',
    headers: { location: { value: destino }, 'cache-control': { value: 'max-age=86400' } },
  };
}

function handler(event) {
  var req = event.request;
  var host = req.headers.host ? req.headers.host.value : DOMINIO;
  var uri = req.uri;

  if (host === 'www.' + DOMINIO) {
    var qs = req.querystring && Object.keys(req.querystring).length ? '?' + Object.keys(req.querystring).map(function (k) {
      return k + '=' + req.querystring[k].value;
    }).join('&') : '';
    return redirecionar('https://' + DOMINIO + uri + qs);
  }

  var chave = uri.endsWith('/') || uri.indexOf('.') !== -1 ? uri : uri + '/';
  if (REDIRECTS[chave]) return redirecionar(REDIRECTS[chave]);
  for (var i = 0; i < PREFIXOS.length; i++) {
    if (uri.indexOf(PREFIXOS[i][0]) === 0) return redirecionar(PREFIXOS[i][1]);
  }
  // Endereços antigos com ?p=123 (links curtos do WordPress)
  if (uri === '/' && req.querystring && req.querystring.p) return redirecionar('/');

  if (uri.endsWith('/')) {
    req.uri = uri + 'index.html';
  } else if (uri.lastIndexOf('.') < uri.lastIndexOf('/') || uri.indexOf('.') === -1) {
    return redirecionar(uri + '/');
  }
  return req;
}
