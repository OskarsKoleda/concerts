import type { RequestHandler } from "../requestHandler/RequestHandler.ts";
import type { ImageUploadData } from "../../responseTypes.ts";
import type { RequestContext } from "../rootTransport/types.ts";
import { getRequestContext } from "../rootTransport/utils.ts";
import { CloudinaryRequests, requestErrorMessages } from "./constants.ts";

export class CloudinaryTransport {
  constructor(readonly requestHandler: RequestHandler) {}

  private getRequestContextHelper = (requestName: CloudinaryRequests): RequestContext => {
    return getRequestContext(requestName, this.requestHandler, requestErrorMessages);
  };

  uploadImageToCloudinary = async (posterImage: FileList): Promise<ImageUploadData | undefined> => {
    const { errorTexts, request } = this.getRequestContextHelper(CloudinaryRequests.uploadPoster);
    const formData = new FormData();

    formData.append("file", posterImage[0]);
    formData.append("upload_preset", "events");

    try {
      request.inProgress();
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      return {
        publicPosterImageId: data.public_id,
        posterImageUrl: data.secure_url,
      };
    } catch (error) {
      request.fail(error, errorTexts.unexpectedError);
    }
  };
}
