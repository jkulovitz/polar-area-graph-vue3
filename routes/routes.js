const purchaseRoutes = require("./purchases");

const appRouter = (app, fs) => {
  app.get("/", (req, res) => {
    res.send("welcome to the development api-server");
  });

  purchaseRoutes(app, fs);
};

module.exports = appRouter;