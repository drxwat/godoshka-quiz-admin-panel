import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Box,
} from "@mui/material";
import { useModules } from "../../hooks/useModules";
import { AddModulesForm } from "../Forms/add.modules";
import { useDeleteModule } from "../../hooks/useDeleteModule";
import { useState } from "react";
import { Confirm } from "../Forms/confirm";
import { UpdateModules } from "../Forms/update.modules";
import { useUpdateModule } from "../../hooks/useUpdateModule";
export const ModulesTable = () => {
  const { confirmOpen, setConfirmOpen, setModuleIdToDelete, handleDelete } =
    useDeleteModule();
  const { modules, refreshModules } = useModules();
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

  return (
    <Box>
      <AddModulesForm
        open={open}
        handleClose={handleClose}
        refreshModules={refreshModules}
      />
      <Confirm
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        handleConfirm={async () => {
          await handleDelete();
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Updated</TableCell>
            <TableCell
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  width: "33%",
                }}
                onClick={() => handleOpen()}
              >
                Добавить модуль
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.map((module) => (
            <TableRow key={module.id}>
              <TableCell>{module.name}</TableCell>
              <TableCell>{module.description}</TableCell>
              <TableCell>{module.created_at}</TableCell>
              <TableCell>{module.updated_at}</TableCell>
              <TableCell>
                <Button
                  sx={{
                    width: "33%",
                  }}
                >
                  Перейти
                </Button>
                <Button
                  sx={{
                    width: "33%",
                  }}
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
                  sx={{
                    width: "33%",
                  }}
                  onClick={() => {
                    setModuleIdToDelete(module.id);
                    setConfirmOpen(true);
                  }}
                >
                  Удалить
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
