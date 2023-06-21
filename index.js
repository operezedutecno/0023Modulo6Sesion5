const express = require("express")
const app = express()
const port = 3000
const fs = require("fs")
const { fakerES_MX } = require('@faker-js/faker');

app.use(express.static(`${__dirname}/public`))

app.listen(port, () => console.log(`Servicio levantado por el puerto ${port}`))

app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/views/index.html`)
})

app.get("/galeria", (peticion, respuesta) =>{
    respuesta.sendFile(__dirname+"/views/galeria.html")
})

app.get("/agregar", (req, res) => {
    const datos = fs.readFileSync(`${__dirname}/data/personas.txt`,"utf8")
    //Convertir de texto a objeto
    const arreglo = JSON.parse(datos)
    const persona = {
        id: fakerES_MX.string.uuid(),
        nombre: fakerES_MX.person.fullName(),
        email: fakerES_MX.internet.email()
    }
    arreglo.push(persona);
    //Convertir de objeto a texto
    const texto = JSON.stringify(arreglo)
    fs.writeFileSync(`${__dirname}/data/personas.txt`, texto,"utf-8")
    res.send("Datos de persona agregados")
})

app.get("/obtener", (req, res) => {
    const datos = fs.readFileSync(`${__dirname}/data/personas.txt`,"utf8")
    const arreglo = JSON.parse(datos)
    res.json(arreglo)
})

app.get("*", (req, resp) => {
    resp.sendFile(`${__dirname}/views/error404.html`)
})