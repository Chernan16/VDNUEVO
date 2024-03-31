import express from "express";
import morgan from "morgan";

import { db } from "./db/index.js";
import * as schema from "./db/schema.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ messge: "Hello World!" });
});

app.get("/products", async (req, res) => {
    const products = await db.query.products.findMany();
    res.json(products);
})


app.post("/products", async (req, res) => {
    let { name, price } = req.body;
    if (!name || !price) {
        return res.status(409).json({ message: "Nombre y Precio son requeridos!!" })
    }
    try {
        name = name.trim().toUpperCase();
        await db.insert(schema.products).values({ name, price }).execute();

        console.log("Producto creado!!");
        res.status(201).json({ message: "Producto creado correctamente" });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ message: "El producto ya existe!!" });
        } else {
            console.error("Error al insertar el producto:", error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
})

app.put("/products/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const { status } = req.body; 
        await db.update(schema.products)
            .set({ status })
            .where({ id: productId })
            .execute();
        res.status(200).json({ message: `Estado del producto con ID ${productId} actualizado satisfactoriamente` });
    } catch (error) {
        console.error("Error actualizando el estado del producto:", error);
        res.status(500).json({ message: "Error interno en el servidor" });
    }
});





app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puerto: ', { PORT });
});
