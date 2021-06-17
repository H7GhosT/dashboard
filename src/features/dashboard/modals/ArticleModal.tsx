import React from "react";

import { VSpace, Modal, Container, PaddingXY } from "components/common";
import { TextField } from "components/text-field";
import { Article } from "types";
import { ModalFormProps } from "./types";
import { dateToInputFormat } from "utils";

export interface ArticleModalProps extends ModalFormProps<Article> {
  hasDate?: boolean;
}
export function ArticleModal({
  data,
  setData,
  top,
  bottom,
  hasDate = false,
  ...modalProps
}: ArticleModalProps) {
  return (
    <Modal {...modalProps}>
      <Container size="m" fixed>
        <PaddingXY x={4} y={3}>
          {top}
          <VSpace amount={2} />
          <TextField
            variant="outlined"
            value={data?.title}
            type="text"
            onInput={(title) => setData((a) => ({ ...a!, title }))}
            label="Title"
          />
          <VSpace amount={1} />
          {hasDate ? (
            <>
              <TextField
                variant="outlined"
                value={dateToInputFormat(data?.dateCreated)}
                type="date"
                onInput={(date) =>
                  setData((a) => ({
                    ...a!,
                    dateCreated: new Date(date),
                  }))
                }
                label="Date created"
              />
              <VSpace amount={1} />
            </>
          ) : (
            ""
          )}

          <TextField
            variant="outlined"
            value={data?.content}
            type="text"
            multiline
            onInput={(content) =>
              setData((a) => ({
                ...a!,
                content,
              }))
            }
            label="Content"
          />
          <VSpace amount={1} />
          {bottom}
        </PaddingXY>
      </Container>
    </Modal>
  );
}
