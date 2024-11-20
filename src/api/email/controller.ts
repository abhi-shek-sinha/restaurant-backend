import { Request, Response } from 'express-serve-static-core';
import { Email } from './model';
import AppDataSource from '../../config/database.config';

const emailRepository = AppDataSource.getRepository(Email);

export const subscribeEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        console.log(email);

        const existingEmail = await emailRepository.findOneBy({ email });
        if (existingEmail){
            res.status(400).json({ message: 'Email already subscribed' });
            return;
        }
        const newEmail = new Email();
        newEmail.email = email;

        await emailRepository.save(newEmail);
        res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'unable to post gmail' , err});
    }
};

export const getEmails = async (_req: Request, res: Response) => {
    try {
        const emails = await emailRepository.find();
        res.json(emails);
    } catch (err) {
        res.status(500).json({ message: 'unable to get gmail' , err });
    }
};

export const unsubscribeEmail = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const result = await emailRepository.delete(id);
        if (result.affected === 0){
         res.status(404).json({ message: 'Email not found' });
         return;
        }    

        res.json({ message: 'Unsubscribed successfully' });
    } catch (err) {
        res.status(500).json({ message : "unable to Unsubscribe" ,err  });
    }
};
