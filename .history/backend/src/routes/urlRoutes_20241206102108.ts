import {deleteUrl, editUrl, getUrls, redirectUrl, postUrl, alterTable, getDashboard} from '../controllers/urlController';
import { userTokenValidation } from '../middleware/userTokenValidation';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { editSchema, urlSchema } from '../schemas/url.schema';

const express = require('express');
const router = express.Router();

//to create the table
// router.get('/create',createTable);

//get all the urls
router.get('/display',getUrls);

//post the url
router.post('/add',validationMiddleware(urlSchema),postUrl);

//delete the url
router.delete('/delete/:shorturl', deleteUrl);

//update the url
router.put('/edit/:shorturl',validationMiddleware(editSchema),editUrl)

// redirect into the mainurl 
router.get('/:shorturl',redirectUrl)

// add a column to store the username
router.put('/alter',alterTable)

//get the urls of logged user
router.get('/dashboard/',userTokenVal)

export default router;