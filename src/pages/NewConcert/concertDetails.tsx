import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Container, Box, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRootStore } from "../../store/StoreContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ConcertData } from "../../common/types/concert";
import { ROUTE_LIST } from "../../router/routes";
import useCustomSnackbar from "../../hooks/useCustomSnackbar";
import { SNACKBAR_TEXT } from "../../common/constants/appConstant";
import { formContainerStyle, formStyle } from "./styles";
import { ConcertDataForm } from "./concertData/concertDataForm";
import { NewConcertControlButtons } from "./concertControlButtons/controlButtons";

export const ConcertDetailsPage: React.FC = () => {
  const {
    concertsStore: { addConcert, getConcert, updateConcert },
  } = useRootStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackbar } = useCustomSnackbar();
  const isEditPage = location.pathname.includes("/edit");
  const [isEditMode, setIsEditMode] = useState<boolean>(isEditPage);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(
    !!id && !isEditPage,
  );

  const methods = useForm<ConcertData>({
    defaultValues: {
      title: "",
      city: "",
      year: 2000,
      posterUrl: "",
      eventType: "Concert",
      date: "",
    },
    mode: "onChange",
    shouldUnregister: true,
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    setIsReadOnly(!!id && !isEditPage);
  }, [id, location.pathname]);

  useEffect(() => {
    setIsEditMode(isEditPage);
  }, [location.pathname]);

  useEffect(() => {
    if (id) {
      const fetchConcertData = async () => {
        const concert = await getConcert(id);
        if (concert) {
          reset(concert);
        }
      };

      fetchConcertData();
    }
  }, [id, reset, getConcert]);

  const handleCreate: SubmitHandler<ConcertData> = (data) => {
    addConcert(data);
    showSnackbar({
      message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_CREATION,
      variant: "success",
    });
    navigate(`/${ROUTE_LIST.CONCERTS}`);
  };

  const handleUpdate: SubmitHandler<ConcertData> = (data) => {
    if (id) {
      updateConcert(data, id);
      showSnackbar({
        message: SNACKBAR_TEXT.CONCERT_SUCCESSFUL_UPDATE,
        variant: "info",
      });
      navigate(`/${ROUTE_LIST.CONCERTS}/${id}`);
    }
  };

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

  const openConcertEditView = () => {
    navigate(`/${ROUTE_LIST.CONCERTS}/${id}/edit`);
  };

  return (
    <Container sx={formContainerStyle}>
      <Paper elevation={2}>
        <Box sx={formStyle}>
          <FormProvider {...methods}>
            <form onSubmit={submitFormHandler}>
              <ConcertDataForm readOnly={isReadOnly} />
              <NewConcertControlButtons
                readOnly={isReadOnly}
                isEditMode={isEditMode}
                onEditClick={openConcertEditView}
              />
            </form>
          </FormProvider>
        </Box>
      </Paper>
    </Container>
  );
};
