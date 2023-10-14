import {
    FormControl,
    FormLabel,
    Button,
    InputLabel,
    FormHelperText,
    Input,
    styled,
    Box,
} from "@mui/material";

const StyledForm = styled("form")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
});

const FormContainer = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #3498db, #8e44ad)",
});

const FormLabelStyle = {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
};

const FormControlStyle = {
    width: "100%",
    marginBottom: "16px",
};

const ButtonStyle = {
    backgroundColor: "#3aa767",
    color: "#fff",
    borderRadius: "4px",
    fontWeight: "bold",
    width: "50%",
};

export const LoginForm = () => {
    return (
        <FormContainer>
            <StyledForm>
                <FormLabel sx={FormLabelStyle}>Welcome Back</FormLabel>

                <FormControl sx={FormControlStyle}>
                    <InputLabel htmlFor="email_input">Email</InputLabel>
                    <Input id="email_input" type="email" />
                </FormControl>
                <FormControl sx={FormControlStyle}>
                    <InputLabel htmlFor="password_input">Password</InputLabel>
                    <Input id="password_input" type="password" />
                </FormControl>
                <FormHelperText
                    id="login_form_helper-text"
                    sx={{ textAlign: "center", color: "#888", marginBottom: 1 }}
                >
                    We'll never share your email and password.
                </FormHelperText>
                <Button type="submit" sx={ButtonStyle}>
                    Log In
                </Button>
            </StyledForm>
        </FormContainer>
    );
};
