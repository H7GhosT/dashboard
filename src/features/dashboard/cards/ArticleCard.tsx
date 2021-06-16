import React, { useContext } from "react";
import { useQuery } from "react-query";

import { Article } from "types";
import {
  PaddingXY,
  Surface,
  Container,
  HSpace,
  VSpace,
  Button,
  Icon,
} from "components/common";
import { getAllUsers } from "api";
import { CardProps } from "../types";
import { UserContext } from "contexts/UserContext";

export function ArticleCard({ data, onEdit }: CardProps<Article>) {
  const { data: users } = useQuery("users", getAllUsers);
  const fromAdmin = useContext(UserContext).user?.permission == "admin";

  return (
    <Container size="m">
      <Surface elevation={3}>
        <PaddingXY x={3} y={2}>
          <div>
            <span className="text-gray bold small">
              {users?.find((u) => u.id == data.authorId)?.name}
            </span>
            <HSpace amount={1} />
            <span className="small">{data.dateCreated.toDateString()}</span>
          </div>
          <div className="flex space-between align-center">
            <div className="title">{data.title}</div>
            <HSpace amount={1} />
            {fromAdmin ? (
              <Button theme="info" variant="text" onClick={onEdit}>
                <Icon>edit</Icon>
              </Button>
            ) : (
              ""
            )}
          </div>
          <HSpace amount={1} />
          <hr />
          <VSpace amount={1} />
          <pre style={{ whiteSpace: "pre-wrap" }}>{data.content}</pre>
        </PaddingXY>
      </Surface>
    </Container>
  );
}
