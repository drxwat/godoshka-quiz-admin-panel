import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ModuleCard } from "./module.card";
import { AddModulesForm } from "./forms/add.update.modules";
import { Loader } from "./elements/loader";
import moduleService from "../api/services/module.service";
import { useFetchData } from "../hooks/useFetchData";
import { ModuleWithQuestions } from "../core/client/types";
import { QueryKeys } from "../helpers/types";
import { AddBtn } from "./elements/addBtn";

const ModulesTable = () => {
  const navigate = useNavigate();
  const { data: modules } = useFetchData(
    QueryKeys.modules,
    moduleService.getAllModulesWithQuestions,
  );

  interface IModuleFormState {
    open: boolean;
    data?: ModuleWithQuestions;
  }

  const [show, setShow] = useState<IModuleFormState>({
    open: false,
  });

  const handleOpen = () => {
    setShow({
      open: true,
    });
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
            open={show.open}
            handleClose={() => setShow({ open: false })}
            module={show.data}
          />
          {/* <Confirm /> */}
        </motion.div>

        <Grid container spacing={2}>
          {modules?.map((module) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={module.id}>
              <ModuleCard
                module={module}
                onSelect={() => {
                  navigate(`/questions/${module.id}`);
                }}
                onEdit={() => {
                  setShow({
                    open: true,
                    data: module,
                  });
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <AddBtn handleOpen={handleOpen} />
    </Box>
  );
};

export default ModulesTable;
