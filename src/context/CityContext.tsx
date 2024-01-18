import { createContext, PropsWithChildren, useState } from 'react';

import { CityOption } from 'interfaces/API.interfaces';

type CityContextType = {
  city: CityOption | null;
  setCity: (newCity: CityOption | null) => void;
};

export const CityContext = createContext<CityContextType>(null!);

export default function CityContextProvider({ children }: PropsWithChildren) {
  const initialCity = localStorage.getItem('city') || '';
  const [city, setCity] = useState<CityOption | null>(
    initialCity ? JSON.parse(initialCity) : null
  );

  const handleChangeCity = (newCity: CityOption | null) => {
    setCity(newCity);
    localStorage.setItem('city', JSON.stringify(newCity));
  };

  const value = { city, setCity: handleChangeCity };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}
