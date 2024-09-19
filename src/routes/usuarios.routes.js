import { Router } from "express";
import { readFile } from 'fs/promises';
import path from 'path';

const router = Router();

router.get('/list', async (req, res) => {
    try {
        
        const dataPath = 'C:/NODEJS/eva01/src/ecommerce.json';
        const data = await readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);

        const usuarios = jsonData.usuarios;

        res.render('usuarios/list', { usuarios });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/edit', async (req, res) => {
    try {
        const { userId, nombre, apellido, email, telefono } = req.body;
        const dataPath = 'C:/NODEJS/eva01/src/ecommerce.json'; 
        const data = await readFile(dataPath, 'utf-8');
        const jsonData = JSON.parse(data);

        const userIndex = jsonData.usuarios.findIndex(user => user.Id === parseInt(userId));
        if (userIndex > -1) {
            jsonData.usuarios[userIndex] = { Id: parseInt(userId), nombre, apellido, email, telefono };
        }

        await writeFile(dataPath, JSON.stringify(jsonData, null, 2));
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
