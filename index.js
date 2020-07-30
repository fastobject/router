import routerBuilder from "./router.js";

let router = routerBuilder();

router.use("/app1", (req, res) => res.end("request: app1"))
router.get("/app2", (req, res) => res.end("request: app1, GET"))
router.post("/app2", (req, res) => res.end("request: app1, POST"))

router.listen(3000);