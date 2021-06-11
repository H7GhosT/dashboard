import React, { useState } from "react";
import { TextField, PasswordTextField } from "./components/text-field";

import {
  Container,
  Icon,
  Title,
  Surface,
  VSpace,
  HSpace,
  FullView,
  Alert,
  TextButton,
} from "./components/common";

import { BrowserRouter, Link } from "react-router-dom";
import { PaddingXY } from "./components/common/spaces";

export function CompShowcase() {
  const [inpValue, setInpValue] = useState("default");
  const [pass, setPass] = useState("");

  return (
    <BrowserRouter>
      <FullView style={{ background: "red" }}>
        <Container size="s">
          <Surface elevation={4}>
            <PaddingXY x={2} y={2}>
              <Title>Title</Title>
              <VSpace amount={1} />
              <TextButton>Button</TextButton>
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
              <VSpace amount={1} />
              <TextButton style={{ width: "100%" }}>Button</TextButton>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Your name"
                value={inpValue}
                inputHandler={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
              />
              <div>{inpValue}</div>
              <VSpace amount={1} />
              <PasswordTextField
                label="Password"
                value={pass}
                placeholder="Your password"
                inputHandler={setPass}
              />
              <div>{pass}</div>
              <VSpace amount={1} />
              <TextField
                type="text"
                label="Your name"
                value={inpValue}
                inputHandler={(v) => setInpValue(v)}
                icon={<Icon>person_outline</Icon>}
                error
              />
              <VSpace amount={1} />
              <PasswordTextField
                label="Password"
                value={pass}
                placeholder="Your password"
                inputHandler={setPass}
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
            </PaddingXY>
          </Surface>
        </Container>
      </FullView>
    </BrowserRouter>
  );
}
