import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import { useCustomSnackbar } from "../../../hooks/useCustomSnackbar.ts";
import { ROUTE_LIST } from "../../../router/routes.ts";
import { SnackbarVariantType } from "../../../common/enums/appEnums.ts";

export const useEventHandlers = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const handleSuccessfulCreate = useCallback(
    (createdEventId: string) => {
      navigate(`${ROUTE_LIST.EVENTS}/${createdEventId}`);
      showSnackbar({
        message: `Added new event - ${createdEventId}`,
        variant: SnackbarVariantType.SUCCESS,
      });
    },
    [navigate, showSnackbar],
  );

  const handleSuccessfulUpdate = useCallback(
    (updatedEventId: string) => {
      navigate(`${ROUTE_LIST.EVENTS}/${updatedEventId}`);
      showSnackbar({
        message: `Event ${updatedEventId} successfully updated`,
        variant: SnackbarVariantType.INFO,
      });
    },
    [navigate, showSnackbar],
  );

  const handleEventNotFound = useCallback(
    (eventId: string) => {
      navigate(ROUTE_LIST.EVENTS);
      showSnackbar({
        message: `Event ${eventId} not found!`,
        variant: SnackbarVariantType.ERROR,
      });
    },
    [navigate, showSnackbar],
  );

  return {
    handleSuccessfulCreate,
    handleSuccessfulUpdate,
    handleEventNotFound,
  };
};
