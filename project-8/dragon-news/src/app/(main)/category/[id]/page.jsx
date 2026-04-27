import LeftSidebar from "@/components/allcategoryNews/news/LeftSidebar";
import NewsCart from "@/components/allcategoryNews/news/NewsCart";
import RightSidebar from "@/components/allcategoryNews/news/RightSidebar";
import { getCategories, getNewsByCategory } from "@/lib/dataFetch";



const NewsCategoryPage = async ({ params }) => {
  const { id } = await params;

  const categories = await getCategories();

  const news = await getNewsByCategory(id);


  return (
    <div className=" grid grid-cols-12 gap-4 container mx-auto my-[80px]">
      <div className=" col-span-3 ">
        <LeftSidebar categories={categories} activeId={id} />
      </div>

      <div className=" col-span-6">
        News By Category
        <div className=" space-y-4 mt-5">
          {news.length > 0 ? news.map((n) => {
            return (
              <NewsCart news={n} key={n._id}>
                {n.title}
              </NewsCart>
            );
          }) : <h2 className=" font-bold text-center text-4xl my-7">No news Found!</h2>}
        </div>
      </div>

      <div className=" col-span-3 ">
        <RightSidebar />
      </div>
    </div>
  );
};

export default NewsCategoryPage;
