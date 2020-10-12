import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('usuario')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name : string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  saldo_centavos: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  saldo: number;

}

export default User;