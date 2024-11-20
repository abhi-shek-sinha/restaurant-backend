import express from 'express';
import { subscribeEmail, getEmails, unsubscribeEmail } from './controller';

const emailRoute = express.Router();

emailRoute.post('/', subscribeEmail);
emailRoute.get('/', getEmails);
emailRoute.delete('/:id', unsubscribeEmail);

export default emailRoute;
