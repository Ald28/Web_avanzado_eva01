import { Router } from "express";
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const router = Router();


router.get('/list', async (req, res) => {
    try {
        const dataPath = 'C:/NODEJS/eva01/src/ecommerce.json';
        const data = await readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);

        const productos = jsonData.productos; 

        res.render('productos/productoslist', { productos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { productoId, nombre, descripcion, precio, stock } = req.body;
        const dataPath = 'C:/NODEJS/eva01/src/ecommerce.json';
        const data = await readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);

        const productoIndex = jsonData.productos.findIndex(producto => producto.Id === parseInt(productoId));
        if (productoIndex > -1) {
            jsonData.productos[productoIndex] = { Id: parseInt(productoId), nombre, descripcion, precio, stock };
        }

        await writeFile(dataPath, JSON.stringify(jsonData, null, 2));
        res.redirect('/productos/productoslist');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
