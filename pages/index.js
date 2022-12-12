// import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
// import axios from "axios";
import {
  InputGroup,
  Col,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import Link from "next/link";

export default function Home() {
  const initialFormState = {
    automationUrl: "",
    mute: false,
    chromePath: "",
    tryLoggedIn: false,
    // username: "",
    // password: "",
    formStage: "muteOrNot",
  };

  const [formState, updateFormState] = useState(initialFormState);

  const {
    mute,
    automationUrl,
    tryLoggedIn,
    // username,
    // password,
    chromePath,
    formStage,
  } = formState;

  const handleChange = (e) => {
    updateFormState(() => ({
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  };
  const handleClick = (name, nextValue) => {
    updateFormState(() => ({ ...formState, [name]: nextValue }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const queries = {
        automationYoutubeUrl: automationUrl,
        mute: mute,
        chromePath: chromePath,
      };

      const response = await fetch(
        `api/next-video?automationYoutubeUrl=${automationUrl}&mute=${mute}&chromePath=${chromePath}`,
        {
          method: "POST",
          body: JSON.stringify(queries),
          // tryLoggedIn: tryLoggedIn,
          // username: username,
          // password: password,
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  console.log("formState :", formState);
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
                - Suggestion for chrome path :{" "}
                <Button
                // as={Link}
                // onClick={()=> ()}
                // /Applications/Google
                // Chrome.app/Contents/MacOS/Google Chrome
                >
                  MacOS
                </Button>
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
