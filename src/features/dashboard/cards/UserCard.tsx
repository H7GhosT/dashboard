import React from "react";

import { User } from "types";
import { PaddingXY, Surface, Container, Button, Icon } from "components/common";
import { CardProps } from "../types";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";

export function UserCard({ data, onEdit }: CardProps<User>) {
  const fromAdmin = useContext(UserContext).user?.permission == "admin";
  return (
    <Container size="s" fixed>
      <Surface elevation={2}>
        <PaddingXY className="flex align-center space-between" x={2} y={1}>
          <div>
            <div>
              <span className="bold">{data.name}</span> -{" "}
              <span className="small">{data.permission}</span>
            </div>
            <div className="text-gray small bold">{data.email}</div>
            {fromAdmin ? (
              <div className="small">
                Password: <span className="text-gray">{data.password}</span>
              </div>
            ) : (
              ""
            )}
          </div>
          {fromAdmin ? (
            <Button theme="info" variant="text" onClick={onEdit}>
              <Icon>edit</Icon>
            </Button>
          ) : (
            ""
          )}
        </PaddingXY>
      </Surface>
    </Container>
  );
}
