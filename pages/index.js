// import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import axios from "axios";
import {
  InputGroup,
  Col,
  Form,
  FormControl,
  Button,
  FloatingLabel,
  Card,
  Container,
  NavLink,
  Row,
} from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  const initialFormState = {
    automationUrl: "",
    mute: false,
    chromePath: "",
    tryLoggedIn: false,
    username: "",
    password: "",
    formStage: "muteOrNot",
  };
  const [formState, updateFormState] = useState(initialFormState);
  const {
    tryLoggedIn,
    mute,
    automationUrl,
    username,
    password,
    chromePath,
    formStage,
  } = formState;

  const handleChange = (e) => {
    if ("checked" in e.target) {
      updateFormState(() => ({
        ...formState,
        [e.target.name]: e.target.checked,
      }));
    }
    if ("value" in e.target) {
      updateFormState(() => ({
        ...formState,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleClick = (name, nextValue) => {
    updateFormState(() => ({ ...formState, [name]: nextValue }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:6807/next-video?automationYoutubeUrl=${automationUrl}&mute=${mute}&chromePath=${chromePath}&username=${username}&password=${password}&tryLoggedIn=${tryLoggedIn}`,
        {
          automationYoutubeUrl: automationUrl,
          mute: mute,
          chromePath: chromePath,
          // tryLoggedIn: tryLoggedIn,
          // username: username,
          // password: password,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <strong>Youtube view-booster Bot v1</strong>
        </h1>

        {formStage === "init" && (
          <>
            <h2 className="text-muted">give it a first shot not logged in ?</h2>
            <Form.Check
              type="switch"
              id="custom-switch1"
              onChange={(e) => handleChange(e)}
              checked={tryLoggedIn}
              label={tryLoggedIn ? "logged-in" : "un-logged"}
              value={tryLoggedIn && tryLoggedIn}
              name={"tryLoggedIn"}
              disabled
            />
            <p className="text-muted">
              Since I don&apos;t know yet if the unsigned in views are counting,
              <br /> this stays an option. <br />
              <a href="https://temp-mail.org/en/">
                create a temporary email
              </a>{" "}
              account
            </p>
            <Button
              className="mb-2"
              onClick={(e) => handleClick(e.target.name, "muteOrNot")}
              name={"formStage"}
            >
              Next
            </Button>
          </>
        )}
        {formStage === "muteOrNot" && (
          <>
            <h2 className="text-muted">Listen to the playlist ?</h2>
            <Form.Check
              type="switch"
              id="custom-switch2"
              className="mb-4"
              checked={mute}
              onChange={(e) => handleChange(e)}
              value={mute && mute}
              name={"mute"}
              label={mute ? "mute" : "un-mute"}
            />
            <Form.Group className="flex">
              {/* <Button
                className="mb-2"
                onClick={(e) => handleClick(e.target.name, "init")}
                name={"formStage"}
              >
                Prev
              </Button>{" "} */}
              <Button
                className="mb-2"
                onClick={(e) => handleClick(e.target.name, "final")}
                name={"formStage"}
              >
                Next
              </Button>
            </Form.Group>
          </>
        )}
        {formStage === "final" && (
          <>
            <Container fluid="sm">
              <h2 className="text-muted">before hand:</h2>
              <div className="text-muted">
                - make sure you are using a playlist link <br />- to support us
                click{" "}
                <Link
                  href=""
                  onClick={() =>
                    handleClick(
                      "automationUrl",
                      "https://www.youtube.com/watch?v=25akaOsg3fU&list=PLg16LtE0cYVIFYWsoWVCDkPzkAE5Jw6V-&index=1"
                    )
                  }
                >
                  here
                </Link>{" "}
                and use our link a couple of times 🙏
                <br />
                {tryLoggedIn &&
                  " - you may be asked a code (2 times max) from google on your phone repeat the process until it won't "}
                - Suggestion for mac chrome path :<br /> /Applications/Google
                Chrome.app/Contents/MacOS/Google Chrome
              </div>
            </Container>
            <br />
            <Form onSubmit={handleSubmit}>
              <Container fluid="sm">
                <Col xl="auto">
                  <InputGroup className="mb-4">
                    <InputGroup.Text>Youtube</InputGroup.Text>
                    <FormControl
                      className="bg-secondary bg-gradient text-white"
                      onChange={(e) => handleChange(e)}
                      name={"automationUrl"}
                      value={automationUrl && automationUrl}
                      id="inlineFormInputGroup"
                      type="url"
                      placeholder="playlist link"
                    />
                  </InputGroup>
                </Col>
                {tryLoggedIn ? (
                  <>
                    <Col xs="auto">
                      <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                        Username
                      </Form.Label>
                      <InputGroup className="mb-0">
                        <InputGroup.Text>@</InputGroup.Text>
                        <Form.Control
                          className="bg-secondary bg-gradient text-white"
                          type="email"
                          placeholder="Username"
                          onChange={handleChange}
                          name={"userName"}
                          // value={userName && userName}
                        />
                      </InputGroup>
                      <Form.Text>
                        <a href="https://temp-mail.org/en/">create</a> a temp
                        google account
                      </Form.Text>
                    </Col>
                    <Col xs="auto">
                      <InputGroup className="mb-4">
                        <InputGroup.Text>...</InputGroup.Text>
                        <FormControl
                          className="bg-secondary bg-gradient text-white"
                          type="password"
                          placeholder="Password"
                          onChange={handleChange}
                          name={"password"}
                          // value={password && password}
                        />
                      </InputGroup>
                    </Col>
                  </>
                ) : null}
                <Col md="auto">
                  <Form.Group className="mb-2">
                    <Form.Label className="text-muted">Chrom Path</Form.Label>
                    <Form.Control
                      id="inlineFormInput"
                      type="text"
                      className="bg-secondary bg-gradient text-white placeholder-white"
                      placeholder="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
                      // aria-aria-describedby="seconds"
                      onChange={(e) => handleChange(e)}
                      name={"chromePath"}
                      value={chromePath && chromePath}
                    />
                    {/* Verify, write &apos;chrome://version/&apos; in a new tab of
                    chrome then copy the value of: &apos;Executable Path&apos; */}
                  </Form.Group>
                </Col>
                <Form.Group xs="auto">
                  {/* <Col xs="auto"> */}
                  <Button
                    onClick={(e) => handleClick(e.target.name, "muteOrNot")}
                    name={"formStage"}
                    className="mb-2"
                  >
                    Prev
                  </Button>{" "}
                  <Button
                    type="submit"
                    value="Submit"
                    className="mb-2"
                    // onClick={(e) => handleSubmit(e)}
                  >
                    Launch Page
                  </Button>
                  {/* </Col> */}
                </Form.Group>
              </Container>
            </Form>{" "}
          </>
        )}
      </header>
    </div>
  );
}
