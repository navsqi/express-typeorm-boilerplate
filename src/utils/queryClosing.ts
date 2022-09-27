export const selectTmpKredit = `
SELECT
	l.id AS leads_id,
	tmpk.product_code,
	tmpk.nik_ktp,
	tmpk.no_kontrak,
	tmpk.marketing_code,
	tmpk.tgl_fpk,
	tmpk.tgl_cif,
	tmpk.tgl_kredit,
	tmpk.kode_outlet,
	tmpk.kode_outlet AS kode_outlet_pencairan,
	tmpk.up,
	tmpk.outlet_syariah,
	tmpk.cif,
	tmpk.channel_id,
	tmpk.nama_channel,
	tmpk.osl
FROM
	(
	SELECT
		*
	FROM
		tmp_kredit) tmpk,
	leads l
WHERE
	(l.nik_ktp = tmpk.nik_ktp OR l.cif = tmpk.cif)
   AND l.status = 1 
	AND CAST (l.created_at AS DATE) <= CAST ( tmpk.tgl_fpk AS DATE )
	AND tmpk.tgl_kredit IS NOT NULL
	AND tmpk.no_kontrak IS NOT NULL
	AND (tmpk.kode_outlet = l.kode_unit_kerja OR tmpk.kode_cabang = l.kode_unit_kerja)
	AND tmpk.up IS NOT NULL
	AND CAST(tmpk.up AS float8) <> 0 
`;

export const selectTmpKreditTabemas = `
SELECT
	l.id AS leads_id,
	tmpk.product_code,
	tmpk.nik_ktp,
	tmpk.no_rek AS no_kontrak,
	tmpk.marketing_code,
	tmpk.tgl_transaksi AS tgl_fpk,
	tmpk.tgl_transaksi AS tgl_kredit,
	tmpk.kode_outlet,
	tmpk.kode_outlet AS kode_outlet_pencairan,
	tmpk.omset_te,
	tmpk.amount,
	tmpk.cif,
	tmpk.channel_id,
	tmpk.nama_channel,
	tmpk.saldo,
	tmpk.jenis_transaksi
FROM
	(
	SELECT
		*
	FROM
		tmp_kredit_tabemas) tmpk,
	leads l
WHERE
	(l.nik_ktp = tmpk.nik_ktp OR l.cif = tmpk.cif)
	AND l.status = 1
	AND tmpk.tgl_transaksi IS NOT NULL
	AND tmpk.no_rek IS NOT NULL
	AND CAST (l.created_at AS DATE) <= CAST ( tmpk.tgl_transaksi AS DATE )
	AND (tmpk.kode_outlet = l.kode_unit_kerja OR tmpk.kode_cabang = l.kode_unit_kerja)
	AND tmpk.omset_te IS NOT NULL
	AND CAST(tmpk.omset_te AS float8) <> 0
	AND tmpk.jenis_transaksi IN ('SALE', 'OPEN')
`;

export default {
  selectTmpKredit,
  selectTmpKreditTabemas,
};
