import logoGoogle from '../../../assets/icon/google.svg';

// eslint-disable-next-line react/prop-types
const GoogleButton = ({ handle, className }) => {
  return (
    <button
    className={`flex gap-2.5 button justify-center items-center py-3 px-4 rounded-lg drop-shadow-button ${className} hover:brightness-110 bg-white border-2 border-neutral-300`}
      onClick={handle}
      type="button"
    >
      <img src={logoGoogle} className="w-4" />
      <div className="flex self-stretch items-center b3 font-semibold">
        Google
      </div>
    </button>
  );
};

export default GoogleButton