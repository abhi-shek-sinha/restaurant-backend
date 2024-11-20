import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('emails')
export class Email {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    email!: string;
}
