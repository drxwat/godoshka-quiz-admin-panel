// import {
//   Dialog,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   DialogContentText,
//   Box,
// } from "@mui/material";
// import { useAddQuestion } from "../../hooks/useAddQuestion";

// interface AddUpdateQuestionProps {
//   formLabel: string;
//   open: boolean;
//   close: () => void;
//   refreshQuestion: () => void;
// }

// export const AddUpdateQuestion: React.FC<AddUpdateQuestionProps> = ({
//   open,
//   formLabel,
//   close,
//   refreshQuestion,
// }) => {
//   const {
//     setQuestion,
//     setQuestionTime,
//     hanldeSave,
//     handleFieldChange,
//     answers,
//   } = useAddQuestion();

//   return (
//     <Dialog open={open}>
//       <form
//         onSubmit={async () => {
//           await hanldeSave();
//           close();
//           refreshQuestion();
//         }}
//       >
//         <DialogContent>
//           <DialogContentText sx={{ textAlign: "center", marginBottom: 1 }}>
//             {formLabel}
//           </DialogContentText>
//           <TextField
//             label="Текст вопроса"
//             fullWidth
//             onChange={(event) => {
//               setQuestion(event.target.value);
//             }}
//             sx={{ marginBottom: 1 }}
//           />
//           <TextField
//             label="Время на ответ"
//             defaultValue={20}
//             onChange={(event) => {
//               setQuestionTime(+event.target.value);
//             }}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogContentText sx={{ textAlign: "center" }}>
//           Варианты ответов:
//         </DialogContentText>
//         <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//           {answers.map((answer, index) => (
//             <Box key={index} sx={{ width: "50%" }}>
//               <DialogContent>
//                 <TextField
//                   label={`Ответ ${index + 1}`}
//                   fullWidth
//                   onChange={(event) => {
//                     handleFieldChange(index, "text", event.target.value);
//                   }}
//                 />

//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       onChange={(event) => {
//                         handleFieldChange(index, "text", event.target.checked);
//                       }}
//                     />
//                   }
//                   label="Верный ответ"
//                 />
//               </DialogContent>
//             </Box>
//           ))}
//         </Box>

//         <DialogActions>
//           <Button color="primary" onClick={close}>
//             Отмена
//           </Button>
//           <Button color="primary" type="submit">
//             Сохранить
//           </Button>
//         </DialogActions>
//       </form>
//     </Dialog>
//   );
// };
