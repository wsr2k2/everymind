import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 15 })
    phone: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    street: string;

    @Column({ nullable: false, type: 'varchar', length: 7 })
    number: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    complement: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    district: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    city: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    state: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    salt: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    async checkPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password
    }
}