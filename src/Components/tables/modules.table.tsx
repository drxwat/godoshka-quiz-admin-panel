import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useModules } from "../../hooks/useModules";

export const ModulesTable = () => {
  const { modules } = useModules();

  return (
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
  );
};
