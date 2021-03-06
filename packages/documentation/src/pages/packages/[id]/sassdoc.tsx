import React from "react";
import { NextFC } from "next";

import { SCSS_PACKAGES } from "constants/packages";
import NotFoundPage from "components/NotFoundPage";
import SassDocInProgress from "components/InProgress/SassDoc";
import { qsToString } from "utils/routes";

interface SassDocProps {
  sassdoc: {} | null;
}

const SassDoc: NextFC<SassDocProps> = ({ sassdoc }) =>
  sassdoc === null ? <NotFoundPage /> : <SassDocInProgress />;

SassDoc.getInitialProps = async ({ query }): Promise<SassDocProps> => {
  const name = qsToString(query.id);
  const sassdoc = SCSS_PACKAGES.includes(name) ? {} : null;
  // const sassdoc = await import(`../../../sassdocs/${query.id}`)
  //   .then(mod => mod.default)
  //   .catch(() => null);

  return { sassdoc };
};

export default SassDoc;
