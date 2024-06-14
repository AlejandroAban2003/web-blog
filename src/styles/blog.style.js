import styled from "@emotion/styled";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const CenterContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const BlogPost = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImgStyled = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

export const Sidebar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SidebarPost = styled(BlogPost)`
  width: 48%;
`;

export const MainContent = styled(BlogPost)`
  margin-bottom: 20px;
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const PostTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 10px 0;
`;

export const PostContent = styled.p`
  font-size: 1rem;
  color: #333;
`;

export const PostDate = styled.p`
  font-size: 0.9rem;
  color: #777;
  margin-top: auto;
`;

export const FormContainer = styled.div`
  width: 90%;
  height: 40%;
  display: block;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 400px) {
    width: 300px;
  }
`;

export const FormTitle = styled.h1`
  color: #261704;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: flex;
  witdh:80%;
  flex-direction: column;
  color: #3c3c3c;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 5px;
`;

export const FormTextarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 5px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #f27d16;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #d96511;
  }
`;
