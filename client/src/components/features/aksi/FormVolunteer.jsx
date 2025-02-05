import { useState } from "react";
import Input from "../../common/inputs/Input";
import PrimerButton from "../../common/button/PrimerButton";

const FormVolunteer = () => {
    const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [address, setAddress] = useState("");
  const [jumlahPengalaman, setJumlahPengalaman] = useState("");
  const [keahlian, setKeahlian] = useState("");
  const [ketersediaanWaktu, setKetersediaanWaktu] = useState("");
  const [kondisiKesehatan, setKondisiKesehatan] = useState("");
  const [kontakDarurat, setKontakDarurat] = useState("");
  const [ukuranBaju, setUkuranBaju] = useState("");
  const [motivasi, setMotivasi] = useState("");
  const [cv, setCV] = useState("");
  const [dokumenPendukung, setDokumenPendukung] = useState("");

  return (
    <form className="flex flex-col w-full px-[120px] pb-10 gap-9">
      <div className="flex flex-col gap-10">
        <h3 className="font-semibold text-black">Daftar Flonteer</h3>
        <div className="flex flex-col gap-6">
          {/* Data Diri */}
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-black">Data Diri</h4>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-5">
                <Input
                  type="text"
                  id="namaDepan"
                  textLabel={"Nama Depan"}
                  holder="Masukkan Nama Depan"
                  value={firstname}
                  handleChange={(e) => setFirstname(e.target.value)}
                />
                <Input
                  type="text"
                  id="namaBelakang"
                  textLabel={"Nama Belakang"}
                  holder="Masukkan Nama Belakang"
                  value={lastname}
                  handleChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-5">
                <Input
                  type="email"
                  id="email"
                  textLabel={"Email"}
                  holder="Masukkan Email"
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  id="nomortelepon"
                  textLabel={"Nomor Telepon"}
                  holder="Masukkan Nomor Telepon"
                  value={nomorTelepon}
                  handleChange={(e) => setNomorTelepon(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Informasi Pendaftar */}
          <div className="flex flex-col gap-4">
            <h4 className="font-medium text-black">Data Diri</h4>
            <div className="flex flex-col gap-3">
              <Input
                type="text"
                id="alamat"
                textLabel={"Alamat Lengkap"}
                holder="Masukkan Alamat Lengkap"
                value={address}
                required={true}
                handleChange={(e) => setAddress(e.target.value)}
              />
              <div className="flex flex-row gap-5">
                <Input
                  type="dropdown"
                  options={["1-2 kali", "3-10 kali"]}
                  id="jumlahPengalaman"
                  textLabel={"Jumlah Pengalaman Volunteer"}
                  holder="Pilih Jumlah Pengalaman Volunteer"
                  value={jumlahPengalaman}
                  required={true}
                  handleChange={(e) => setJumlahPengalaman(e.target.value)}
                />
                <Input
                  type="text"
                  id="keahlian"
                  textLabel={"Bidang Keahlian/Minat"}
                  holder="Masukkan Keahlian"
                  value={keahlian}
                  required={true}
                  handleChange={(e) => setKeahlian(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-5">
                <Input
                  type="dropdown"
                  options={["part-time", "full-time"]}
                  id="ketersediaanWaktu"
                  textLabel={"Ketersediaan Waktu"}
                  holder="Pilih Ketersediaan Waktu"
                  value={ketersediaanWaktu}
                  required={true}
                  handleChange={(e) => setKetersediaanWaktu(e.target.value)}
                />
                <Input
                  type="text"
                  id="kondisiKesehatan"
                  textLabel={"Kondisi Kesehatan/Alergi"}
                  holder="Masukkan Kondisi Kesehatan"
                  value={kondisiKesehatan}
                  required={true}
                  handleChange={(e) => setKondisiKesehatan(e.target.value)}
                />
              </div>
              <div className="flex flex-row gap-5">
                <Input
                  type="number"
                  id="kontakDarurat"
                  textLabel={"Kontak Darurat"}
                  holder="Masukkan Kontak Darurat"
                  value={kontakDarurat}
                  required={true}
                  handleChange={(e) => setKontakDarurat(e.target.value)}
                />
                <Input
                  type="dropdown"
                  options={["s", "m", "l", "xl"]}
                  id="ukuranBaju"
                  textLabel={"Ukuran Baju (Opsional)"}
                  holder="Pilih Ukuran Baju"
                  value={ukuranBaju}
                  handleChange={(e) => setUkuranBaju(e.target.value)}
                />
              </div>
              <Input
                type="longtext"
                id="motivasi"
                textLabel={"Motivasi Mengikuti Kegiatan"}
                holder="Masukkan Motivasi"
                value={motivasi}
                required={true}
                handleChange={(e) => setMotivasi(e.target.value)}
              />
              <div className="flex flex-row gap-5">
                <Input
                  type="file"
                  id="cv"
                  textLabel={"CV"}
                  holder={
                    "Unggah Dokumen dengan format .pdf dan ukuran maksimal 1 mb"
                  }
                  value={cv}
                  required={true}
                  handleChange={(e) => setCV(e.target.value)}
                />
                <Input
                  type="file"
                  id="dokumenPendukung"
                  textLabel={"Dokumen Pendukung (Opsional)"}
                  holder={
                    "Unggah Dokumen dengan format .pdf dan ukuran maksimal 1 mb"
                  }
                  value={dokumenPendukung}
                  handleChange={(e) => setDokumenPendukung(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrimerButton
        name={"Kirim"}
        className={"w-52 self-end"}
        handle={() => {}}
      />
    </form>
  );
};

export default FormVolunteer;
