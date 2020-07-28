import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('Notifications')
export class Notifications {
  @PrimaryGeneratedColumn('increment')
  declare ID: number;

  @Column('uuid')
  @IsNotEmpty()
  declare AgentId: string;

  @Column('nvarchar')
  declare Target: string;

  @Column('nvarchar')
  declare Data: string;

  @Column('nvarchar')
  declare Title: string;

  @Column('nvarchar')
  declare Body: string;

  @Column('bit')
  declare isRead: boolean;

  @CreateDateColumn({ nullable: false })
  @IsNotEmpty()
  declare createdAt: Date;
}
