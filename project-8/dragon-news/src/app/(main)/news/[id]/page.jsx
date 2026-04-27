import { getNewsDetailsById } from "@/lib/dataFetch";
import { param, title } from "framer-motion/m";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsArrow90DegRight } from "react-icons/bs";
import { CiBookmark, CiShare1 } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

export const generateMetadata = async ({ params }) => {
  const { id } = await params;
  const news = await getNewsDetailsById(id);
  return {
    title: news.title,
    description: news.details,
  };
};

const NewsDetailPage = async ({ params }) => {
  const { id } = await params;
  const news = await getNewsDetailsById(id);
  return (
    <div className=" max-w-4xl mx-auto my-8">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className=" flex justify-between items-center bg-slate-200 p-4">
            <div className=" flex gap-1 items-center">
              <div>
                <Image
                  src={news.author?.img}
                  alt={news.author?.name || "Author image"}
                  width={40}
                  height={40}
                  className=" rounded-full"
                />
              </div>
              <div>
                <h2 className=" font-semibold">{news.author?.name}</h2>
                <p className=" text-xs">{news.author?.published_date}</p>
              </div>
            </div>
            <div className=" flex justify-between items-center gap-2 ">
              <CiShare1 className=" text-2xl" />
              <CiBookmark className=" text-2xl" />
            </div>
          </div>

          <h2 className="card-title">{news.title}</h2>
          <figure>
            <Image
              src={news.image_url}
              alt={news.title || "News image"}
              width={300}
              height={300}
              className=" w-full"
              unoptimized
            />
          </figure>
          <p>{news.details}</p>

          <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-2">
              <h2 className=" flex items-center gap-2">
                <IoIosStar className=" text-lg text-yellow-500" />
                {news.rating.number}
              </h2>
              <h2 className=" flex items-center gap-2">
                <FaEye className=" text-lg" />
                {news.total_view}
              </h2>
            </div>

            <Link href={`/category/${news.category_id}`}>
              <button className=" btn btn-secondary">
                See Other News for This category <BsArrow90DegRight />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
