import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiBookmark, CiShare1, CiStar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

const NewsCart = ({ news }) => {
  return (
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
                <CiShare1 className=" text-2xl"/>
                <CiBookmark className=" text-2xl"/>
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
        <p className=" line-clamp-3">{news.details}</p>


        <div className=" flex items-center justify-between">
            <div className=" flex items-center gap-2">
                <h2 className=" flex items-center gap-2"><IoIosStar className=" text-lg text-yellow-500"/>{news.rating.number}</h2>
                <h2 className=" flex items-center gap-2"><FaEye className=" text-lg"/>{news.total_view}</h2>
            </div>

           <Link href={`/news/${news._id}`}><button className=" btn">See details</button></Link>
        </div>
        </div>
      </div>

  );
};

export default NewsCart;
