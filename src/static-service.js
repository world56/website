const path = require("path");
const express = require("express");

const port = 2000;

const app = express();

const STATIC_PATH = path.join(__dirname, "../resource");

app.use(express.static(STATIC_PATH));

app.listen(port, () => console.log(`static resource service. PORT:${port}`));
