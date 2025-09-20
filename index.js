const express=require('express');
const app=express();
const port=3000;
app.use(express.json());

let unidades=[
    {id:1, nombre:"Unidad 1", descripcion:"Linde"},
    {id:2, nombre:"Unidad 2", descripcion:"Linde"} 

];
app.set("view engine", "pug");



app.listen(port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard"); // "dashboard" es el nombre del archivo .pug sin extensión
});

// Obtener todas las unidades
app.get('/unidades',(req,res)=>{
    res.json(unidades);
});

// Obtener una unidad por ID
app.get('/unidades/:id',(req,res)=>{
    const id=parseInt(req.params.id);   
    const unidad=unidades.find(u=>u.id===id);
    if(unidad){
        res.json(unidad);   

    }else{
        res.status(404).json({message:"Unidad no encontrada"});
    }   
});

// Crear una nueva unidad
app.post('/unidades',(req,res)=>{
    const nuevaUnidad=req.body;
    unidades.push(nuevaUnidad);
    res.status(201).json(nuevaUnidad);
});

// Actualizar una unidad existente
app.put('/unidades/:id',(req,res)=>{
    const id=parseInt(req.params.id);           
    const indice=unidades.findIndex(u=>u.id===id);
    if(indice!==-1){
        unidades[indice]=req.body;      
        res.json(unidades[indice]);
    }else{
        res.status(404).json({message:"Unidad no encontrada"});
    }   
});
// Eliminar una unidad
app.delete('/unidades/:id',(req,res)=>{
    const id=parseInt(req.params.id);   
    const indice=unidades.findIndex(u=>u.id===id);
    if(indice!==-1){
        const unidadEliminada=unidades.splice(indice,1);
        res.json(unidadEliminada[0]);
    }else{
        res.status(404).json({message:"Unidad no encontrada"});
    }   
});

// Ruta raíz
app.get('/',(req,res)=>{
    res.send('Bienvenido a la API de Unidades');
});     
