import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

  @Column({ default: false })
  isDeleted!: boolean;
}
