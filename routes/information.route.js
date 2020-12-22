module.exports = app =>{
    const InfoCon = require("../controller/information.controller.js");
    
    app.get('/api/information', InfoCon.findAll);

    app.post('/api/information', InfoCon.create);

    app.get('/api/information/:id', InfoCon.findById);

    app.put('/api/information/:id', InfoCon.updateById);

    app.delete('/api/information/:id', InfoCon.deleteById);

    app.delete('/api/information', InfoCon.deleteAll);
}