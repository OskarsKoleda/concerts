import { Container, Paper, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ResponseMessages } from "../../common/constants/appConstant";
import { SnackbarVariantType } from "../../common/enums/appEnums";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ROUTE_LIST } from "../../router/routes";
import { useRootStore } from "../../store/StoreContext";
import { ConcertRequests } from "../../store/transport/concertTransport/constants";

import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";
import { ConcertDatesForm } from "./concertDatesDate/concertDatesForm";
import { ConcertMainDataForm } from "./concertMainData/concertMainDataForm";
import { concertText, defaultValues } from "./constants";
import { formContainerStyle, paperStyle } from "./styles";

import type { SubmitHandler } from "react-hook-form";
import type { ConcertData } from "../../common/types/concert";

const {
  ENGLISH: {
    form: { title },
  },
} = concertText;

export const ConcertDetailsPage: React.FC = observer(function ConcertDetailsPage() {
  const { id: concertId } = useParams();
  const location = useLocation();

  const {
    concertsStore: {
      addConcert,
      getConcert,
      updateConcert,
      transport: {
        requestHandler: { isSuccessfulRequest, resetRequest },
      },
    },
  } = useRootStore();

  const navigate = useNavigate();
  const { showSnackbar } = useCustomSnackbar();
  const isEditPage = useMemo(() => location.pathname.includes("/edit"), [location.pathname]);
  const isReadOnly = useMemo(() => !!concertId && !isEditPage, [concertId, isEditPage]);

  const methods = useForm<ConcertData>({
    defaultValues,
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;
  const displayLoader =
    isReadOnly && !!concertId && !isSuccessfulRequest(ConcertRequests.getConcert);

  const handleUpdate: SubmitHandler<ConcertData> = useCallback(
    async (data) => {
      if (concertId) {
        const { status, message } = await updateConcert(data, concertId);

        if (status === "OK") {
          showSnackbar({ message, variant: SnackbarVariantType.INFO });
          navigate(`/${ROUTE_LIST.CONCERTS}/${concertId}`);
        } else {
          showSnackbar({ message, variant: SnackbarVariantType.ERROR });
        }
      }
    },
    [updateConcert, showSnackbar, navigate, concertId],
  );

  const submitFormHandler = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    event.preventDefault();
    const controlName = event.nativeEvent.submitter?.id;

    switch (controlName) {
      case "btnAdd": {
        handleSubmit(handleCreate)();
        break;
      }
      case "btnUpdate": {
        handleSubmit(handleUpdate)();
        break;
      }
    }
  };

  const handleCreate: SubmitHandler<ConcertData> = useCallback(
    (data) => {
      addConcert(data);
      showSnackbar({
        message: ResponseMessages.CONCERT_SUCCESSFUL_CREATION,
        variant: SnackbarVariantType.SUCCESS,
      });
      navigate(`/${ROUTE_LIST.CONCERTS}`);
    },
    [addConcert, showSnackbar, navigate],
  );

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.CONCERTS}/${concertId}/edit`);
  };

  const getFormTitle = useMemo(() => {
    return isEditPage ? title.editForm : isReadOnly ? title.detailsForm : title.newForm;
  }, [isEditPage, isReadOnly]);

  useEffect(() => {
    const fetchConcertData = async () => {
      if (concertId) {
        const { message, concert } = await getConcert(concertId);

        if (concert) {
          reset(concert);
        } else {
          showSnackbar({ message, variant: SnackbarVariantType.ERROR });
          navigate(`/${ROUTE_LIST.CONCERTS}`);
        }
      } else {
        reset(defaultValues);
      }
    };
    fetchConcertData();
  }, [concertId, getConcert, navigate, reset, showSnackbar]);

  useEffect(() => {
    return () => {
      resetRequest(ConcertRequests.getConcert);
    };
  }, []);

  return (
    <ContentLoader isLoading={displayLoader}>
      <Container sx={formContainerStyle}>
        <Paper sx={paperStyle} elevation={2}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <Typography variant="h5">{getFormTitle}</Typography>
              <ConcertMainDataForm readOnly={isReadOnly} />
              <ConcertDatesForm readOnly={isReadOnly} />
              <NewConcertControlButtons
                readOnly={isReadOnly}
                isEditMode={isEditPage}
                onEditClick={openConcertEditView}
              />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </ContentLoader>
  );
});
