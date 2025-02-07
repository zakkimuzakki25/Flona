import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Base } from "../../api/Api";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/Firebase";
import BusinessPersonIll from "../../assets/illustration/campaign/BusinessPerson.png";
import LoadingDot from "../../components/common/loaders/LoadingDot";
import ActionCard from "../../components/features/aksi/ActionCard";

const KampanyeDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const nav = useNavigate();
  const [image, setImage] = useState({ url: "", isLoading: true });
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = window.localStorage.getItem("token");

  const getData = async () => {
    Base.get(`/campaign/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        const dp = res.data.data;
        setData(dp);
        console.log("data", dp);
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
        const photoPath = data.photo;
        const imageRef = ref(storage, photoPath);

        const url = await getDownloadURL(imageRef);
        setImage({ url, isLoading: false });
      } catch (error) {
        console.error("Error getting download URL:", error);
      }
    };

    fetchImage();
  }, [data.photo]);
  return (
    <main className="bg-onyx">

      <section className="flex flex-col w-full lg:mt-28">
        <nav className="h-fit w-full flex flex-row px-40 py-2.5 gap-5">
          <Link to={"/aksi"} className="bl text-white hover:text-cambridgeBlue">
            Aksi
          </Link>
          <span className="bl text-white">&gt;</span>
          <span className="bl text-cambridgeBlue">Volunteer {data.title}</span>
        </nav>
        {image.isLoading ? (
          <div className="w-full h-550 justify-center items-center flex bg-default">
            <LoadingDot />
          </div>
        ) : (
          <div className="h-550 w-full relative">
            <img src={image.url} className="w-full h-full object-cover " />
            <div className="h-full w-full bg-black bg-opacity-45 absolute top-0">
              <div className="absolute top-0 left-0 bg-jasmine ds px-5 rounded-br-full">
                {data.purpose}
              </div>
              <div className="h-550 flex items-center absolute left-16 bottom-0">
                <p
                  style={{ lineHeight: "1.2" }}
                  className="h1 text-white"
                >
                  {data && data.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Kenapa Harus Ikut */}
      {data.why_text && (
        <section className="flex flex-col py-12 px-16 bg-oldGreen items-center text-white">
          <h2 className="dl">Kenapa Harus Ikut?</h2>
          <div className="flex flex-row w-full justify-center rounded-3xl p-6 gap-14">
            {data.why_text &&
              data.why_text.split("#").map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2.5 justify-center items-center flex-1"
                >
                  <img src={item.split(";")[0]} className="h-40" />
                  <h3 className="text-3xl font-bold text-center text-nowrap">
                    {item.split(";")[1]}
                  </h3>
                  <p className="font-medium text-base text-center">
                    {item.split(";")[2]}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Steps */}
      <section className="flex flex-row pt-12 pb-20 px-40 gap-16 bg-onyx text-white">
        {/* left */}
        <div className="flex flex-col w-full pt-10">
          <h2 className="dl text-white pb-5">
            {data.steps && data.steps.split("#")[0]}
          </h2>
          {data.steps &&
            (() => {
              const stepsArray = data.steps.split("#")[1].split("<>");
              const halfLength = Math.ceil(stepsArray.length / 2);
              return stepsArray.slice(0, halfLength).map((item, index) => (
                <div key={index} className="flex flex-row gap-3 items-center">
                  <div className="flex-col flex justify-center items-center h-full">
                    {/* circle number */}
                    <div className="p-2 border-4 border-oldGreen w-14 h-14 shrink-0 rounded-full justify-center items-center">
                      <span className="text-center ds -translate-y-2">
                        {index + 1}
                      </span>
                    </div>

                    {/* vertical line */}
                    <div className={`w-1 flex-1 bg-oldGreen`} />
                  </div>
                  <div className="flex flex-col pb-10 gap-1">
                    <h3 className="text-xl font-semibold">
                      {item.split(";")[0]}
                    </h3>
                    <p className="bs">{item.split(";")[1]}</p>
                  </div>
                </div>
              ));
            })()}
        </div>
        {/* right */}
        <div className="flex flex-col w-full">
          <img src={data.steps_photo} className="h-300 mb-7" />
          {data.steps &&
            (() => {
              const stepsArray = data.steps.split("#")[1].split("<>");
              const halfLength = Math.ceil(stepsArray.length / 2);
              return stepsArray.slice(halfLength).map((item, index) => (
                <div
                  key={index + halfLength}
                  className="flex flex-row gap-3 items-center"
                >
                  <div className="flex-col flex justify-center items-center h-full">
                    {/* circle number */}
                    <div className="p-2 border-4 border-oldGreen w-14 h-14 shrink-0 rounded-full justify-center items-center">
                      <span className="text-center ds -translate-y-2">
                        {index + 1 + halfLength}
                      </span>
                    </div>

                    {/* vertical line */}
                    <div
                      className={`w-1 flex-1 ${
                        index != stepsArray.length - halfLength - 1
                          ? "bg-oldGreen"
                          : "bg-transparent"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col pb-10 gap-1">
                    <h3 className="text-xl font-semibold">
                      {item.split(";")[0]}
                    </h3>
                    <p className="bs">{item.split(";")[1]}</p>
                  </div>
                </div>
              ));
            })()}
        </div>
      </section>

      {/* Keterangan */}
      <section
        className={`py-7 px-40 bg-oldGreen flex flex-col gap-2.5 text-white`}
      >
        <p className="ds">{data.keterangan && data.keterangan.split("#")[0]}</p>
        <p className="text-xl">
          {data.keterangan && data.keterangan.split("#")[1]}
        </p>
        <h2 className="dl">Mulai Sekarang!</h2>
      </section>

      {/* Tasks */}
      <section className="py-16 px-40 bg-onyx flex flex-wrap gap-10 justify-center">
        {data.open_campaign_tasks &&
          data.open_campaign_tasks.map((item, index) => (
            <ActionCard
              id={item.ID}
              key={index}
              title={item.title}
              photo={item.photo}
              flointReward={item.floint_reward}
            />
          ))}
      </section>

      {/* bar down */}
      <section className="py-16 px-40 bg-onyx flex flex-row gap-20">
        <div className="flex flex-row bg-viridian text-white gap-8 w-full p-14 rounded-2xl items-center">
          <img src={BusinessPersonIll} className="object-cover w-fit h-64" />
          <div className="flex flex-col px-10">
            <p style={{ lineHeight: "1.3" }} className="dl">
              {data.tot_participants} orang sudah mendukung kampanye ini.
            </p>
            <p className="tl">
              Sekarang waktunya giliranmu. Berani mengambil langkah?
            </p>
          </div>
        </div>
      </section>

    </main>
  );
};

export default KampanyeDetail;
