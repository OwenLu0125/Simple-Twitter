import { createContext, useState, useContext } from 'react';

const defaultIdContext = {
  currentId: null,
};

const IdContext = createContext(defaultIdContext);
export const useId = () => useContext(IdContext);

export const IdProvider = ({ children }) => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <IdContext.Provider
      value={{
        currentId,
        checkItemId: (key) => {
          setCurrentId(key);
          console.log(key);
        },
      }}
    >
      {children}
    </IdContext.Provider>
  );
};
