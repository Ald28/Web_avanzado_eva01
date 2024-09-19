import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.routes.js';

// Inicialización
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración
app.set('port', process.env.PORT || 3000);

// Configurando carpeta para las vistas
app.set('views', join(__dirname, 'views'));

// Configurar motor de plantilla
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.render('index');
});

app.use(usuariosRoutes); // Monta las rutas de usuarios aquí
app.use('/productos',productosRoutes); // Monta las rutas de productos aquí

// Archivos Públicos
app.use(express.static(join(__dirname, 'public')));

// Ejecutar el servidor
app.listen(app.get('port'), () => 
    console.log('Servidor corriendo en el puerto', app.get('port'))
);
