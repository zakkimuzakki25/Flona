import { useState } from "react";
import eyeIcon from "../../../assets/icon/Eye.svg";
import eyeDisableIcon from "../../../assets/icon/EyeDisable.svg";
import fileIcon from "../../../assets/icon/Upload.svg";

/* eslint-disable react/prop-types */
const Input = ({
  textLabel,
  type = "text",
  id,
  holder,
  handleChange,
  value,
  isDisabled = false,
  className,
  message,
  icon,
  required = false,
  size = "normal",
  color = "default",
  messageType = "error" || "warning",
}) => {
  const [isShow, setIsShow] = useState(false);
  const [fileName, setFileName] = useState("");

  const inputSizeClasses = {
    small: "px-2 py-2 placeholder:b3 b3",
    normal: "px-2.5 py-2.5 placeholder:b3 b3",
    large: "px-3 py-3 placeholder:b1 b1",
  };

  const iconSizeClasses = {
    small: "w-3 h-3 ml-2",
    normal: "w-4 h-4 ml-2.5",
    large: "w-5 h-5 ml-3",
  };

  const colorClasses = {
    default: "border-neutral-200",
    primary: "border-primary-500",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
    handleChange && handleChange(e);
  };

  return (
    <div className={`flex flex-col items-start self-stretch ${className ? className : "flex-1"}`}>
      {textLabel && (
        <label htmlFor={id} className="pb-1 md:pb-2 b3 font-normal">
          {required && <span className="text-system-error">* </span>}
          {textLabel}
        </label>
      )}
      <div className="flex flex-col gap-1 w-full">
        <div
          className={`flex flex-row w-full rounded-md ${type == "button" ? "shadow-elemen" : "border-2"} overflow-hidden items-center ${
            message
              ? messageType === "warning"
                ? "border-system-warning"
                : "border-system-error"
              : colorClasses[color]
          }`}
        >
          {icon && <img src={icon} className={`${iconSizeClasses[size]}`} alt={`${id} icon`} />}
          {type === "button" ? (
            <button
              type="button"
              onClick={handleChange}
              className={`w-fit px-6 bg-white font-medium text-black text-center cursor-pointer hover:brightness-95 focus:outline-none ${
                inputSizeClasses[size]
              }`}
              disabled={isDisabled}
            >
              {holder || value}
            </button>
          ) : type === "file" ? (
            <label
              htmlFor={id}
              className={`flex flex-col gap-1 items-center justify-center w-full h-[74px] hover:brightness-95 bg-white text-neutral-400 cursor-pointer ${
                inputSizeClasses[size]
              }`}
            >
              <img src={fileIcon} alt="icon file" className="size-5" />
              <p className="b3 text-neutral-300">{fileName || holder || "Pilih file"}</p>
              <input
                type="file"
                id={id}
                className="hidden"
                onChange={handleFileChange}
                disabled={isDisabled}
              />
            </label>
          ) : type === "longtext" ? (
            <textarea
              id={id}
              placeholder={holder}
              value={value}
              className={`bg-transparent focus:outline-none bg-white placeholder:text-neutral-300 w-full resize-none ${inputSizeClasses[size]}`}
              rows={4}
              onChange={handleChange}
              disabled={isDisabled}
            />
          ) : (
            <input
              value={value}
              required={required}
              type={isShow ? "text" : type}
              id={id}
              placeholder={holder}
              className={`bg-transparent focus:outline-none bg-white placeholder:text-neutral-300 w-full ${inputSizeClasses[size]}`}
              onChange={handleChange}
              disabled={isDisabled}
            />
          )}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setIsShow(!isShow)}
              className="w-fit px-3"
            >
              <img
                src={isShow ? eyeIcon : eyeDisableIcon}
                alt="toggle password visibility"
                className="w-5 h-5"
              />
            </button>
          )}
        </div>
        {(Boolean(message) || message === "none") && (
          <p
            className={`b4 font-normal ${
              messageType === "warning"
                ? "text-system-warning"
                : "text-system-error"
            }`}
          >
            {message !== "none" ? message : ""}
          </p>
        )}
      </div>
      {type === "file" && fileName && (
        <p className="b4 font-normal text-neutral-500 mt-1">File: {fileName}</p>
      )}
    </div>
  );
};

export default Input;
