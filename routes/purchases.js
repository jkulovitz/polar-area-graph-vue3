const purchaseRoutes = (app, fs) => {

    const dataPath = './data/purchases.json';

    const readFile = (
        callback,
        returnJson = false,
        filePath = dataPath,
        encoding = "utf8"
    ) => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (
        fileData,
        callback,
        filePath = dataPath,
        encoding = "utf8"
    ) => {
        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get("/purchases", (req, res) => {
        readFile(data => {
            res.send(data);
        }, true);
    });

    // CREATE
    app.post("/purchases", (req, res) => {
        readFile((data) => {
            const newPurchaseId = Object.keys(data).length + 1;

            // add the new purchase
            data[newPurchaseId] = JSON.parse(JSON.stringify(req.body));
            data[newPurchaseId].id = newPurchaseId

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send("new purchase added");
            });
        }, true);
    });

    // UPDATE
    app.put("/purchases/:id", (req, res) => {
        readFile((data) => {
        // add the new purchase
        const purchaseId = req.params["id"];
        data[purchaseId] = JSON.parse(JSON.stringify(req.body));
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`purchase id:${purchaseId} updated`);
        });
        }, true);
    });

    // DELETE
    app.delete("/purchases/:id", (req, res) => {
        readFile((data) => {
        // add the new purchase
        const purchaseId = req.params["id"];
        delete data[purchaseId];
    
        writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send(`purchase id:${purchaseId} removed`);
        });
        }, true);
    });
};

module.exports = purchaseRoutes;