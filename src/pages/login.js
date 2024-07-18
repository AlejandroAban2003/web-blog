import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "@/actions/userActions";
import SignInUserUseCase from "@/application/usecases/userUseCase/SignInUserCase";
import UserRepo from "@/infraestructure/implementation/httpRequest/axios/UserRepo";
import User from "@/domain/entities/user";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import CustomAlerts from "@/components/CustomAlerts";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("/img/fondo.jpg");
  background-size: cover;
`;

const FormContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  width: 500px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const EyeIcon = styled.span`
  cursor: pointer;
`;

const TextBelowButton = styled.div`
  margin-top: 10px;
`;

const RegisterLink = styled.a`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

const Login = () => {
  const route = useRouter();
  const dispatch = useDispatch();
  const [isShowPassword, setShowPassword] = useState(false);
  const [isError, setError] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    title: "",
    text: "",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = new User(null, null, null, data.email, data.password);
      const userRepo = new UserRepo(dispatch);
      const signInUseCase = new SignInUserUseCase(userRepo);
      const signInResponse = await signInUseCase.run(user);

      if (signInResponse && signInResponse.token) {
        dispatch(setUser(signInResponse));
        const encryptedToken = CryptoJS.AES.encrypt(
          signInResponse.token,
          "cookie-encrypted"
        ).toString();
        Cookies.set("authToken", encryptedToken, { expires: 1 / 24 });
        route.push("/");
      }
    } catch (error) {
      setTimeout(() => {
        setAlertInfo({
          show: true,
          title: "Ocurrió un Error Inesperado",
          text:
            `${error.message} - ${error.response.data.message}` ||
            "No se pudo completar el inicio de sesión.",
        });
      }, 1000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <Container>
      <FormContainer>
        <Image src="/img/Logo2.png" alt="logo" width={148} height={150} />
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Correo electrónico"
            name="email"
            control={control}
            fullWidth
          />
          <CustomInput
            label="Contraseña"
            name="password"
            control={control}
            fullWidth
            type={isShowPassword ? "text" : "password"}
            icon={
              isShowPassword ? (
                <EyeIcon
                  icon={faEyeSlash}
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeIcon icon={faEye} onClick={togglePasswordVisibility} />
              )
            }
          />
          <CustomButton buttonText="Entrar" fullWidth type="submit" />
          <TextBelowButton>
            <span>¿No tienes cuenta?</span>
            <RegisterLink onClick={() => route.push("/register")}>
              Crea una aquí
            </RegisterLink>
          </TextBelowButton>
        </form>
      </FormContainer>
      {alertInfo.show && (
        <CustomAlerts
          open={alertInfo}
          onClose={() => setAlertInfo({ show: false, title: "", text: "" })}
          title={alertInfo.title}
          text={alertInfo.text}
          acceptButton="Aceptar"
          error
          login
          onClickContinue={() => setAlertInfo({ show: false, title: "", text: "" })}
        />
      )}
    </Container>
  );
};

export default Login;
