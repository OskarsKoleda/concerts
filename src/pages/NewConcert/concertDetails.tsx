import { useForm, FormProvider } from "react-hook-form";
import { Container, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useRootStore } from "../../store/StoreContext";
import { ROUTE_LIST } from "../../router/routes";
import { useCustomSnackbar } from "../../hooks/useCustomSnackbar";
import { ResponseMessages } from "../../common/constants/appConstant";
import { ContentLoader } from "../../components/ContentLoader/contentLoader";
import { ConcertRequests } from "../../store/transport/concertTransport/constants";
import { SnackbarVariantType } from "../../common/enums/appEnums";

import { formContainerStyle, paperStyle } from "./styles";
import { ConcertMainDataForm } from "./concertMainData/concertMainDataForm";
import { ConcertDatesForm } from "./concertDatesDate/concertDatesForm";
import { concertText, defaultValues } from "./constants";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";

import type { ConcertData } from "../../common/types/concert";
import type { SubmitHandler } from "react-hook-form";

export const ConcertDetailsPage: React.FC = observer(() => {
  const { id: concertId } = useParams();
  const location = useLocation();
  const {
    ENGLISH: {
      form: { title },
    },
  } = concertText;
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

  const fetchConcertData = useCallback(async () => {
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
  }, [concertId, getConcert, reset]);

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
  }, [isReadOnly, isEditPage]);

  useEffect(() => {
    fetchConcertData();
  }, [fetchConcertData]);

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
