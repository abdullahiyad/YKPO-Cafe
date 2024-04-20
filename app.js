require('./nodejs/Database/mongoose');
const express = require('express');
const cookie = require('cookie-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const app = express();
const PORT = 3000;

//MiddleWare:
app.use(cookie());
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use('/css',express.static('css'));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/js', express.static(path.join(__dirname, '/js')));
//This is view type:
app.set('view engine', 'ejs');

app.use(authRoutes);

app.listen(PORT, () => {
     console.log(`Server is running on http://localhost:${PORT}`);
});  
