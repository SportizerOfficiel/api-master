export const validateTH = (req, res, next) => {
    // if (req.idTH) {
        next();
    // } else {
    //     res.status(403).send("Don't have the permissions to access");
    // }
}

export const validateAdmin = (req, res, next) => {
    // if (req.isAdmin) {
        next();
    // } else {
    //     res.status(403).send("Don't have the permissions to access");
    // }
}

export const validateBoth = (req, res, next) => {
    // if (req.isAdmin || req.idTH) {
        next();
    // } else {
    //     res.status(403).send("Don't have the permissions to access");
    // }
}