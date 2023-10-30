import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Switch,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { motion } from "framer-motion";
import format from "date-fns/format";
import { useModules } from "../../hooks/useModules";
import { AddModulesForm } from "../forms/add.modules";
import { useDeleteModule } from "../../hooks/useDeleteModule";
import { useState } from "react";
import { Confirm } from "../forms/confirm";
import { UpdateModules } from "../forms/update.modules";
import { useUpdateModule } from "../../hooks/useUpdateModule";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router";
import { client } from "../../core/client/client";

export const ModulesTable = () => {
  const navigate = useNavigate();
  const {
    confirmOpen,
    setConfirmOpen,
    setModuleIdToDelete,
    handleDelete,
    moduleIdToDelete,
  } = useDeleteModule();
  const { modules, refreshModules, questionCountArr } = useModules();
  const [open, setOpen] = useState(false);
  const {
    updateOpen,
    setUpdateOpen,
    updateName,
    setUpdateName,
    updateDescription,
    setUpdateDescription,
    handleUpdate,
    setModuleIdToUpdate,
  } = useUpdateModule();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dateHandler = (date: string) => {
    return parseISO(date);
  };

  const getQuestionCount = (moduleId: number) => {
    const questionCount = questionCountArr?.filter(
      (item) => item.module_id === moduleId,
    );
    return questionCount?.length;
  };

  return (
    <Box>
      <Box sx={{ marginTop: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AddModulesForm
            open={open}
            handleClose={handleClose}
            refreshModules={refreshModules}
          />
        </motion.div>
        <Confirm
          open={confirmOpen}
          handleClose={() => setConfirmOpen(false)}
          handleDelete={async () => {
            await handleDelete(moduleIdToDelete);
            refreshModules();
          }}
        />
        <UpdateModules
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
          updateName={updateName}
          updateDescription={updateDescription}
          handleUpdate={async () => {
            await handleUpdate();
            refreshModules();
          }}
          setUpdateName={setUpdateName}
          setUpdateDescription={setUpdateDescription}
        />
        <Grid container spacing={2}>
          {modules.map((module) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" component="div">
                      {module.name}
                    </Typography>
                    <Switch
                      checked={module.is_published}
                      color="primary"
                      onChange={async () => {
                        await client
                          .from("modules")
                          .update({ is_published: !module.is_published })
                          .eq("id", module.id);
                        refreshModules();
                      }}
                      //НЕ ЗАБЫТЬ ТЫКНУТЬ ОБРАБОТЧИК СЮДА!!!!!!
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {module.description ? module.description : "Описания нет"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginTop: 2 }}
                  >
                    Необходимо вопросов: {module.min_questions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Всего вопросов в модуле: {getQuestionCount(module.id)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Вопросов в квизе: {module.quiz_question_amount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created:{" "}
                    {format(dateHandler(module.created_at), "dd:MM:yyyy HH:mm")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Updated:{" "}
                    {format(dateHandler(module.updated_at), "dd:MM:yyyy HH:mm")}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      gap: 2,
                      marginTop: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/questions/${module.id}`)}
                    >
                      Перейти
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setModuleIdToUpdate(module.id);
                        setUpdateName(module.name);
                        setUpdateDescription(module.description);
                        setUpdateOpen(true);
                      }}
                    >
                      Изменить
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setModuleIdToDelete(module.id);
                        setConfirmOpen(true);
                      }}
                    >
                      Удалить
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Fab
        color="primary"
        aria-label="Add Module"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
