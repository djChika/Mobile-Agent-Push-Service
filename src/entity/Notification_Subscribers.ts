import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('Notification_Subscribers')
export class Notification_Subscribers {
  @PrimaryGeneratedColumn('increment')
  declare ID: number;

  @Column('uuid')
  @IsNotEmpty()
  declare AgentId: string;

  @Column('nvarchar', { length: 'MAX' })
  @IsNotEmpty()
  declare Device_ID: string;

  @Column('nvarchar')
  declare Device_Name: string;

  @Column('nvarchar', { length: 20 })
  declare Platform: string;

  @Column('nvarchar', { nullable: false, length: 'MAX' })
  @IsNotEmpty()
  declare Push_Token: string;

  @Column('nvarchar', { length: 20 })
  declare Token_Type: string;

  @CreateDateColumn({ nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  @IsNotEmpty()
  declare createdAt: Date;

  @UpdateDateColumn({ nullable: false })
  @IsNotEmpty()
  declare updatedAt: Date;
}
