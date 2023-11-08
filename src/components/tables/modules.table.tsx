import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { client } from "../../core/client/client";
import { useDeleteModule } from "../../hooks/useDeleteModule";
import { useFetchData } from "../../hooks/useFetchData";
import { useUpdateModule } from "../../hooks/useUpdateModule";
import { ModuleCard } from "../elements/module.card";
import { AddModulesForm } from "../forms/add.modules";
import { Confirm } from "../forms/confirm";
import { UpdateModules } from "../forms/update.modules";
import { Loader } from "../elements/loader";

const fetchModules = async () =>
  await client.from("modules").select("*,questions(*)").order("created_at");

const ModulesTable = () => {
  const navigate = useNavigate();
  const {
    confirmOpen,
    setConfirmOpen,
    setModuleIdToDelete,
    handleDelete,
    moduleIdToDelete,
  } = useDeleteModule();

  const {
    data: modules,
    refreshData: refreshModules,
    revertData: revertModulesData,
  } = useFetchData(fetchModules);

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
      <Box sx={{ m: 2 }}>
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
          {modules?.map((module, _, originalModules) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <ModuleCard
                module={module}
                onPublishedChanged={async (isPublished) => {
                  const fakeData = [...originalModules];
                  const idx = originalModules.findIndex(
                    ({ id }) => id === module.id,
                  );
                  fakeData.splice(idx, 1, {
                    ...module,
                    is_published: isPublished,
                  });
                  refreshModules({ fakeData, revalidate: false });

                  try {
                    await client
                      .from("modules")
                      .update({ is_published: isPublished })
                      .eq("id", module.id);
                  } catch (error) {
                    revertModulesData();
                  }

                  refreshModules();
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
