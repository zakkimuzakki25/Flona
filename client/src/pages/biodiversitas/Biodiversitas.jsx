// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Biodiversitas.css";
import { Base } from "../../api/Api";
import FilterBiodiversity from "../../components/features/filter/FilterBiodiversity";
import BiodiversityCard from "../../components/features/card/biodiversity/BiodiversityCard";

const Biodiversitas = () => {
  const [data, setData] = useState([]);

  const filterHandle = (nama, kingdom, habitat, status) => {
    Base.get(`biodiversity/filter?name=${nama}&kingdom=${kingdom}&habitat=${habitat}&status=${status}`)
      .then((res) => {
        console.log("data hewan", res);
        setData(res.data.data);
        // window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="banner-bio flex w-full px-5 lg:px-24 pt-28 pb-28 sm:pt-64 bg-black justify-center">
        <div className="text-white sm:w-105 relative sm:-right-60">
          <h1 style={{ lineHeight: "1.2" }} className="dl uppercase">
            The more you know, the more you don&apos;t know
          </h1>
          <p className="tl">
            Pelajari lebih banyak mengenai biodiversitas melalui Perpustakaan di Flonn untuk memperluas wawasanmu.
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-default">
        {/* filter */}
        <FilterBiodiversity handleChange={filterHandle} />

        {/* bio list */}
        <div className="flex flex-col sm:flex-row flex-nowrap px-5 sm:px-7 sm:flex-wrap gap-5 sm:gap-7 justify-center relative -top-10 sm:-top-14">
          {data.map((bio) => (
            <BiodiversityCard
              id={bio.id}
              key={bio.id}
              nama={bio.name}
              namaLatin={bio.latin_name}
              deskripsi={bio.description}
              kingdom={bio.kingdom}
              habitat={bio.habitat}
              status={bio.status}
              photo={bio.photo}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Biodiversitas;
