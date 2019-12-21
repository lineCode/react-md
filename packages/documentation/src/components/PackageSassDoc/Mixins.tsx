import React, { FC } from "react";
import { FormattedMixinItemRecord } from "utils/sassdoc";
import SectionTitle from "./SectionTitle";
import Mixin from "./Mixin";

export interface MixinsProps {
  packageName: string;
  mixins: FormattedMixinItemRecord;
}

const Mixins: FC<MixinsProps> = ({ packageName, mixins }) => (
  <>
    <SectionTitle packageName={packageName} type="Mixins" />
    {Object.values(mixins).map(mixin => (
      <Mixin key={mixin.name} {...mixin} />
    ))}
  </>
);

export default Mixins;
