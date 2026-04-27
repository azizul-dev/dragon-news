import Link from "next/link";
import React from "react";

const LeftSidebar = ({ categories, activeId }) => {
  return (
    <div>
      <h1 className=" font-bold text-xl rounded-md  mb-4">All categories</h1>
      <ul className=" flex flex-col gap-3">
        {categories.news_category.map((category) => {
          return (
            <li
              className={`${activeId === category.category_id && "bg-purple-500"}   rounded-md font-bold text-center text-md`}
              key={category.category_id}
            >
              <Link href={`/category/${category.category_id}`} className=" block p-2">
                {" "}
                {category.category_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar;
