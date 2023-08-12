import React, { FC } from "react";

interface MathPowPros {
  base: string;
  exponent: string;
}

export const MathPow: FC<MathPowPros> = ({ base, exponent }) => {
  const mathString = `<math xmlns = "http://www.w3.org/1998/Math/MathML">
     <msup><mi>${base}</mi><mn>${exponent}</mn></msup>
    </math>`;
  return <><span dangerouslySetInnerHTML={{__html: mathString}}></span></>;
};
