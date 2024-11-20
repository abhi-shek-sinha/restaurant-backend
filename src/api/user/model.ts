import { ObjectId } from 'mongoose';
import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column({type: 'varchar'})
    name!: string ;

    @Column()
    email!: string  ;

    @Column()
    password!: string ;
}
