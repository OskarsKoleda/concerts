import { SnackbarVariantType } from "../../common/enums/appEnums";
import { renderWithProviders } from "../../common/utils/testingUtils";
import RootStore from "../../store/RootStore";

import ErrorToast from "./ErrorToast";

const mockShowSnackbar = vi.fn();

vi.mock("../../hooks/useCustomSnackbar", () => ({
  useCustomSnackbar: () => ({
    showSnackbar: mockShowSnackbar,
  }),
}));

describe("ErrorToast", () => {
  test("should render ErrorToast when active error exists", () => {
    const rootStore = new RootStore();
    const errorText = "unexpected error";

    rootStore.transport.appState.setActiveError(errorText);

    renderWithProviders(<ErrorToast />, {
      rootStore,
    });

    expect(mockShowSnackbar).toBeCalledWith({
      message: errorText,
      variant: SnackbarVariantType.ERROR,
    });
  });
});
