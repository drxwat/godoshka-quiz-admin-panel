// import {
//   Table,
//   TableCell,
//   TableHead,
//   TableRow,
//   Button,
//   TableBody,
//   Box,
// } from "@mui/material";
// import { useQuestion } from "../../hooks/useQuestion";
// import { useState } from "react";
// import { AddUpdateQuestion } from "../forms/add.update.question";
// import { Confirm } from "../forms/confirm";

// export const QuestionsTable = () => {
//   const { questions, refreshQuestion } = useQuestion();
//   const [selectedQuestion, setSelectionQuestion] = useState<
//     { id: number; type: "delete" | "update" } | undefined
//   >();

//   return (
//     <Box>
//       <Confirm
//         open={selectedQuestion?.type === "delete"}
//         handleClose={() => setSelectionQuestion(undefined)}
//         handleConfirm={}
//       />
//       {selectedQuestion?.type === "update" && (
//         <AddUpdateQuestion
//           formLabel={
//             questionToEdit ? "Редкатировать вопрос" : "Добавить вопрос"
//           }
//           open={true}
//           questionId={selectedQuestion.id}
//           close={() => {
//             setSelectionQuestion(undefined);
//           }}
//           refreshQuestion={refreshQuestion}
//         />
//       )}
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Module ID</TableCell>
//             <TableCell>Question text</TableCell>
//             <TableCell>Created date</TableCell>
//             <TableCell>Updated date</TableCell>
//             <TableCell
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//               }}
//             >
//               <Button
//                 sx={{
//                   width: "50%",
//                 }}
//                 onClick={() => setOnOpen(true)}
//               >
//                 Добавить вопрос
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {questions.map((question) => {
//             return (
//               <TableRow key={question.id}>
//                 <TableCell>{question.module_id}</TableCell>
//                 <TableCell>{question.text}</TableCell>
//                 <TableCell>{question.created_at}</TableCell>
//                 <TableCell>{question.updated_at}</TableCell>
//                 <TableCell>
//                   <Button
//                     sx={{
//                       width: "50%",
//                     }}
//                     onClick={() => {
//                       setOnOpen(true);
//                       setQuestionToEdit(question.id);
//                     }}
//                   >
//                     Изменить
//                   </Button>
//                   <Button
//                     sx={{
//                       width: "33%",
//                     }}
//                     onClick={() => {
//                       setQuestionToEdit(question.id);
//                     }}
//                   >
//                     Удалить
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </Box>
//   );
// };
