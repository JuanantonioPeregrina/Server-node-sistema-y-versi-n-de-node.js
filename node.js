// Importar módulos necesarios
const http = require('http');
const os = require('os');
const fs = require('fs');

// Leer configuración del fichero config.json
let config = JSON.parse(fs.readFileSync('config.json'));

// Crear un servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor en ejecución...');
});

// Información del sistema
console.log('Información del sistema:');
console.log(`Sistema Operativo: ${os.type()} ${os.platform()} ${os.release()}`);
console.log(`Versión de Node.js: ${process.version}`);

// Mostrar información del sistema periódicamente
function mostrarInformacion() {
  const usoCPU = os.loadavg();
  const usoMemoria = process.memoryUsage();
  const tiempoActivoSistema = os.uptime();
  const tiempoActivoNode = process.uptime();

  console.log('------------------------------------');
  console.log('Información periódica del sistema:');
  console.log(`Uso de CPU: 1min: ${usoCPU[0].toFixed(2)}, 5min: ${usoCPU[1].toFixed(2)}, 15min: ${usoCPU[2].toFixed(2)}`);
  console.log(`Uso de Memoria: RSS: ${(usoMemoria.rss / 1024 / 1024).toFixed(2)} MB, Heap Used: ${(usoMemoria.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Tiempo activo del sistema: ${tiempoActivoSistema} segundos`);
  console.log(`Tiempo activo de Node.js: ${tiempoActivoNode.toFixed(2)} segundos`);
}

// Ejecutar la función periódicamente basado en la configuración
setInterval(mostrarInformacion, config.intervalo * 1000);

// Escuchar en el puerto configurado
server.listen(config.puerto, () => {
  console.log(`Servidor escuchando en el puerto ${config.puerto}...`);
});

