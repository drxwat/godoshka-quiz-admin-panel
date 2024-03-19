import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUpdateModule } from "../../hooks/useUpdateModule";
import { ModuleCard } from "../elements/module.card";
import { AddModulesForm } from "../forms/add.modules";
import { UpdateModules } from "../forms/update.modules";
import { Loader } from "../elements/loader";
import { useModules } from "../../hooks/useModules";

const ModulesTable = () => {
  const navigate = useNavigate();
  const { data: modules } = useModules();

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

  console.log(modules[1].is_published);

  return (
    <Box>
      {/* {isValidating && <LinearProgress color="secondary" />} */}
      <Box sx={{ m: 2 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AddModulesForm open={open} handleClose={handleClose} />
          {/* <Confirm /> */}
        </motion.div>
        <UpdateModules
          open={updateOpen}
          handleClose={() => setUpdateOpen(false)}
          updateName={updateName}
          updateDescription={updateDescription}
          handleUpdate={async () => {
            await handleUpdate();
          }}
          setUpdateName={setUpdateName}
          setUpdateDescription={setUpdateDescription}
        />

        <Grid container spacing={2}>
          {modules?.map((module) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <ModuleCard
                module={module}
                onSelect={() => {
                  navigate(`/questions/${module.id}`);
                }}
                onEdit={() => {
                  setModuleIdToUpdate(module.id);
                  setUpdateName(module.name);
                  setUpdateDescription(module.description);
                  setUpdateOpen(true);
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
