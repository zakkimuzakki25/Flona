import { createContext, useState } from "react";
import LoadingDot from "../components/common/loaders/LoadingDot";

export const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50">
          <LoadingDot /> 
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
};