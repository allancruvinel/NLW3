import { Router } from 'express';
import orphanageController from './controllers/OrphanagesController';
import multer from 'multer';
import uploadConfig from './config/upload';

const routes = Router();
const upload = multer(uploadConfig)

routes.post("/orphanages",upload.array('images'),orphanageController.create);
routes.get("/orphanages",orphanageController.index);
routes.get("/orphanages/:id",orphanageController.show);

export default routes;