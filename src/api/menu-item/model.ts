import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity("menu-items")
export class MenuItem {
  @ObjectIdColumn()
  id!: string;

  @Column()
  image!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;
}
