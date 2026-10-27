function Articles() {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
      name: "Introduction to React",
      description: "Learn the basics of building websites with React.",
      rating: "5",
      author: "Arjun"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      name: "Getting Started with Web Development",
      description: "Learn the basic concepts of modern web development.",
      rating: "5",
      author: "John"
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
      name: "Understanding JavaScript",
      description: "Explore JavaScript concepts for beginners.",
      rating: "4.5",
      author: "Sarah"
    }
  ];

  return (
    <section id="articles" className="section">
      <h2>Featured Articles</h2>

      <div className="items">
        {articles.map((article) => (
          <div className="item" key={article.name}>
            <img src={article.image} alt="Article" />

            <h3>{article.name}</h3>

            <p>{article.description}</p>

            <div className="rating">
              ⭐ {article.rating} &nbsp; {article.author}
            </div>
          </div>
        ))}
      </div>

      <button className="see-button">
        See all articles
      </button>
    </section>
  );
}

export default Articles;