import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

interface IModules {
  id: number;
  created: string;
  updated: string;
  name: string;
  description: string;
}

const modulesArr: IModules[] = [
  {
    id: 1,
    created: "yesterday",
    updated: "today",
    name: "modules",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 2,
    created: "yesterday",
    updated: "today",
    name: "modules",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    created: "yesterday",
    updated: "today",
    name: "modules",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    created: "yesterday",
    updated: "today",
    name: "modules",
    description: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 5,
    created: "yesterday",
    updated: "today",
    name: "modules",
    description: "Lorem ipsum dolor sit amet.",
  },
];

export const ModulesTable = () => {
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
        {modulesArr.map((module) => (
          <TableRow key={module.id}>
            <TableCell>{module.id}</TableCell>
            <TableCell>{module.created}</TableCell>
            <TableCell>{module.updated}</TableCell>
            <TableCell>{module.name}</TableCell>
            <TableCell>{module.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
