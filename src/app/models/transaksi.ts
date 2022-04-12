export class DetailTransaksi{
  id: any;
  idTransaksi: any;
  idMenu: any;
  volume: any;
  namaMenu: any;
  hargaSatuan: any;
}

export class Transaksi{
  idTransaksi: any;
  uangJumlah: any;
  uangMasuk: any;
  uangKeluar: any;
  idPegawai: any;
  statusTransaksi: any;
  daftarMenu: DetailTransaksi[];
  tanggal: any;
  dateToString: any;
  namaPegawai: any;
}
