import styled from "styled-components";

const Container = styled.div`
    padding: 16px 48px;
    display: flex;
    flex-direction: column;
`;

const MainBodyContainer = ({children, ...rest}) => {
    return (
        <Container id="main-body-container" {...rest}>
            {children}
        </Container>
    );
}

export default MainBodyContainer;
