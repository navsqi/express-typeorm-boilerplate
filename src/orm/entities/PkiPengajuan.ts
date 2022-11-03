import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('pki_pengajuan', { synchronize: false })
class PkiPengajuan {
  @PrimaryColumn({
    type:"varchar",
    length: 11,
  })
  no_pengajuan: string;

  @Column({
    type:"varchar",
    length: 16,
    nullable: true, 
  })
  no_ktp: string;

  @Column({
    type:"varchar",
    length: 11,
    nullable: true, 
  })
  kode_produk: string;

  @Column({
    type:"date",
  })
  tgl_pengajuan: Date;

  @Column({
    type:"varchar",
    length: 50,
    nullable: true, 
  })
  kode_outlet: string;

  @Column({
    type:"double precision",
    nullable: true
  })
  jumlah_pinjaman: number;

  @Column({
    type:"double precision",
    nullable: true
  })
  angsuran: number;

  @Column({
    type:"double precision",
    nullable: true
  })
  total_uang_muka: number;

  @Column({
    type:"varchar",
    length: 50,
    nullable: true, 
  })
  status_pengajuan: string;

  @Column({
    type:"timestamp",
    nullable: true, 
  })
  created_date: Date;

  @Column({
    type:"timestamp",
    nullable: true, 
  })
  modified_date: Date;

  @Column({
    type:"varchar",
    length: 50,
    nullable: true,
  })
  kategori_pengajuan: string;

  @Column({
    type:"varchar",
    length: 2,
    nullable: true,
  })
  kode_channel: string;

  @Column({
    type:"int4",
    nullable: true
  })
  tenor: number;

  @Column({
    type:"varchar",
    length: 15,
    nullable: true
  })
  status_usaha: string;

  @Column({
    type:"double precision",
    nullable: true
  })
  uang_pokok: number;

  @Column({
    type:"double precision",
    nullable: true
  })
  sewa_modal: number;

  @Column({
    type:"date",
    nullable: true
  })
  tgl_expired: Date;

  @Column({
    type:"varchar",
    length: 255,
    nullable: true
  })
  no_aplikasi_los: string;

  @Column({
    type:"int4",
    nullable: true
  })
  kode_instansi: number;

  @Column({
    type:"text",
    nullable: true
  })
  response_los: string;

  @Column({
    type:"text",
    nullable: true
  })
  body_los: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}

export default PkiPengajuan;