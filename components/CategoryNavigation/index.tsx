import { Category } from "@interfaces";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./CategoryNavigation.module.sass";
import clsx from "clsx";
import useHeaderScroll from "@/hooks/useHeaderScroll";

interface Props {
  categories: Category[];
}

const CategoryNavigation: React.FC<Props> = ({ categories }) => {
  const { asPath } = useRouter();
  const opaque = useHeaderScroll();

  return (
    <nav className={clsx(styles.root, opaque && styles.opaque)}>
      {categories.map((cat, i) => {
        const url = i ? `/menu/${cat.slug}` : "/menu";
        return (
          <Link
            key={cat.id}
            href={url}
            className={clsx(styles.link, asPath === url && styles.active)}
          >
            {cat.namePl}
          </Link>
        );
      })}
    </nav>
  );
};

export default CategoryNavigation;
