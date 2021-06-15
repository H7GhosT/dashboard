import React from "react";
import { useQuery } from "react-query";

import { Article } from "types";
import {
  PaddingXY,
  Surface,
  Container,
  HSpace,
  VSpace,
} from "components/common";
import { getAllUsers } from "api";
import { CardProps } from "./types";

export function ArticleCard({ fromAdmin, data }: CardProps<Article>) {
  const { data: users } = useQuery("users", getAllUsers);
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
          <div className="title">{data.title}</div>
          <HSpace amount={1} />
          <hr />
          <VSpace amount={1} />
          <pre style={{ whiteSpace: "pre-wrap" }}>{data.content}</pre>
        </PaddingXY>
      </Surface>
    </Container>
  );
}
