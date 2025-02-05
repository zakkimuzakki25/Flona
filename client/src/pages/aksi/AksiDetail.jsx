import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Base } from "../../api/Api";
import { storage } from "../../firebase/Firebase";
import MainLayout from "../../components/layouts/MainLayout";
import PrimerButton from "../../components/common/button/PrimerButton";

import iconDate from "../../assets/icon/Date.svg";
import iconPeople from "../../assets/icon/People.svg";
import iconLocation from "../../assets/icon/Location.svg";
import FormVolunteer from "../../components/features/aksi/FormVolunteer";
import FormDonasi from "../../components/features/aksi/FormDonasi";

const AksiDetail = () => {
  const [image, setImage] = useState({ url: "", isLoading: true });
  const [data, setData] = useState({});

  const [isFormVolunteerOpen, setIsFormVolunteerOpen] = useState(false);
  const [isFormDonasiOpen, setIsFormDonasiOpen] = useState(false);

  const nav = useNavigate();

  const { id, activeTab = "volunteer" } = useParams();
  const numberFormatter = new Intl.NumberFormat("id-ID");

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("id-ID", options);
    return formattedDate;
  };

  const getData = () => {
    Base.get(`/action/${id}`)
      .then((res) => {
        const dp = res.data.data;
        setData(dp);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      if (!data.photo) return;

      try {
        const photoPath = data.photo.split("<>")[0];
        const imageRef = ref(storage, photoPath);

        const url = await getDownloadURL(imageRef);
        setImage({ url, isLoading: false });
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    };

    fetchImage();
  }, [data.photo]);

  const dataDummy = {
    rincian: [
      {
        kategori: "Makanan & Logistik",
        deskripsi: "Beras, mie instan, air mineral",
        jumlah: 2000000,
      },
      {
        kategori: "Kesehatan & Medis",
        deskripsi: "Obat-obatan, masker, P3K",
        jumlah: 1000000,
      },
      {
        kategori: "Peralatan Darurat",
        deskripsi: "Selimut, tenda, senter",
        jumlah: 1200000,
      },
      {
        kategori: "Transportasi & Distribusi",
        deskripsi: "Bensin, sewa kendaraan relawan",
        jumlah: 500000,
      },
      {
        kategori: "Administrasi & Laporan",
        deskripsi: "Dokumentasi, pelaporan transparansi",
        jumlah: 300000,
      },
    ],
  };

  return (
    <MainLayout>
      {/* general info */}
      {activeTab === "volunteer" ? (
        <section className="flex flex-col w-full bg-primary-500 bg-opacity-30 px-[120px] py-10 gap-8">
          <nav className="h-fit w-full flex flex-row gap-2 items-center">
            <Link
              to={"/aksi"}
              className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-500"
            >
              Aksi
            </Link>
            {isFormVolunteerOpen && (
                <>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-black"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <Link
                to={`/aksi/${data.id}/donasi?isFormDonasiOpen=false`}
                onClick={() => {
                  window.location.reload();
                }}
                className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-500"
              >
                Volunteer
              </Link></>
              )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-black"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
            <span className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-600 font-semibold">
              Volunteer {data.title}
            </span>
          </nav>

          <div className="flex flex-row w-full gap-10">
            {/* left */}
            <div className="flex flex-col flex-1 gap-8">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-black">{data.title}</h3>
                <p className="b1 text-primary-600">{data.subtitle}</p>
              </div>

              <div className="flex flex-col gap-6">
                {/* information */}
                <div className="flex flex-row gap-14">
                  <div className="flex flex-row gap-3">
                    <img src={iconDate} alt="date icon" className="w-6 h-6" />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-neutral-500">
                        Tanggal Pelaksanaan
                      </h4>
                      <h4 className="font-normal text-neutral-400 w-full">
                        {formatDate(data.start_date)}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row gap-3">
                    <img
                      src={iconPeople}
                      alt="people icon"
                      className="w-6 h-6"
                    />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-neutral-500">
                        Kapasitas Relawan
                      </h4>
                      <h4 className="font-normal text-neutral-400 w-full">
                        {data.total_volunteer ? data.total_volunteer : 0}
                        <span className="text-neutral-500">
                          {" "}
                          / {data.capacity}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>

                {/* map */}
                <div className="flex flex-col w-full shadow-elemen rounded-t-lg">
                  <div className="flex flex-row gap-3 p-3 bg-white rounded-t-lg">
                    <img
                      src={iconLocation}
                      alt="location icon"
                      className="size-5"
                    />
                    <div className="flex-col flex gap-0.5">
                      <p className="b1 font-medium text-neutral-500">Lokasi</p>
                      <p className="b1 font-normal text-neutral-400">
                        {data.location}
                      </p>
                    </div>
                  </div>
                  {/* mapnya sini */}
                  <div className="h-36 w-full"></div>
                </div>

                {/* organizer */}
                <div className="flex flex-row gap-3">
                  <p className="b1 text-neutral-400">Diselenggarakan oleh</p>
                  <img
                    src={data.logo_organizer}
                    alt="organizer logo"
                    className="h-6"
                  />
                </div>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-1">
              <img
                src={data.photo}
                alt={`${data.title} image`}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>
      ) : (
        <section
          style={{ backgroundImage: `url(${data.photo})` }}
          className="flex bg-cover flex-col w-full min-h-screen overflow-hidden"
        >
          <article className="flex flex-col justify-between w-full h-screen bg-black bg-opacity-40 px-[120px] pt-10 pb-20 gap-8">
            <nav className="h-fit w-full flex flex-row gap-2 items-center">
              <Link
                to={"/aksi"}
                className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-500"
              >
                Aksi
              </Link>
              {isFormDonasiOpen && (
                <>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-black"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <Link
                to={`/aksi/${data.id}/donasi?isFormDonasiOpen=false`}
                onClick={() => {
                  window.location.reload();
                }}
                className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-500"
              >
                Donasi
              </Link></>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-black"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="bg-white rounded-full px-6 py-1.5 b4 text-neutral-600 font-semibold">
                Donasi {data.title}
              </span>
            </nav>

            <div className="flex flex-col w-full gap-4">
              <h1 className="font-bold text-white">{data.title}</h1>
              <p className="b1 text-neutral-100">{data.description}</p>
            </div>
          </article>
        </section>
      )}

      <section className="flex flex-col gap-8">
        {/* tab row */}
        <nav className="flex flex-row w-full bg-white shadow-elemen">
          <Link
            className={`flex flex-1 justify-center font-medium text-black bg-white hover:brightness-95`}
            to={"/aksi/" + id + "/volunteer"}
          >
            <h3
              className={`${
                activeTab == "volunteer" &&
                "border-b-4 border-secondary-500 rounded-md"
              } py-4 px-2.5`}
            >
              Volunteer
            </h3>
          </Link>
          <Link
            className={`flex flex-1 justify-center font-medium text-black bg-white hover:brightness-95`}
            to={"/aksi/" + id + "/donasi"}
          >
            <h3
              className={`${
                activeTab == "donasi" &&
                "border-b-4 border-secondary-500 rounded-md"
              } py-4 px-2.5`}
            >
              Donasi
            </h3>
          </Link>
        </nav>
        {/* tab content */}
        {activeTab === "volunteer" ? (
          // volunteer
          !isFormVolunteerOpen ? (
            <div className="flex flex-col w-full px-[120px] pb-10 gap-9">
              <div className="flex flex-col w-full gap-10">
                <div className="flex flex-col shadow-elemen bg-white p-6 rounded-lg gap-3">
                  <h3 className="font-semibold text-neutral-600">Deskripsi</h3>
                  <p className="font-normal text-neutral-500 b1">
                    {data.description}
                  </p>
                </div>

                <div className="flex flex-col shadow-elemen bg-white p-6 rounded-3xl gap-3">
                  <h3 className="font-semibold text-neutral-500">
                    Rincian Tugas
                  </h3>
                  <div className="flex flex-col gap-1">
                    <p className="font-normal text-neutral-500 b1">
                      Berikut adalah kegiatan yang akan dilakukan oleh Flonteer
                      dalam program {data.title} di {data.location}:
                    </p>
                    {data.tasks &&
                      data.tasks.split("<>").map((item, index) => (
                        <div key={index} className="flex flex-row gap-1.5 pl-2">
                          <p
                            style={{ lineHeight: "1.2" }}
                            className="font-medium text-neutral-600 b1"
                          >
                            {index + 1}.
                          </p>
                          <div className="flex flex-col gap-1">
                            <p
                              style={{ lineHeight: "1.2" }}
                              className="font-medium text-neutral-600 b1"
                            >
                              {item && item.split(":")[0]}
                            </p>
                            <p
                              style={{ lineHeight: "1.1" }}
                              className="font-normal text-neutral-500 b1"
                            >
                              {item && item.split(":")[1]}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col shadow-elemen bg-white p-6 rounded-3xl gap-3">
                  <h3 className="font-semibold text-neutral-500">
                    Persyaratan
                  </h3>
                  <div className="flex flex-row gap-14">
                    <div className="flex flex-col w-full gap-4">
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Kewarganegaraan
                        </h4>
                        <p className="font-normal text-neutral-500 b1">
                          {data.condition && data.condition.split("<>")[0]}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Umur
                        </h4>
                        <p className="font-normal text-neutral-500 b1">
                          {data.condition && data.condition.split("<>")[1]}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Pengalaman
                        </h4>
                        <p className="font-normal text-neutral-500 b1">
                          Berikut pengalaman yang dibutuhkan, tidak wajib,
                          tetapi menjadi nilai tambah.
                        </p>
                        {data.condition &&
                          data.condition
                            .split("<>")[2]
                            .split(":")
                            .map((item, index) => (
                              <div key={index} className="flex flex-row gap-2">
                                <p className="font-normal text-neutral-500 b1">
                                  {index + 1}.{" "}
                                </p>
                                <p className="font-normal text-neutral-500 b1">
                                  {item}
                                </p>
                              </div>
                            ))}
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Tingkat Pendidikan
                        </h4>
                        <p className="font-normal text-neutral-500 b1">
                          {data.condition && data.condition.split("<>")[3]}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Bahasa
                        </h4>
                        <p className="font-normal text-neutral-500 b1">
                          {data.condition && data.condition.split("<>")[4]}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-col">
                        <h4 className="font-medium text-neutral-600 b1">
                          Keterampilan
                        </h4>
                        {data.condition &&
                          data.condition
                            .split("<>")[5]
                            .split(":")
                            .map((item, index) => (
                              <div key={index} className="flex flex-row gap-2">
                                <p className="font-normal text-neutral-500 b1">
                                  {index + 1}.{" "}
                                </p>
                                <p className="font-normal text-neutral-500 b1">
                                  {item}
                                </p>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <PrimerButton
                name={"Daftar Flonteer >"}
                className={"w-fit px-8 self-end"}
                handle={() => setIsFormVolunteerOpen(true)}
              />
            </div>
          ) : (
            // form
            <FormVolunteer />
          )
        ) : // donasi
        isFormDonasiOpen ? (
          <div className="flex pb-10 pt-3 justify-center">
            <FormDonasi />
          </div>
        ) : (
          <div className="flex flex-col w-full px-[120px] pb-10 gap-9">
            {/* informasi donasi */}
            <div className="flex flex-col bg-white rounded-lg shadow-elemen gap-10 px-10 py-7">
              <h3 className="font-semibold text-black">Informasi Donasi</h3>
              <div className="flex flex-col gap-6 px-5">
                <div className="flex flex-col gap-3">
                  <div className="flex-row flex justify-between">
                    <div className="flex-row flex gap-2 items-end">
                      <h4 className="font-medium text-neutral-600">Rp. </h4>
                      <p className="b2 text-neutral-500">terkumpul</p>
                    </div>
                    <div className="flex-row flex gap-2 items-end">
                      <p className="b2 text-neutral-500">dari</p>
                      <h4 className="font-medium text-neutral-600">
                        Rp {numberFormatter.format(data.target)}
                      </h4>
                    </div>
                  </div>
                  {/* progress bar */}
                  <div className="w-full rounded-full h-5 bg-neutral-200 overflow-hidden">
                    <div
                      className={`bg-secondary-500 rounded-full w-40 h-full`}
                    />
                  </div>
                  <div className="flex-row flex justify-between">
                    <h4 className="font-medium text-black">0 Donasi</h4>
                    <h4 className="font-medium text-black">hari lagi</h4>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <p className="b1 text-neutral-400">Diselenggarakan oleh</p>
                  <img
                    src={data.logo_organizer}
                    alt="organizer logo"
                    className="h-6"
                  />
                </div>
              </div>
            </div>

            {/* log donasi */}
            <div className="flex flex-col bg-white rounded-lg shadow-elemen gap-10 px-10 pt-7 pb-10">
              <h3 className="font-semibold text-black">Lacak Donasi Anda</h3>
              <div className="flex flex-col gap-8 px-5">
                {/* checkpoint */}
                <div className="flex flex-col gap-16">
                  <div className="flex flex-row gap-6 items-center">
                    <div className="rounded-full bg-secondary-500 size-[30px] z-20" />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-neutral-600">
                        Pengumpulan Donasi
                      </h4>
                      <h4 className="font-normal text-neutral-500">
                        1 Januari 2025 - 25 Februari 2025{" "}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 items-center relative">
                    <div className="bg-secondary-200 w-1.5 absolute h-24 -top-20 left-3 z-10" />
                    <div className="rounded-full bg-secondary-200 size-[30px] z-20" />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-neutral-600">
                        Penyaluran Donasi
                      </h4>
                      <h4 className="font-normal text-neutral-500">
                        1 Januari 2025 - 25 Februari 2025{" "}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 items-center relative">
                    <div className="bg-secondary-200 w-1.5 absolute h-24 -top-20 left-3 z-10" />
                    <div className="rounded-full bg-secondary-200 size-[30px] z-20" />
                    <div className="flex flex-col gap-2">
                      <h4 className="font-medium text-neutral-600">
                        Penyaluran Selesai
                      </h4>
                      <h4 className="font-normal text-neutral-500">
                        1 Januari 2025 - 25 Februari 2025{" "}
                      </h4>
                    </div>
                  </div>
                </div>
                {/* table */}
                <div className="gap-5 flex flex-col">
                  <h4 className="font-semibold text-black">
                    Rincian Penggunaan Dana
                  </h4>
                  <table className="table-auto border-collapse border-y border-gray-300 w-full text-left">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 text-center bg-neutral-200 text-neutral-600">
                          Kategori
                        </th>
                        <th className="border border-gray-300 p-2 text-center bg-neutral-200 text-neutral-600">
                          Deskripsi
                        </th>
                        <th className="border border-gray-300 p-2 text-center bg-neutral-200 text-neutral-600">
                          Jumlah (Rp)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataDummy.rincian.map((item, index) => (
                        <tr key={index}>
                          <td className="border-y border-gray-300 p-2 text-center">
                            {item.kategori}
                          </td>
                          <td className="border-y border-gray-300 p-2 text-center">
                            {item.deskripsi}
                          </td>
                          <td className="border-y border-gray-300 p-2 text-center">
                            {item.jumlah.toLocaleString("id-ID")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* button */}
            <PrimerButton
              name={"Donasi Sekarang >"}
              className={"w-52 self-end"}
              handle={() => {
                setIsFormDonasiOpen(true);
              }}
            />
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default AksiDetail;
