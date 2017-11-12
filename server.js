// // https://www.youtube.com/watch?v=NX3jqtwfzVY
// const { createServer } = require('http');
// const express = require('express');
// const compression = require('compression');
// const morgan = require('morgan');
// const path = require('path');
//
// const port = parseInt(process.env.PORT || 5000, 10);
//
// const app = express();
// const dev = app.get('env') !== 'production';
//
// if (!dev) {
//     app.disabled('x-powered-by');
//     app.use(compression());
//     app.use(morgan('common'));
//     app.use(express.static(path.resolve(__dirname, 'build')));
//
//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
//     });
// }
// if (dev)
//     app.use(morgan('dev'));
//
// const server = createServer(app);
// server.listen(port, (err) => {
//     if (err) throw err;
//     console.log(`${app.get('env')} http://localhost:${port}`);
// });
