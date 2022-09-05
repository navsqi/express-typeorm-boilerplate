import { SelectQueryBuilder } from 'typeorm';
import { dataSource } from '~/orm/dbCreateConnection';

interface IFilter {
  start_date: string;
  end_date: string;
  outlet_id?: string[];
  user_id?: any;
}

export const instansiReport = async (filter?: IFilter) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  const manager = queryRunner.manager;

  try {
    const q = manager.createQueryBuilder();
    q.from('instansi', 'i');
    q.select('i.created_at', 'created_at');
    q.addSelect('i.id', 'id_instansi');
    q.addSelect('i.nama_instansi', 'nama_instansi');
    q.addSelect('i.master_instansi_id', 'master_instansi_id');
    q.addSelect('mi.nama_instansi', 'nama_master_instansi');
    q.addSelect('i.jenis_instansi', 'jenis_instansi');
    q.addSelect('i.kategori_instansi', 'kategori_instansi');
    q.addSelect('i.status_potensial', 'status_potensial');
    q.addSelect('i.kode_unit_kerja', 'kode_unit_kerja');
    q.addSelect('outlet.nama', 'nama_unit_kerja');
    q.addSelect('outlet.unit_kerja', 'unit');
    q.addSelect('outlet_p3.nama', 'nama_unit_kerja_parent_3');
    q.addSelect('outlet_p3.unit_kerja', 'unit_parent_3');
    q.addSelect('outlet_p2.nama', 'nama_unit_kerja_parent_2');
    q.addSelect('outlet_p2.unit_kerja', 'unit_parent_2');

    q.leftJoin('master_instansi', 'mi', 'mi.id = i.master_instansi_id');
    q.leftJoin('outlet', 'outlet', 'outlet.kode = i.kode_unit_kerja');
    q.leftJoin('outlet', 'outlet_p3', 'outlet_p3.kode = outlet.parent');
    q.leftJoin('outlet', 'outlet_p2', 'outlet_p2.kode = outlet_p3.parent');

    q.where('CAST(i.created_at AS date) >= :startDate', { startDate: filter.start_date });
    q.andWhere('CAST(i.created_at AS date) <= :endDate', { endDate: filter.end_date });

    if (filter.outlet_id && filter.outlet_id.length > 0) {
      q.andWhere('i.kode_unit_kerja IN (:...kodeUnitKerja)', { kodeUnitKerja: filter.outlet_id });
    }

    const data = await q.getRawMany();
    await queryRunner.release();

    return {
      err: false,
      data,
    };
  } catch (error) {
    await queryRunner.release();
    return { err: error.message, data: null };
  }
};

export const eventReport = async (filter?: IFilter) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  const manager = queryRunner.manager;

  try {
    const q = manager.createQueryBuilder();
    q.from('event', 'e');
    q.select('e.created_at', 'created_at');
    q.addSelect('e.id', 'id_event');
    q.addSelect('e.instansi_id', 'instansi_id');
    q.addSelect('e.jenis_event', 'jenis_event');
    q.addSelect('i.nama_instansi', 'nama_instansi');
    q.addSelect('e.foto_dokumentasi', 'foto_dokumentasi');
    q.addSelect('i.nama_karyawan', 'nama_karyawan');
    q.addSelect('e.nama_event', 'nama_event');
    q.addSelect('e.tanggal_event', 'tanggal_event');
    q.addSelect('i.nama_karyawan', 'nama_karyawan');
    q.addSelect('i.no_telepon_karyawan', 'no_telepon_karyawan');
    q.addSelect('outlet.nama', 'nama_unit_kerja');
    q.addSelect('outlet.unit_kerja', 'unit');
    q.addSelect('outlet_p3.nama', 'nama_unit_kerja_parent_3');
    q.addSelect('outlet_p3.unit_kerja', 'unit_parent_3');
    q.addSelect('outlet_p2.nama', 'nama_unit_kerja_parent_2');
    q.addSelect('outlet_p2.unit_kerja', 'unit_parent_2');
    q.addSelect('leads.countall', 'jumlah_prospek');
    q.leftJoin('instansi', 'i', 'i.id = e.instansi_id');
    q.leftJoin('outlet', 'outlet', 'outlet.kode = i.kode_unit_kerja');
    q.leftJoin('outlet', 'outlet_p3', 'outlet_p3.kode = outlet.parent');
    q.leftJoin('outlet', 'outlet_p2', 'outlet_p2.kode = outlet_p3.parent');

    q.leftJoin(
      (qb) => {
        const qb2 = qb as SelectQueryBuilder<any>;

        qb2
          .from('leads', 'l')
          .addSelect('l.event_id', 'event_id')
          .addSelect('count(*)', 'countall')
          .groupBy('l.event_id');

        return qb2;
      },
      'leads',
      'leads.event_id = e.id',
    );

    q.where('CAST(e.tanggal_event AS date) >= :startDate', { startDate: filter.start_date });
    q.andWhere('CAST(e.tanggal_event AS date) <= :endDate', { endDate: filter.end_date });

    if (filter.outlet_id && filter.outlet_id.length > 0) {
      q.andWhere('i.kode_unit_kerja IN (:...kodeUnitKerja)', { kodeUnitKerja: filter.outlet_id });
    }

    const data = await q.getRawMany();
    await queryRunner.release();

    return {
      err: false,
      data,
    };
  } catch (error) {
    await queryRunner.release();
    return { err: error.message, data: null };
  }
};

export const leadsReport = async (filter?: IFilter) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  const manager = queryRunner.manager;

  try {
    const q = manager.createQueryBuilder();
    q.from('leads', 'leads');
    q.select('leads.nik_ktp', 'nik_ktp_nasabah');
    q.addSelect('leads.cif', 'cif');
    q.addSelect('leads.nama', 'nama_nasabah');
    q.addSelect('leads.no_hp', 'no_hp_nasabah');
    q.addSelect('leads.is_karyawan', 'is_karyawan');
    q.addSelect('leads.kode_produk', 'kode_produk');
    q.addSelect('leads.instansi_id', 'instansi_id');
    q.addSelect('instansi.jenis_instansi', 'jenis_instansi');
    q.addSelect('instansi.nama_instansi', 'nama_instansi');
    q.addSelect('leads.event_id', 'event_id');
    q.addSelect('event.jenis_event', 'jenis_event');
    q.addSelect('event.nama_event', 'nama_event');
    q.addSelect('leads.created_by', 'created_by');
    q.addSelect('leads.created_at', 'created_at');
    q.addSelect('leads.step', 'step');
    q.addSelect('leads.is_ktp_valid', 'is_ktp_valid');
    q.addSelect('leads.flag_app', 'flag_app');
    q.addSelect('leads.kode_unit_kerja', 'kode_unit_kerja');
    q.addSelect('outlet.nama', 'nama_unit_kerja');
    q.addSelect('outlet.unit_kerja', 'unit');
    q.addSelect('outlet_p3.nama', 'nama_unit_kerja_parent_3');
    q.addSelect('outlet_p3.unit_kerja', 'unit_parent_3');
    q.addSelect('outlet_p2.nama', 'nama_unit_kerja_parent_2');
    q.addSelect('outlet_p2.unit_kerja', 'unit_parent_2');
    q.addSelect('COALESCE(leadsclosing.omset, 0)', 'omset');
    q.addSelect('COALESCE(leadsclosing.osl, 0)', 'osl');
    q.addSelect('COALESCE(leadsclosing.saldo_tabemas, 0)', 'saldo_tabemas');

    q.leftJoin('event', 'event', 'event.id = leads.event_id');
    q.leftJoin('instansi', 'instansi', 'instansi.id = leads.instansi_id');
    q.leftJoin('outlet', 'outlet', 'outlet.kode = leads.kode_unit_kerja');
    q.leftJoin('outlet', 'outlet_p3', 'outlet_p3.kode = outlet.parent');
    q.leftJoin('outlet', 'outlet_p2', 'outlet_p2.kode = outlet_p3.parent');

    q.leftJoin(
      (qb) => {
        const qb2 = qb as SelectQueryBuilder<any>;

        qb2
          .from('leads_closing', 'lcs')
          .addSelect('lcs.nik_ktp', 'nik_ktp')
          .addSelect('SUM(lcs.up)', 'omset')
          .addSelect('MAX(lcs.osl)', 'osl')
          .addSelect('MAX(lcs.saldo_tabemas)', 'saldo_tabemas')
          .groupBy('lcs.nik_ktp');

        return qb2;
      },
      'leadsclosing',
      'leadsclosing.nik_ktp = leads.nik_ktp',
    );

    q.where('CAST(leads.created_at AS date) >= :startDate', { startDate: filter.start_date });
    q.andWhere('CAST(leads.created_at AS date) <= :endDate', { endDate: filter.end_date });

    if (filter.outlet_id && filter.outlet_id.length > 0) {
      q.andWhere('leads.kode_unit_kerja IN (:...kodeUnitKerja)', { kodeUnitKerja: filter.outlet_id });
    }

    if (filter.user_id) {
      q.andWhere('leads.created_by = :userId', { userId: filter.user_id });
    }

    const data = await q.getRawMany();
    await queryRunner.release();

    return {
      err: false,
      data,
    };
  } catch (error) {
    await queryRunner.release();
    return { err: error.message, data: null };
  }
};

export const closingReport = async (filter?: IFilter) => {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();
  const manager = queryRunner.manager;

  try {
    const q = manager.createQueryBuilder();
    q.from('leads', 'leads');
    q.select('leads.nik_ktp', 'nik_ktp_nasabah');
    q.addSelect('leads.nama', 'nama_nasabah');
    q.addSelect('leads.cif', 'cif');
    q.addSelect('leads.no_hp', 'no_hp_nasabah');
    q.addSelect('leads.is_karyawan', 'is_karyawan');
    q.addSelect('leads.kode_produk', 'kode_produk');
    q.addSelect('leads.instansi_id', 'instansi_id');
    q.addSelect('instansi.jenis_instansi', 'jenis_instansi');
    q.addSelect('instansi.nama_instansi', 'nama_instansi');
    q.addSelect('leads.event_id', 'event_id');
    q.addSelect('event.jenis_event', 'jenis_event');
    q.addSelect('event.nama_event', 'nama_event');
    q.addSelect('leads.created_by', 'created_by');
    q.addSelect('leads.created_at', 'created_at');
    q.addSelect('leads.step', 'step');
    q.addSelect('leads.is_ktp_valid', 'is_ktp_valid');
    q.addSelect('leads.flag_app', 'flag_app');
    q.addSelect('leads.kode_unit_kerja', 'kode_unit_kerja');
    q.addSelect('outlet.nama', 'nama_unit_kerja');
    q.addSelect('outlet.unit_kerja', 'unit');
    q.addSelect('outlet_p3.nama', 'nama_unit_kerja_parent_3');
    q.addSelect('outlet_p3.unit_kerja', 'unit_parent_3');
    q.addSelect('outlet_p2.nama', 'nama_unit_kerja_parent_2');
    q.addSelect('outlet_p2.unit_kerja', 'unit_parent_2');
    q.addSelect('COALESCE(leadsclosing.omset, 0)', 'omset');
    q.addSelect('COALESCE(leadsclosing.osl, 0)', 'osl');
    q.addSelect('leadsclosing.channel', 'channel');
    q.addSelect('COALESCE(leadsclosing.saldo_tabemas, 0)', 'saldo_tabemas');

    q.leftJoin('event', 'event', 'event.id = leads.event_id');
    q.leftJoin('instansi', 'instansi', 'instansi.id = leads.instansi_id');
    q.leftJoin('outlet', 'outlet', 'outlet.kode = leads.kode_unit_kerja');
    q.leftJoin('outlet', 'outlet_p3', 'outlet_p3.kode = outlet.parent');
    q.leftJoin('outlet', 'outlet_p2', 'outlet_p2.kode = outlet_p3.parent');

    q.innerJoin(
      (qb) => {
        const qb2 = qb as SelectQueryBuilder<any>;

        qb2
          .from('leads_closing', 'lcs')
          .addSelect('lcs.nik_ktp', 'nik_ktp')
          .addSelect('lcs.channel', 'channel')
          .addSelect('lcs.tgl_kredit', 'tgl_kredit')
          .addSelect('SUM(lcs.up)', 'omset')
          .addSelect('SUM(lcs.osl)', 'osl')
          .addSelect('SUM(lcs.saldo_tabemas)', 'saldo_tabemas')
          .groupBy('lcs.nik_ktp')
          .addGroupBy('lcs.channel')
          .addGroupBy('lcs.tgl_kredit');

        return qb2;
      },
      'leadsclosing',
      'leadsclosing.nik_ktp = leads.nik_ktp',
    );

    q.where('CAST(leadsclosing.tgl_kredit AS date) >= :startDate', { startDate: filter.start_date });
    q.andWhere('CAST(leadsclosing.tgl_kredit AS date) <= :endDate', { endDate: filter.end_date });

    if (filter.outlet_id && filter.outlet_id.length > 0) {
      q.andWhere('leads.kode_unit_kerja IN (:...kodeUnitKerja)', { kodeUnitKerja: filter.outlet_id });
    }

    if (filter.user_id) {
      q.andWhere('leads.created_by = :userId', { userId: filter.user_id });
    }

    const data = await q.getRawMany();
    await queryRunner.release();

    return {
      err: false,
      data,
    };
  } catch (error) {
    await queryRunner.release();
    return { err: error.message, data: null };
  }
};
