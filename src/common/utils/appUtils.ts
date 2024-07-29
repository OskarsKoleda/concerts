// export const getHTTPErrorMessage = (
//     error: AxiosResponse<ErrorHTTPResponse> | undefined,
//     defaultErrorMessage = "Unexpected error occurred while parsing error message",
// ): string => {
//     try {
//         if (!error) {
//             return defaultErrorMessage;
//         }

//         switch (error.status) {
//             case 422: {
//                 const { errors } = (error as unknown as ValidationHTTPError).data;

//                 return errors.map(({ field, message }) => `${field} - ${message}`).join("\n");
//             }
//             case 404: {
//                 return "Requested resource was not found";
//             }
//             default: {
//                 const { description } = (error as unknown as GeneralHTTPError).data;

//                 return description ? description : defaultErrorMessage;
//             }
//         }
//     } catch (e) {
//         return defaultErrorMessage;
//     }
// };

export function getErrorMessage(error: unknown, defaultMessage = "Error occurred"): string {
  let message: string | undefined;

  /*if (axios.isAxiosError(error)) {
    message = getHTTPErrorMessage(error.response, defaultMessage);
  } else */ if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = defaultMessage;
  }

  return message;
}
