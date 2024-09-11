import styled from "styled-components";

const Container = styled.div`
    padding: 0 48px 40px 48px;
    display: flex;
    flex-direction: column;
`;

const MainBodyContainer = ({children}) => {
    return (
        <Container id="main-body-container" className="gap-16">
            {children}
        </Container>
    );
}

export default MainBodyContainer;
