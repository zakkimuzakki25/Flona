// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref } from "firebase/storage";
import { LoadingContext } from "../../../context/LoadingContext";
import { storage } from "../../../firebase/Firebase";
import LoadingDot from "../../common/loaders/LoadingDot";

import locationIcon from "../../../assets/icon/Location.svg"
import PrimerButton from "../../common/button/PrimerButton";
import SecondButton from "../../common/button/SecondButton";

// eslint-disable-next-line react/prop-types
const ActionCard = ({ title, id, photo, date, total, capacity, location }) => {
  const [image, setImage] = useState();
  const { isLoading, setIsLoading } = useContext(LoadingContext);

  const nav = useNavigate()

  useEffect(() => {
    const getImageURL = async () => {
      try {
        const url = await getDownloadURL(ref(storage, photo));
        setImage(url);
      } catch (error) {
        console.error("Error getting download URL:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getImageURL();
  }, [photo]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("id-ID", options);
    return formattedDate;
  };

  return (
    <div
      className="flex flex-col w-[366px] h-fit bg-white rounded-lg px-5 py-4 shadow-elemen gap-4"
    >
      <div className="overflow-hidden flex-shrink-0">
        {isLoading ? (
          <div className="w-full h-[196px] justify-center items-center flex bg-white">
            <LoadingDot />
          </div>
        ) : (
          <img
            src={image}
            className="w-full h-[196px] rounded-lg object-cover imghover"
          />
        )}
      </div>

      <div className="flex flex-col w-full gap-3">
        <h4 className="font-semibold text-start text-black min-h-10">{title}</h4>
        <p className="b2 text-neutral-500">{formatDate(date)}</p>
        <p className="b2 text-neutral-400">{total} / <span className="text-neutral-500">{capacity}</span></p>
        <div className="flex flex-row gap-2">
          <img src={locationIcon} alt="location icon" className="size-4"/>
          <p className="b3 text-neutral-600 text-nowrap overflow-hidden text-ellipsis">{location}</p>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <PrimerButton 
          name={"Ikut Volunteer"}
          className={"flex-1"}
          handle={() => {
            nav('/aksi/'+id+'/volunteer')
          }}
          />
        <SecondButton
          name={"Donasi"}
          className={"flex-1"}
          handle={() => {
            nav('/aksi/'+id+'/donasi')
          }}
        />
      </div>
    </div>
  );
};

export default ActionCard;
