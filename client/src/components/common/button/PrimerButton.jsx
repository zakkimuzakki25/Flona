// eslint-disable-next-line react/prop-types
const PrimerButton = ({ name, handle, type, isDisabled = false,className }) => {
  return (
    <button
      className={`flex button justify-center items-center py-3 px-4 rounded-lg drop-shadow-button ${className} ${isDisabled ? "bg-neutral-200 text-neutral-400" : "bg-secondary-500 text-white"} hover:brightness-110 font-semibold tracking-wide`}
      onClick={handle}
      type={type}
    >
      {name}
    </button>
  );
};

export default PrimerButton;
