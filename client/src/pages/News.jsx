import React from "react";

const News = () => {
  const hardcodedNews = [
    {
      title: "Climate Change and Its Impact on Global Agriculture",
      description:
        "As temperatures rise and weather patterns shift, global agriculture is facing unprecedented challenges.",
      url: "#",
      urlToImage:
        "https://khetigaadi.com/blog/wp-content/uploads/2018/07/Effect-of-Climate-Change-on-Agriculture.jpg",
    },
    {
      title: "New Discovery in Renewable Energy",
      description:
        "Scientists have developed a more efficient way to harness solar energy, pushing renewable energy forward.",
      url: "#",
      urlToImage:
        "https://cisp.cachefly.net/assets/articles/images/resized/0001085446_resized_windturbinewithsolarpanelsandsunset1022.jpg"
    },
    {
      title: "India's Push for Sustainable Development",
      description:
        "India is making strides toward a more sustainable future by investing in green technologies.",
      url: "#",
      urlToImage:
        "https://reportyak.com/wp-content/uploads/2024/05/Sustainable-Development-Index-Report-Yak-Blog.webp",
    },
    {
      title: "Oceans Are Heating Up at an Alarming Rate",
      description:
        "Recent studies show that the world's oceans are absorbing heat faster than expected, leading to ecological changes.",
      url: "#",
      urlToImage:
        "https://www.unesco.org/sites/default/files/styles/best_image/article/2024-07/shutterstock_2285640349%20%281%29.jpg?itok=PA7PoR7Z",
    },
    {
      title: "Innovative Solutions to Combat Air Pollution",
      description:
        "New technologies are emerging to help combat the ever-growing issue of air pollution in urban areas.",
      url: "#",
      urlToImage:
        "https://www.manufacturingtodayindia.com/cloud/2023/03/21/Liquid-tree-scaled.jpg",
    },
    {
      title: "The Future of Electric Vehicles in India",
      description:
        "Electric vehicles are becoming more popular in India, and the government is making moves to support their adoption.",
      url: "#",
      urlToImage:
        "https://poonawallafincorp.com/pfca/assets/blog_banner/blog_banner-electric-vehicle-in-india-desktop.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Environment News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardcodedNews.map((article, index) => (
          <div
            key={index}
            className="bg-[#2c2f32] rounded-lg overflow-hidden shadow-md"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt="Article"
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg text-green-300 font-semibold mb-2">
                {article.title}
              </h3>
              <p className="text-sm text-white mb-4">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:underline"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
