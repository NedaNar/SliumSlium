import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserJobOffer } from "../api/apiModel";
import useFetch from "../api/useDataFetching";

interface AppliedOffersContextType {
  appliedOffers: UserJobOffer[];
  appliedOfferIds: Set<number>;
}

const defaultContext: AppliedOffersContextType = {
  appliedOffers: [],
  appliedOfferIds: new Set(),
};

const AppliedOffersContext =
  createContext<AppliedOffersContextType>(defaultContext);

export const useAppliedOffers = () => useContext(AppliedOffersContext);

interface AppliedOffersProviderProps {
  children: ReactNode;
}

export const AppliedOffersProvider: React.FC<AppliedOffersProviderProps> = ({
  children,
}) => {
  const [appliedOffers, setAppliedOffers] = useState<UserJobOffer[]>([]);
  const [appliedOfferIds, setAppliedOfferIds] = useState<Set<number>>(
    new Set()
  );

  const { data } = useFetch<UserJobOffer[]>("UserJobOffer/1");

  useEffect(() => {
    if (data) {
      setAppliedOffers(data);
      setAppliedOfferIds(
        new Set(data.map((offer) => offer.fk_JobOfferid_JobOffer))
      );
    }
  }, [data]);

  return (
    <AppliedOffersContext.Provider value={{ appliedOffers, appliedOfferIds }}>
      {children}
    </AppliedOffersContext.Provider>
  );
};

// TODO Maybe remove this class
