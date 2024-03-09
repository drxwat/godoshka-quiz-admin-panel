import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { client } from "../../core/client/client";
import { useDeleteModule } from "../../hooks/useDeleteModule";
import { useUpdateModule } from "../../hooks/useUpdateModule";
import { ModuleCard } from "../elements/module.card";
import { AddModulesForm } from "../forms/add.modules";
import { Confirm } from "../forms/confirm";
import { UpdateModules } from "../forms/update.modules";
import { Loader } from "../elements/loader";
import { useSWRTable } from "../../core/client/swr";

const fetchModules = async () =>
  await client.from("modules").select("*,questions(*)").order("created_at");

const ModulesTable = () => {
  const navigate = useNavigate();
  const {
    data: modules,
    mutate,
    isValidating,
  } = useSWRTable("modules", fetchModules);

  const {
    confirmOpen,
    setConfirmOpen,
    setModuleIdToDelete,
    handleDelete,
    moduleIdToDelete,
  } = useDeleteModule();

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

  if (!modules) {
    return <Loader />;
  }

  return (
    <Box>
      {isValidating && <LinearProgress color="secondary" />}
      <Box sx={{ m: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AddModulesForm
            open={open}
            handleClose={handleClose}
            refreshModules={mutate}
          />
        </motion.div>
        <Confirm
          open={confirmOpen}
          handleClose={() => setConfirmOpen(false)}
          handleDelete={async () => {
            await handleDelete(moduleIdToDelete);
            mutate();
          }}
        />
        <UpdateModules
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
          updateName={updateName}
          updateDescription={updateDescription}
          handleUpdate={async () => {
            await handleUpdate();
            mutate();
          }}
          setUpdateName={setUpdateName}
          setUpdateDescription={setUpdateDescription}
        />
        <Grid container spacing={2}>
          {modules?.map((module) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <ModuleCard
                module={module}
                onPublishedChanged={async (isPublished) => {
                  try {
                    await client
                      .from("modules")
                      .update({ is_published: isPublished })
                      .eq("id", module.id);
                    mutate();
                  } catch (error) {
                    mutate();
                  }

                  // refreshModules();
                }}
                onSelect={() => {
                  navigate(`/questions/${module.id}`);
                }}
                onEdit={() => {
                  setModuleIdToUpdate(module.id);
                  setUpdateName(module.name);
                  setUpdateDescription(module.description);
                  setUpdateOpen(true);
                }}
                onDelete={() => {
                  setModuleIdToDelete(module.id);
                  setConfirmOpen(true);
                }}
              />
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
          right: "48px",
        }}
        onClick={handleOpen}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default ModulesTable;
