import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  Repository,
} from 'typeorm';

@Entity('urls')
export class UrlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  originalUrl: string;

  @Column({ unique: true })
  shortenedKey: string;
}

export const getUrlRepository = (): Repository<UrlModel> => getRepository(UrlModel);
