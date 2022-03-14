var http = require("http");
var url = require("url");

var moduloBd = require("./my_modules/bd.js");

http
  .createServer(function (peticion, respuesta) {
    var url_peticion = url.parse(peticion.url, true);
    var pathname = url_peticion.pathname;
    console.log(pathname);

    if (pathname == "/") {
      respuesta.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
      respuesta.write("<p>Servidor Node para DWST4</p>");
      respuesta.end();
    } else if (pathname == "/importar") {
      return moduloBd.importar(respuesta, "./data/harry-potter-characters.json");
    } else if (pathname == "/consultas") {
      let parametros = url_peticion.query;
      if (parametros.code !== undefined) {
        moduloBd.consultas(respuesta, parametros.code, function (salida) {
          respuesta.writeHead(200, { 'Content-Type': 'application/json' });
          respuesta.write(JSON.stringify(salida));
          respuesta.end();
        });
      } else {
        respuesta.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        respuesta.write("<p>Para hacer una consulta debe indicar el código de la misma</p>");
        respuesta.end();
      }
    } else if (pathname == "/insertar") {
      let parametros = url_peticion.query;
      if (parametros.name !== undefined) {
        return moduloBd.insertar(respuesta, parametros);
      } else {
        respuesta.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        respuesta.write("<p>Para hacer una actualización debe indicar el código de la misma</p>");
        respuesta.end();
      }
    } else if (pathname == "/borrar") {
      let parametros = url_peticion.query;
      if (parametros.code !== undefined) {
        return moduloBd.borrar(respuesta, parametros.code);
      } else {
        respuesta.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        respuesta.write("<p>Para hacer un borrado debe indicar el código de la misma</p>");
        respuesta.end();
      }
    } else {
      respuesta.writeHead(404, { "Content-Type": "text/html;charset=utf-8" });
      respuesta.write("<p>Lo sentimos, la ruta indicada no existe.</p>");
      respuesta.end();
    }
  })
  .listen(8080, "localhost"),
  (err) => {
    if (err) {
      return console.log("Error: ", err);
    }
    console.log("Servidor ejecutandose en localhost:8080/");
  };
