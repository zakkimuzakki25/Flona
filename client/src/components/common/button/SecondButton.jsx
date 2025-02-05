// eslint-disable-next-line react/prop-types
const SecondButton = ({ name, handle, type, isDisabled = false,className }) => {
    return (
      <button
        className={`flex button justify-center items-center py-3 px-4 rounded-lg drop-shadow-button ${className} ${isDisabled ? "bg-white text-neutral-400 border-neutral-400" : "bg-white text-secondary-500 border-secondary-500"} border-2 hover:brightness-110 font-semibold tracking-wide`}
        onClick={handle}
        type={type}
      >
        {name}
      </button>
    );
  };
  
  export default SecondButton;
  