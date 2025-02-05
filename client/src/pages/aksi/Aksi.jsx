// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import "./Aksi.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Base } from "../../api/Api";
import { LoadingContext } from "../../context/LoadingContext";

import MainLayout from "../../components/layouts/MainLayout";
import ThirdButton from "../../components/common/button/ThirdButton";
import Input from "../../components/common/inputs/Input";
import ActionCard from "../../components/features/aksi/ActionCard";

import NextArrow from "../../assets/icon/NextArrow.svg";
import PrevArrow from "../../assets/icon/PrevArrow.svg";
import locationIcon from "../../assets/icon/Location.svg";
import locationIconGreen from "../../assets/icon/LocationGreen.svg";
import dateIcon from "../../assets/icon/DateGreen.svg";
import categoryIcon from "../../assets/icon/Category.svg";
import capacityIcon from "../../assets/icon/Capacity.svg";


const Aksi = () => {
  const [dataAksi, setDataAksi] = useState([]);
  const [dataCampaign, setDataCampaign] = useState([]);
  const [indexBanner, setIndexBanner] = useState(0);
  const [itemBanner, setItemBanner] = useState(dataCampaign[indexBanner]);
  const token = window.localStorage.getItem("token");

  const [filterLocation, setFilterLocation] = useState("");
  const [filterLocationPrimary, setFilterLocationPrimary] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterCapacity, setFilterCapacity] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const nav = useNavigate();

  const { setIsLoading } = useContext(LoadingContext);

  const handleNext = () => {
    setIndexBanner((prev) => (prev + 1) % dataCampaign.length);
  };

  const handlePrev = () => {
    setIndexBanner((prev) => (prev - 1 + dataCampaign.length) % 3);
  };

  useEffect(() => {
    setItemBanner(dataCampaign[indexBanner]);
  }, [indexBanner, dataCampaign]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await Base.get(`/action/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dp = res.data.data;
      if (dp != null) {
        setDataAksi(dp);
      } else {
        setDataAksi([]);
      }
      console.log("open action = ", dp);
    } catch (err) {
      console.error("Error :", err);
    }
    try {
      const res = await Base.get(`/campaign/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const dp = res.data.data;
      if (dp != null) {
        setDataCampaign(dp);
      } else {
        setDataCampaign([]);
      }
      console.log("open campaign = ", dp);
    } catch (err) {
      console.error("Error :", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <MainLayout>
      {/* banner */}
      <div
        style={{
          backgroundImage: `${itemBanner && `url(${itemBanner.photo})`}`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-fit"
      >
        <div className="w-full h-full px-0 py-0 sm:px-14 sm:py-24 gap-14 banner-home-2 flex flex-row items-center">
          {/* left button */}
          <button className="h-fit" onClick={handlePrev}>
            <img src={PrevArrow} />
          </button>

          {/* content */}
          <div className="flex flex-col w-full">
            <div className="h-80 sm:h-96 gap-5 flex flex-col justify-center">
              {itemBanner && (
                <>
                  <div className="w-full md:w-[550px] gap-2 flex flex-col">
                    <h1
                      style={{ lineHeight: "1.2" }}
                      className="font-bold text-white w-full sm:w-455"
                    >
                      {itemBanner && itemBanner.title}
                    </h1>
                    <p style={{ lineHeight: "1.4" }} className="h4 text-white">
                      {itemBanner && itemBanner.highlight}
                    </p>
                  </div>
                  {itemBanner && (
                    <ThirdButton
                      name={"Mulai Aksi"}
                      className={"w-44"}
                      handle={() => {
                        nav(`/aksi/kampanye/${itemBanner.ID}`);
                      }}
                    />
                  )}
                </>
              )}
            </div>
            <div className="flex flex-row gap-3 pt-16">
              {dataCampaign &&
                dataCampaign.map((_, index) => (
                  <div
                    className={`w-20 h-1 rounded-sm ${
                      index == indexBanner ? "bg-white" : "bg-neutral-500"
                    }`}
                    key={index}
                  ></div>
                ))}
            </div>
          </div>

          {/* next button */}
          <button className="h-fit" onClick={handleNext}>
            <img src={NextArrow} />
          </button>
        </div>
      </div>

      {/* volunteer */}
      <div id="donasi" className="flex flex-col px-32 py-14 gap-9">
        {/* lokasi */}
        <div className="flex flex-col gap-6">
          <h3 className="font-bold text-black">
            Masukkan lokasi untuk melihat kesempatan beraksi
          </h3>
          <Input
            type="text"
            id="location"
            holder="Masukkan Lokasi"
            size="large"
            value={filterLocation}
            handleChange={(e) => {
              setFilterLocation(e.target.value);
            }}
            icon={locationIcon}
          />
        </div>

        {/* filter */}
        <div className="flex flex-col gap-2">
          <h4 className="font-semibold text-black">Filter</h4>
          <div className="flex flex-row w-full rounded-md bg-white border-2 p-5 border-neutral-200 justify-around gap-5">
            <Input
              type="text"
              id="location"
              holder="Masukkan Lokasi"
              color="primary"
              value={filterLocationPrimary}
              handleChange={(e) => {
                setFilterLocationPrimary(e.target.value);
              }}
              icon={locationIconGreen}
              className={"flex-1"}
            />
            <Input
              type="text"
              id="date"
              holder="Masukkan Tanggal"
              color="primary"
              value={filterDate}
              handleChange={(e) => {
                setFilterDate(e.target.value);
              }}
              icon={dateIcon}
              className={"flex-1"}
            />
            <Input
              type="text"
              id="capacity"
              holder="Masukkan Kapasitas"
              color="primary"
              value={filterCapacity}
              handleChange={(e) => {
                setFilterCapacity(e.target.value);
              }}
              icon={capacityIcon}
              className={"flex-1"}
            />
            <Input
              type="text"
              id="category"
              holder="Masukkan Kategori Kegiatan"
              color="primary"
              value={filterCategory}
              handleChange={(e) => {
                setFilterCategory(e.target.value);
              }}
              icon={categoryIcon}
              className={"flex-1"}
            />
          </div>
        </div>

        {/* list */}
        <div className="flex flex-wrap gap-12 justify-center">
          {dataAksi &&
            dataAksi.map((item, index) => {
              return (
                <ActionCard
                  key={index}
                  id={item.ID}
                  deskripsi={item.description}
                  photo={item.photo}
                  title={item.title}
                  date={item.start_date}
                  capacity={item.capacity}
                  location={item.location}
                  category={item.category}
                  total={250}
                />
              );
            })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Aksi;
