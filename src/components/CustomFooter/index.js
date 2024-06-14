import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  ButtonIcon,
  Content,
  CustomIcon,
  FooterContainer,
  FooterContentRoute,
  FooterContentTerms,
  LineStyled,
  LinksContainer,
  LinksContent,
  LinksText,
  SocialIcons,
} from "./index.style";
import Link from "next/link";

function Customfooter() {
  const toFacebook = () => {
    window.open("https://www.facebook.com", "_blank");
  }

  const toInstagram = () => {
    window.open("https://www.instagram.com", "_blank");
  }


  return (
    <>
      <FooterContainer>
        <FooterContentRoute>
          
        </FooterContentRoute>
        <LineStyled />
        <FooterContentTerms>
          <div style={{ marginLeft: "40px" }}>
            <span>alejandro@gmail.com</span>
          </div>
          <div>© 2024 F1 Blog Inc.</div>
        </FooterContentTerms>
      </FooterContainer>
    </>
  );
}

export default Customfooter;
