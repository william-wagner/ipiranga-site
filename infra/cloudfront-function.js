// CloudFront Function (runtime cloudfront-js-2.0), evento "viewer request".
// 1. Manda www.ipirangaredutores.com.br para o domínio sem www.
// 2. Redireciona (301) os endereços do site antigo em WordPress para as páginas novas,
//    preservando o posicionamento no Google.
// 3. Converte /pagina/ em /pagina/index.html, que é como os arquivos estão no S3.

var DOMINIO = 'ipirangaredutores.com.br';

var REDIRECTS = {
  '/2014/09/24/o-que-e-um-redutor-de-velocidade/': '/o-que-e-um-redutor-de-velocidade/',
  '/2014/10/29/redutor-de-velocidade-esferico/': '/o-que-e-um-redutor-de-velocidade/',
  '/2014/10/29/redutor-epicicloidal/': '/o-que-e-um-redutor-de-velocidade/',
  '/2014/11/05/linha-de-redutores-alumag/': '/produtos/alumag/',
  '/2014/11/05/motorredutor-conimax/': '/produtos/conimax/',
  '/2014/11/05/motorredutor-magmax/': '/produtos/magmax/',
  '/2014/11/05/redutor-coaxial/': '/produtos/coaxial/',
  '/2014/11/05/redutor-vertimax/': '/produtos/vertimax/',
  '/2014/11/05/redutores-helimax-bipartido/': '/produtos/helimax-bipartido/',
  '/2014/11/06/redutores-helimax-1-estagio/': '/produtos/helimax-1-estagio/',
  '/2014/11/06/redutores-helimax-monobloco/': '/produtos/helimax-monobloco/',
  '/2014/11/07/redutor-de-velocidade-magma-k/': '/produtos/magma-k/',
  '/2014/11/07/redutor-de-velocidade-magma-m/': '/produtos/magma-m/',
  '/fale-com-a-ipiranga-redutores/': '/contato/',
  '/redutor-de-velocidade/': '/empresa/',
  '/redutor-de-velocidade-bh/': '/manutencao/',
  '/redutores-de-velocidade/': '/produtos/',
  '/redutores-de-velocidade-bh/': '/aplicacoes/',
};

// Prefixos de páginas automáticas do WordPress (categorias, tags, paginação, feed)
var PREFIXOS = [
  ['/category/', '/produtos/'],
  ['/tag/', '/produtos/'],
  ['/page/', '/produtos/'],
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

  if (host !== DOMINIO) {
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
