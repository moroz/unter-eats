import { Category } from "@interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styles from "./CategoryNavigation.module.sass";
import clsx from "clsx";

interface Props {
  categories: Category[];
  open?: boolean;
  setOpen: (value: boolean) => void;
  className?: string;
}

const CategoryNavigation: React.FC<Props> = ({
  categories,
  open,
  setOpen,
  className
}) => {
  const { asPath, query } = useRouter();

  const onClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <nav className={clsx(styles.root, open && styles.open, className)}>
      {categories.map((cat, i) => {
        const url = i ? `/menu/${cat.slug}` : "/menu";
        const isActive = asPath === url || cat.slug === query.ref;
        return (
          <Link
            onClick={isActive ? onClick : undefined}
            key={cat.id}
            href={url}
            className={clsx(styles.link, isActive && styles.active)}
          >
            {cat.namePl}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavigation;
