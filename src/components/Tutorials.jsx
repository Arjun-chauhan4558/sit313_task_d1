function Tutorials() {
  const tutorials = [
    {
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500",
      name: "React Basics",
      description: "Learn how to create your first React application.",
      rating: "5",
      author: "Arjun"
    },
    {
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500",
      name: "JavaScript Tutorial",
      description: "Learn important JavaScript programming concepts.",
      rating: "5",
      author: "Alex"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500",
      name: "Responsive Web Design",
      description: "Learn how to make websites work on different screens.",
      rating: "4.9",
      author: "Sam"
    }
  ];

  return (
    <section id="tutorials" className="section">
      <h2>Featured Tutorials</h2>

      <div className="items">
        {tutorials.map((tutorial) => (
          <div className="item" key={tutorial.name}>
            <img src={tutorial.image} alt="Tutorial" />

            <h3>{tutorial.name}</h3>

            <p>{tutorial.description}</p>

            <div className="rating">
              ⭐ {tutorial.rating} &nbsp; {tutorial.author}
            </div>
          </div>
        ))}
      </div>

      <button className="see-button">
        See all tutorials
      </button>
    </section>
  );
}

export default Tutorials;