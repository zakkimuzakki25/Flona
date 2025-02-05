/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ArrowDown from "../../../assets/icon/map/ArrowDown.svg";
import PrimerButton from "../button/PrimerButton";
import { DataMetodePembayaran } from "../../../data/DataMetodePembayaran";

/* eslint-disable react/prop-types */
const DropDownMetodePembayaran = ({ handleChange }) => {
  const [selected, setSelected] = useState(null);
  const [isSelect, setIsSelected] = useState(false);

  // Update parent state if a method is selected
  useEffect(() => {
    if (selected) {
      handleChange(selected);
    }
  }, [selected]);

  const toggleDropdown = () => {
    setIsSelected((prev) => !prev);
  };

  return (
    <div className="flex flex-col rounded-3xl">
      {/* Dropdown button */}
      <button
      type="button"
        onClick={toggleDropdown}
        className="flex w-full items-center bg-white shadow-s-default z-0 rounded-2xl py-5 px-7 justify-between border-2 border-neutral-200"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img src={selected.logo} alt={selected.nama} className="h-6" />
            <p className="blb text-black">{selected.nama}</p>
          </div>
        ) : (
          <p className="blb text-gray hover:cursor-default">
            Pilih Metode Pembayaran
          </p>
        )}
        <img src={ArrowDown} alt="Arrow Down" className={`transform ${isSelect ? "rotate-180" : "rotate-0"}`} />
      </button>

      {/* Dropdown options */}
      {isSelect && (
        <div className="flex flex-col bg-white shadow-s-default border-neutral-200 mt-2">
          {DataMetodePembayaran && DataMetodePembayaran.length > 0 ? (
            DataMetodePembayaran.map((metode, index) => (
              <div
                className={`flex flex-row p-5 justify-between items-center ${
                  index !== 0 && "border-t border-neutral-200"
                } gap-5`}
                key={metode.id || index}
              >
                <div className="flex flex-row items-center gap-3">
                  <img src={metode.logo} alt={metode.nama} className="h-10" />
                  <p className="tl">{metode.nama}</p>
                </div>
                <PrimerButton
                  name="Pilih"
                  handle={() => {
                    setSelected(metode);
                    setIsSelected(false);
                  }}
                  type="button"
                  className={"w-24"}
                />
              </div>
            ))
          ) : (
            <p className="text-center py-5 text-gray">Data tidak tersedia</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DropDownMetodePembayaran;
