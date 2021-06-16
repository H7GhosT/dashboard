import React, { useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";

import {
  TextField,
  PasswordTextField,
  SelectTextField,
} from "./components/text-field";
import {
  Container,
  Icon,
  Surface,
  VSpace,
  HSpace,
  PaddingXY,
  Alert,
  Button,
  Modal,
  SelectList,
  Loader,
} from "./components/common";

export function CompShowcase() {
  const [inpValue, setInpValue] = useState("default");
  const [pass, setPass] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [selected, setSelected] = useState("default");

  return (
    <BrowserRouter>
      <div className="full-vh flex" style={{ background: "#20a0b025" }}>
        <div className="side-bar">
          <Container size={300} fixed>
            <VSpace amount={10} />
            <PaddingXY x={1} y={0}>
              <div className="title">Dashboard</div>
            </PaddingXY>
            <VSpace amount={1} />
            <SelectList
              selected={selected}
              items={new Array(4).fill(null).map((_, i) => ({
                key: "" + i,
                value: (
                  <div className="flex space-between align-center">
                    <span>List item {i}</span>
                    <Icon>download</Icon>
                  </div>
                ),
              }))}
              onSelect={setSelected}
            />
          </Container>
        </div>
        <Container size="s">
          <Loader size="s" />
          <Loader size="m" />
          <Loader size="l" />
          <VSpace amount={3} />
          <Surface elevation={4} style={{ background: "white" }}>
            <PaddingXY x={2} y={2}>
              <div className="title">Title</div>
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
              <SelectTextField
                label="Your name"
                onSelect={setSelected}
                icon={<Icon>person_outline</Icon>}
                variant="outlined"
                items={new Array(4).fill(null).map((_, i) => ({
                  key: "" + i,
                  value: "List item " + i,
                }))}
                selected={selected}
              />
              <VSpace amount={1} />
              <SelectTextField
                label="Your name"
                onSelect={setSelected}
                icon={<Icon>person_outline</Icon>}
                items={new Array(4).fill(null).map((_, i) => ({
                  key: "" + i,
                  value: "List item " + i,
                }))}
                selected={selected}
              />
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
                <Container size="m">
                  <PaddingXY x={4} y={2}>
                    <div className="title">Hello world</div>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloremque voluptas eos aliquam omnis velit cupiditate
                      facere commodi dolorem. Itaque, vero.
                      <Button onClick={() => setModal2Open(true)}>
                        Open modal
                      </Button>
                    </p>
                  </PaddingXY>
                </Container>
              </Modal>
              <Modal
                open={modal2Open}
                onClose={() => {
                  setModal2Open(false);
                }}
              >
                <Container size="s">
                  <PaddingXY x={4} y={2}>
                    <div className="title">Hello world</div>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Doloremque voluptas eos aliquam omnis velit cupiditate
                      facere commodi dolorem. Itaque, vero.
                    </p>
                  </PaddingXY>
                </Container>
              </Modal>
              <VSpace amount={3} />
            </PaddingXY>
          </Surface>
        </Container>
      </div>
    </BrowserRouter>
  );
}
