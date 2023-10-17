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
import { useState } from "react";

export const ModulesTable = () => {
  const { modules } = useModules();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <AddModulesForm open={open} handleClose={handleClose} />;
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
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
              <TableCell>{module.id}</TableCell>
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
                >
                  Изменить
                </Button>
                <Button
                  sx={{
                    width: "33%",
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
