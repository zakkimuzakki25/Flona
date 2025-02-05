import { useState } from "react";
import Input from "../../common/inputs/Input";
import PrimerButton from "../../common/button/PrimerButton";
import DropDownMetodePembayaran from "../../common/options/DropDownMetodePembayaran";

const FormDonasi = (data) => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");

  const [pengirim, setPengirim] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [isCheck, setIsCheck] = useState(false);

  return (
    <form className="flex flex-col gap-10 bg-white shadow-elemen rounded-lg px-12 py-7 w-[835px]">
      <div className="flex-col flex gap-16">
        {/* nominal */}
        <div className="flex flex-col gap-12">
          <h3 className="font-semibold text-black">
            Masukkan Donasi Terbaik Anda
          </h3>
          <div className="gap-12 flex flex-col px-10">
            <div className="flex flex-row justify-center gap-14">
              <Input
                type="button"
                id=""
                holder="Rp 5.000"
                value={5000}
                size="large"
                handleChange={() => setAmount(5000)}
                className={"w-fit"}
              />
              <Input
                type="button"
                id=""
                holder="Rp 10.000"
                value={10000}
                size="large"
                handleChange={() => setAmount(10000)}
                className={"w-fit"}
              />
              <Input
                type="button"
                id=""
                holder="Rp 20.000"
                value={20000}
                size="large"
                handleChange={() => setAmount(20000)}
                className={"w-fit"}
              />
            </div>
            <div className="flex flex-row justify-center gap-14">
              <Input
                type="button"
                id=""
                holder="Rp 50.000"
                value={50000}
                size="large"
                handleChange={() => setAmount(50000)}
                className={"w-fit"}
              />
              <Input
                type="button"
                id=""
                holder="Rp 100.000"
                value={100000}
                size="large"
                handleChange={() => setAmount(100000)}
                className={"w-fit"}
              />
            </div>
            <Input
                type="number"
                id=""
                holder="Masukkan Nominal Lainnya..."
                value={amount}
                size="large"
                handleChange={(e) => setAmount(e.target.value)}
                className={"w-full shadow-elemen rounded-lg"}
              />
          </div>
        </div>

        {/* metode pembayaran */}
        <div className="flex flex-col gap-12">
          <h3 className="font-semibold text-black">
            Pilih Metode Pembayaran
          </h3>
          <DropDownMetodePembayaran 
            handleChange={(e) => setSelectedMethod(e)}
          />
        </div>

        {/* data */}
        <div className="flex flex-col gap-7">
          <h3 className="font-semibold text-black">
            Lengkapi Data di Bawah Ini
          </h3>
          <Input
            type="text"
            id="pengirim"
            holder="Nama Pengirim"
            value={pengirim}
            size="large"
            handleChange={(e) => setPengirim(e.target.value)}
          />
          <Input
            type="text"
            id="pengirim"
            holder="Nomor Telepon"
            value={nomorTelepon}
            size="large"
            handleChange={(e) => setNomorTelepon(e.target.value)}
          />
          <div className="flex flex-row gap-2.5">
                    <input
                      type="checkbox"
                      className="self-center"
                      onChange={() => setIsCheck(!isCheck)}
                      checked={isCheck}
                    />
                    <h4 className="flex flex-row gap-1 text-nowrap text-neutral-400">
                      Sembunyikan nama saya (donasi sebagai anonim)
                    </h4>
                  </div>
        </div>

      </div>
      <PrimerButton name="Lanjutkan Pembayaran" isDisabled={true} />
    </form>
  );
};

export default FormDonasi;
