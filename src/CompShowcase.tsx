import React, { useState } from "react";
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
  TextButton,
  FilledButton,
} from "./components/common";

import { BrowserRouter, Link } from "react-router-dom";
import { Modal } from "./components/modal/modal";

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
              <TextButton>Button</TextButton>
              <HSpace amount={1} />
              <TextButton>
                Button
                <HSpace amount={1} />
                <Icon>logout</Icon>
              </TextButton>
              <HSpace amount={1} />
              <TextButton theme="secondary">Button</TextButton>
              <HSpace amount={1} />
              <TextButton theme="error">Button</TextButton>
              <HSpace amount={1} />
              <TextButton theme="info">Button</TextButton>
              <HSpace amount={1} />
              <TextButton theme="warning">Button</TextButton>
              <HSpace amount={1} />
              <TextButton theme="success">Button</TextButton>
              <HSpace amount={1} />
              <TextButton disabled={true}>Button</TextButton>
              <VSpace amount={1} />
              <TextButton style={{ width: "100%" }}>Button</TextButton>
              <VSpace amount={1} />
              <FilledButton>Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton>
                Button
                <HSpace amount={1} />
                <Icon>logout</Icon>
              </FilledButton>
              <HSpace amount={1} />
              <FilledButton theme="secondary">Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton theme="error">Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton theme="info">Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton theme="warning">Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton theme="success">Button</FilledButton>
              <HSpace amount={1} />
              <FilledButton disabled={true}>Button</FilledButton>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Your name"
                value={inpValue}
                onInput={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
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
              />
              <VSpace amount={1} />
              <Link to="/path">Cool link</Link>
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
              <FilledButton onClick={() => setModalOpen(true)}>
                Open modal
              </FilledButton>
              <Modal
                open={modalOpen}
                onClose={() => {
                  setModalOpen(false);
                }}
              >
                something
              </Modal>
            </PaddingXY>
          </Surface>
        </Container>
      </FullView>
    </BrowserRouter>
  );
}
