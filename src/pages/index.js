import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Skeleton } from "@mui/material";
import {
  GridContainer,
  GridWelcome,
  Welcome,
  GridImage,
  Background,
  ImgStyled,
  CharacteristicsContainer,
  GridContainerCharacteristics,
  AboutUsContainer,
  CenterContainer,
  GridContainerAboutUs,
  Container,
} from "@/styles/Index.style";
import CustomFooter from "@/components/CustomFooter";
import { comment } from "@/constants";

const Home = () => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const emailRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    setIsLoggedIn(!!authToken);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % comment.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    const email = emailRef.current.textContent;
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = email;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    setTooltipOpen(true);
    setTimeout(() => {
      setTooltipOpen(false);
    }, 2000);
  };

  const loading = () => {
    return (
      <div>
        <div
          style={{
            padding: "150px 0px 50px 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridColumnGap: "150px",
            marginBottom: "100px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              marginLeft: "92px",
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              height={400}
              width={500}
            />
          </div>
          <div>
            <Skeleton variant="rounded" animation="wave" height={400} />
          </div>
        </div>
        <CharacteristicsContainer
          style={{ background: "none", height: "560px" }}
        >
          <GridContainerCharacteristics>
            <Skeleton
              variant="rounded"
              animation="wave"
              height={200}
              width={500}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={200}
              width={500}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={200}
              width={500}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              height={200}
              width={500}
            />
          </GridContainerCharacteristics>
        </CharacteristicsContainer>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "100px",
              background: "#000",
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              height={40}
              width={800}
              background="#000"
            />
          </div>
          <GridContainerAboutUs>
            <AboutUsContainer>
              <Skeleton
                variant="rounded"
                animation="wave"
                height={400}
                width={800}
              />
            </AboutUsContainer>
            <CenterContainer>
              <Skeleton
                variant="rounded"
                animation="wave"
                height={400}
                width={800}
              />
            </CenterContainer>
          </GridContainerAboutUs>
        </Container>
        <Container>
          <GridContainerAboutUs>
            <AboutUsContainer>
              <Skeleton
                variant="rounded"
                animation="wave"
                height={400}
                width={800}
              />
            </AboutUsContainer>
            <CenterContainer>
              <Skeleton
                variant="rounded"
                animation="wave"
                height={400}
                width={800}
              />
            </CenterContainer>
          </GridContainerAboutUs>
        </Container>
        <Container style={{ marginBottom: "150px" }}>
          <CenterContainer>
            <Skeleton
              variant="rounded"
              animation="wave"
              height={600}
              width={700}
            />
          </CenterContainer>
        </Container>
      </div>
    );
  };

  if (isLoading) return loading();

  return (
    <div>
      <GridContainer style={{ background: "#000" }}>
        <GridWelcome>
          <Welcome>
            <h1 style={{ color: "#fff" }}>
              Enterate de todo acerca de las <span>Carreras</span> más importantes del momento
            </h1>
            <p>El automovilismo se esta apoderando de las redes!!!</p>
          </Welcome>
        </GridWelcome>
        <GridImage>
          <Background />
          <ImgStyled src="/img/logo.jpg" />
        </GridImage>
      </GridContainer>
      
      <CustomFooter />
    </div>
  );
};

export default Home;
