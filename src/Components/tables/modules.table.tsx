import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useModules } from "../../hooks/useModules";

export const ModulesTable = () => {
  const { modules } = useModules();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Updated</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {modules.map((module) => (
          <TableRow key={module.id}>
            <TableCell>{module.id}</TableCell>
            <TableCell>{module.created_at}</TableCell>
            <TableCell>{module.updated_at}</TableCell>
            <TableCell>{module.name}</TableCell>
            <TableCell>{module.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
