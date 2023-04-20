import React, { useEffect, useRef, useState } from "react";

import { NextPage } from "next";
import cn from "classnames";

import { SelectedStigmaProps } from "@/components/Stigma/SelectedStigma/SelectedStigma.props";
import styles from "../Stigma.module.css";
import { StigmaDescription } from "@/components/Stigma/StigmaDescription";
import Image from "next/image";

export const SelectedStigma: NextPage<SelectedStigmaProps> = ({
  stigma,
  selectedClass,
  characterLvl,
  updateSelectedStigmaLvl,
  deleteStigma,
}) => {
  const [stigmaLvl, setStigmaLvl] = useState<number>(
    stigma.maxAvailableStigmaLvl!
  );

  useEffect(() => {
    updateSelectedStigmaLvl(stigma.stigma.id, stigmaLvl);
  }, [stigmaLvl]);

  const tooltipEl = useRef<HTMLDivElement>(null);

  const [availableSpaceOnRight, setAvailableSpaceOnRight] = useState<number>(0);
  const [availableSpaceOnBottom, setAvailableSpaceOnBottom] =
    useState<number>(0);

  const handleResize = () => {
    if (tooltipEl.current) {
      const rect = tooltipEl.current.getBoundingClientRect();

      const stigmaOffsetWidth = tooltipEl.current.offsetWidth;
      const availableSpaceOnRight =
        document.body.clientWidth - (rect.left + stigmaOffsetWidth);
      setAvailableSpaceOnRight(availableSpaceOnRight);

      const bottom = rect.bottom + document.body.scrollTop;
      const availableSpaceOnBottom = document.body.clientHeight - bottom;
      setAvailableSpaceOnBottom(availableSpaceOnBottom);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    deleteStigma(stigma.stigma.id);
  };

  return (
    <div className={styles.selectedStigma} ref={tooltipEl}>
      <button className={styles.deleteButton} onClick={handleClick}>
        <svg
          className={styles.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F4442E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className={styles.tooltip}>
        <Image
          src={`images/${selectedClass}/${stigma.stigma[stigmaLvl].icon}.png`}
          alt={stigma.stigma[stigmaLvl].name}
          width={40}
          height={40}
        />
        <StigmaDescription
          stigma={stigma}
          stigmaLvl={stigmaLvl}
          availableSpaceOnRight={availableSpaceOnRight}
          availableSpaceOnBottom={availableSpaceOnBottom}
        />
        <div
          style={
            availableSpaceOnRight >= 285
              ? { left: "calc(110% + 28rem + .5rem)" }
              : { right: "calc(110% + 28rem + 1rem)" }
          }
          className={styles.lvls}
        >
          {stigma.stigma.lvls
            .filter((lvl) => lvl <= characterLvl)
            .map((lvl, index) => (
              <span
                className={cn(styles.lvl, {
                  [styles.selectedLvl]: stigmaLvl === lvl,
                })}
                onClick={() => setStigmaLvl(lvl)}
                key={index}
              >
                {lvl}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};
