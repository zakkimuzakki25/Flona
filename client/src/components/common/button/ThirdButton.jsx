// eslint-disable-next-line react/prop-types
const ThirdButton = ({ name, handle, type, isDisabled = false, className }) => {
    return (
      <button
        className={`flex button justify-center items-center py-3 px-4 rounded-lg drop-shadow-button ${className} ${isDisabled ? "bg-neutral-200 text-neutral-400" : "bg-primary-100 text-primary-600"} hover:brightness-90 font-semibold tracking-wide`}
        onClick={handle}
        type={type}
      >
        {name}
      </button>
    );
  };
  
  export default ThirdButton;
  