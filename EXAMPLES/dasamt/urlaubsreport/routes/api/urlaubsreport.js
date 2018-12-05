const express = require('express');
const app = express.Router();
const generateUrlaubsreport = require('../../lib/generateUrlaubsreport');
module.exports = app;

app.get('/', async (req, res) => {
	const {
		repository : {
			urlaubsantraege : { loadAll },
			urlaubsConfig   : { loadMaxAnzahl },
		},
	} = req;
	const urlaubsantraege = await loadAll();
	const maxAnzahl = await loadMaxAnzahl();
	res.send(generateUrlaubsreport(urlaubsantraege, maxAnzahl));
});
