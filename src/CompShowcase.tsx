import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import { TextField, PasswordTextField } from "./components/text-field";
import {
  Container,
  Icon,
  Title,
  Surface,
  VSpace,
  HSpace,
  PaddingXY,
  FullView,
  Alert,
  Button,
  Modal,
} from "./components/common";

export function CompShowcase() {
  const [inpValue, setInpValue] = useState("default");
  const [pass, setPass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <FullView style={{ background: "#20a0b025" }}>
        <Container size="s">
          <VSpace amount={3} />
          <Surface elevation={4} style={{ background: "white" }}>
            <PaddingXY x={2} y={2}>
              <Title>Title</Title>
              <VSpace amount={1} />
              <Button variant="text">Button</Button>
              <HSpace amount={1} />
              <Button variant="text">
                Button
                <HSpace amount={1} />
                <Icon>logout</Icon>
              </Button>
              <HSpace amount={1} />
              <Button variant="text" theme="secondary">
                Button
              </Button>
              <HSpace amount={1} />
              <Button variant="text" theme="error">
                Button
              </Button>
              <HSpace amount={1} />
              <Button variant="text" theme="info">
                Button
              </Button>
              <HSpace amount={1} />
              <Button variant="text" theme="warning">
                Button
              </Button>
              <HSpace amount={1} />
              <Button variant="text" theme="success">
                Button
              </Button>
              <HSpace amount={1} />
              <Button variant="text" disabled={true}>
                Button
              </Button>
              <VSpace amount={1} />
              <Button variant="text" style={{ width: "100%" }}>
                Button
              </Button>
              <VSpace amount={1} />
              <Button>Button</Button>
              <HSpace amount={1} />
              <Button>
                Button
                <HSpace amount={1} />
                <Icon>logout</Icon>
              </Button>
              <HSpace amount={1} />
              <Button theme="secondary">Button</Button>
              <HSpace amount={1} />
              <Button theme="error">Button</Button>
              <HSpace amount={1} />
              <Button theme="info">Button</Button>
              <HSpace amount={1} />
              <Button theme="warning">Button</Button>
              <HSpace amount={1} />
              <Button theme="success">Button</Button>
              <HSpace amount={1} />
              <Button disabled={true}>Button</Button>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Your name"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
                variant="outlined"
              />
              <div>{inpValue}</div>
              <VSpace amount={1} />
              <PasswordTextField
                label="Password"
                value={pass}
                placeholder="Your password"
                onInput={setPass}
              />
              <div>{pass}</div>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Your name"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
                error
              />
              <VSpace amount={1} />
              <PasswordTextField
                label="Password"
                value={pass}
                placeholder="Your password"
                onInput={setPass}
                error
                variant="outlined"
              />
              <VSpace amount={1} />
              <Link to="/path">Cool link</Link>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Multiline"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
                variant="outlined"
                multiline={true}
              />
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Multiline"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
                variant="underlined"
                multiline={true}
                error
              />
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Multiline"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                variant="underlined"
                multiline={true}
                placeholder="Cool placeholder"
              />
              <VSpace amount={1} />
              <Alert severity="error">
                <div>
                  <b>Bold title</b>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quidem
              </Alert>
              <Alert severity="warning">
                <div>
                  <b>Bold title</b>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quidem earum laboriosam voluptatum qui natus tempora at repellat
                odio vel commodi doloremque, ipsam aut dolor!
              </Alert>
              <Alert severity="info">
                <div>
                  <b>Bold title</b>
                </div>
                Lorem ipsum dolor sit amet
              </Alert>
              <Alert severity="success">
                <div>
                  <b>Bold title</b>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
                quidem earum laboriosam voluptatum qui natus tempora at repellat
                odio vel commodi doloremque, ipsam aut dolor!
              </Alert>
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
              <Modal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
              >
                <Container size="s">
                  <PaddingXY x={4} y={2}>
                    <Title>Hello world</Title>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloremque voluptas eos aliquam omnis velit cupiditate
                      facere commodi dolorem. Itaque, vero.
                    </p>
                  </PaddingXY>
                </Container>
              </Modal>
            </PaddingXY>
          </Surface>
        </Container>
      </FullView>
    </BrowserRouter>
  );
}
