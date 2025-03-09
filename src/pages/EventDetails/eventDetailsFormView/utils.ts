import { useNavigate } from "react-router-dom";
import { useCustomSnackbar } from "../../../hooks/useCustomSnackbar.ts";
import { ROUTE_LIST } from "../../../router/routes.ts";
import { SnackbarVariantType } from "../../../common/enums/appEnums.ts";

export const useEventHandlers = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();

  const handleSuccessfulCreate = (createdEventId: string) => {
    navigate(`${ROUTE_LIST.EVENTS}/${createdEventId}`);
    showSnackbar({
      message: `Added new event - ${createdEventId}`,
      variant: SnackbarVariantType.SUCCESS,
    });
  };

  const handleSuccessfulUpdate = (updatedEventId: string) => {
    navigate(`${ROUTE_LIST.EVENTS}/${updatedEventId}`);
    showSnackbar({
      message: `Event ${updatedEventId} successfully updated`,
      variant: SnackbarVariantType.INFO,
    });
  };

  const handleEventNotFound = (eventId: string) => {
    navigate(ROUTE_LIST.EVENTS);
    showSnackbar({
      message: `Event ${eventId} not found!`,
      variant: SnackbarVariantType.ERROR,
    });
  };

  return {
    handleSuccessfulCreate,
    handleSuccessfulUpdate,
    handleEventNotFound,
  };
};
