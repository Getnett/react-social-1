import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar({ setOpenForm }) {
  return (
    <Menu icon inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt="logo" />
        </Menu.Item>
        <Menu.Item name="Events" />
        <Menu.Item>
          <Button
            onClick={() => setOpenForm()}
            positive
            inverted
            content="Create Event"
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Button basic inverted content="Login" />
          <Button
            basic
            inverted
            content="Register"
            style={{ marginLeft: ".5em" }}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
