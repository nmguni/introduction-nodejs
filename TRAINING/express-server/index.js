const express = require("express");
const {
  loadJSONFile,
  loadJSONFileAndMergeWith
} = require("./lib/file-repository");
const foo = require("./routes/foo");

const app = express();

app.use((req, res, next) => {
  console.log("Check Auth!");
  next();
});

app.use("/foo", foo);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/hello-world", (req, res) => {
  res.send({
    message: "hello world",
    responseAt: new Date()
  });
});

app.get("/filedata", (req, res, next) => {
  loadJSONFile("./filedata.json")
    .then(data => loadJSONFileAndMergeWith("./filedata2.json", data))
    .then(data => loadJSONFileAndMergeWith("./filedata3.json", data))
    .then(data => {
      res.setHeader("Content-Type", "application/json");

      res.send(data);
      console.log(`Content size: ${res.get("content-length")}`);
    })
    .catch(error => {
      console.error(`Fehler beim lesen der Datei. ${error.message}`);
      // Call express errror handler
      // next(error);
      res
        .status(500)
        .send({ message: `Fehler beim lesen der Datei. ${error.message}` });
    });
});

app.get("/filedata-parallel", (req, res) => {
  const fileNames = [
    "./filedata.json",
    "./filedata4.csv",
    "./filedata2.json",
    "./filedata3.json"
  ];
  const loadJSONFilePromises = fileNames
    .filter(fileName => fileName.includes(".json"))
    .map(fileName => {
      console.log(fileName);
      return fileName;
    })
    .map(fileName => loadJSONFile(fileName));

  Promise.all(loadJSONFilePromises)
    .then(data => {
      const result = data.reduce(
        (state, item) => Object.assign(state, item),
        {}
      );

      res.send(result);
    })
    .catch(error => {
      res.status(500).send({ message: error.message });
    });
});

const server = app.listen(8080, () =>
  console.log(`Express listen on ${server.address().port}`)
);

console.log("Hello ExpressJS");