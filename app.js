const bodyParser = require("body-parser");
const express = require("express");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const expressHbs = require("express-handlebars");
const path = require("path");
const app = express();
app.engine(
  "hbs",
  expressHbs({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminData.routes);
app.use(shopRoutes);
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "page not found" });
});
app.listen(3000);
