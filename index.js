const express = require("express");
const app = express();
const path = require( "path");


app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, "public", "index.html" ));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log('Server running on port http://localhost:3001');
})