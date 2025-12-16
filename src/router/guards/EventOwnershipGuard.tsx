import { observer } from "mobx-react-lite";
import { Navigate, useParams } from "react-router-dom";

import { useGetEventDetails } from "../../api/events/useGetEventDetails";
import { useRootStore } from "../../store/StoreContext";

import type { PropsWithChildren } from "react";

const EventOwnershipGuard = ({ children }: PropsWithChildren) => {
  const { slug } = useParams();
  const { userProfile } = useRootStore().userStore;
  const { eventData } = useGetEventDetails(slug);

  const isEventCreator = userProfile?.name === eventData?.owner.name;

  if (!isEventCreator) {
    return <Navigate to="/events" />;
  }

  return children;
};

export default observer(EventOwnershipGuard);
