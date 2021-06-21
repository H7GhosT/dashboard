import React, { useState, useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";

import { Article } from "types";
import { getAllArticles, updateArticle, addArticle } from "api";
import { ArticleCard } from "../cards";
import {
  Button,
  Loader,
  Icon,
  Alert,
  Space,
  Row,
  Col,
  useForm,
} from "ebs-design";
import { ArticleModal } from "../modals";
import { emptyArticle } from "types/utils";
import { UserContext } from "contexts/UserContext";
import { dateToInputFormat } from "../../../utils";

export function ArticleTab() {
  const {
    data: articles,
    isLoading: isArticlesLoading,
    isError: hasArticlesError,
  } = useQuery<Article[]>("articles", getAllArticles);

  return (
    <div>
      {hasArticlesError ? (
        <Alert type="error">Error loading articles</Alert>
      ) : !isArticlesLoading ? (
        <>
          <Row
            gy={3}
            // style={{ width: "50%", margin: "0 auto" }}
          >
            {articles?.map((a) => (
              <ArticleCard key={a.id} data={a} onEdit={() => {}} />
            ))}

            <Col size={12}>
              <Link to="/dashboard/articles/create">
                <Button>New article</Button>
              </Link>
            </Col>
          </Row>
        </>
      ) : (
        <Loader loading={true} />
      )}
    </div>
  );
}
