import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import User from "@/domain/entities/user";
import UserRepo from "@/infraestructure/implementation/httpRequest/axios/UserRepo";
import SignUpUserUseCase from "@/application/usecases/userUseCase/SignUpUserCase";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "@/styles/Index.style";
import RoleRepo from "@/infraestructure/implementation/httpRequest/axios/RoleRepo";
import GetAllRoleRepo from "@/application/usecases/roleUseCase/GetAllRoleUseCase";
import withAuth from "@/components/Authenticated";

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

const HeaderSection = styled.div`
  margin-bottom: 20px;
`;

const SignUp = () => {
  const router = useRouter();
  const [roles, setRoles] = useState([]);
  const [isShowPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      id_rol: "admin", // Establece el rol por defecto aquí
    },
  });

  const fetchRoles = async () => {
    const roleRepo = new RoleRepo();
    const getAllRol = new GetAllRoleRepo(roleRepo);
    try {
      const response = await getAllRol.run();
      const rolesWithUpdatedNames = response.roles.map((role) => ({
        ...role,
        name: getRoleLabel(role.name),
      }));
      setRoles(rolesWithUpdatedNames);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const onSignUpSubmit = async (data) => {
    const user = new User(null, data.name, data.id_rol, data.email, data.password); // Utiliza data.id_rol para enviar el rol seleccionado
    const userRepo = new UserRepo();
    const signUpUseCase = new SignUpUserUseCase(userRepo);

    try {
      const signUpResponse = await signUpUseCase.run(user);
      console.log(signUpResponse);
      router.push("/login");
    } catch (error) {
      console.error("Error durante el registro:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!isShowPassword);
  };

  return (
    <Container>
      <FormContainer>
        <Icon icon={faAngleLeft} onClick={() => router.push("/user")} />
        <HeaderSection>
          <h1>Registro de usuarios</h1>
        </HeaderSection>
        <form onSubmit={handleSubmit(onSignUpSubmit)}>
          <CustomInput
            label="Nombre"
            name="name"
            control={control}
            fullWidth
          />
          {/* No se requiere el bloque de checkboxes */}
          <CustomInput
            label="Correo electrónico"
            name="email"
            control={control}
            fullWidth
          />
          <CustomInput
            type={isShowPassword ? "text" : "password"}
            label="Contraseña"
            name="password"
            control={control}
            fullWidth
            icon={
              isShowPassword ? (
                <EyeIcon icon={faEyeSlash} onClick={togglePasswordVisibility} />
              ) : (
                <EyeIcon icon={faEye} onClick={togglePasswordVisibility} />
              )
            }
          />
          <CustomButton buttonText="Aceptar" type="submit" fullWidth />
        </form>
      </FormContainer>
    </Container>
  );
};

export default withAuth(SignUp);
