import categoriesRoutes from "./categoriesRoutes.js";
import clubRoutes from "./clubRoutes.js";
import matchRoutes from "./matchRoutes.js";
import playerRoutes from "./playerRoutes.js";
import presentPlayersRoutes from "./presentPlayersRoutes.js";
import townHallRoutes from "./townHallRoutes.js";
import { body } from 'express-validator'
import authenticationRoutes from "./authenticationRoutes.js";
import { authCheck } from "../controllers/users.controllers.js";

const routes = (app) => {

    app.use('/api', authenticationRoutes.routes);

    //Check token before access to other routes
    // app.use(async (req, res, next) => {
    //     authCheck(req)
    //         .then((result) => {
    //             console.log("-----", result)
    //             if (result === null || result === undefined){
    //                 res.status(403).send("Invalid token");
    //             }
    //             req.isAdmin = result.admin
    //             req.idTH = result.idTH
    //             next();
    //         }).catch((e) => {
    //             console.log(e)
    //             res.status(500).send(e);
    //         })
    // })

    app.use('/api', clubRoutes.routes);
    app.use('/api', townHallRoutes.routes);
    app.use('/api', playerRoutes.routes);
    app.use('/api', matchRoutes.routes);
    app.use('/api', presentPlayersRoutes.routes);
    app.use('/api', categoriesRoutes.routes);
}

export default routes