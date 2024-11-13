export type PostDataItem = {
  no: number;
  feature: boolean;
  image: string[];
  alt: string;
  date: string;
  audio: string;
  author: string;
  type: string;
  title: string;
  category: string;
  content: string;
};

export type MasonrySectionProps = {
  data: PostDataItem[];
};

export default function MasonrySection({ data }: MasonrySectionProps) {
  const featuredPosts = data.filter((item) => item.feature);
  const regularPosts = data.filter((item) => !item.feature);

  return (
    <section id="bricks">
      <div className="row masonry">
        <div className="bricks-wrapper">
          <div className="grid-sizer"></div>

          {/* Featured Posts Slider */}
          <div className="brick entry featured-grid animate-this">
            <div className="entry-content">
              <div id="featured-post-slider" className="flexslider">
                <ul className="slides">
                  {featuredPosts.map((item) => (
                    <li key={item.no}>
                      <div className="featured-post-slide">
                        <div
                          className="post-background"
                          style={{
                            backgroundImage: `url('${item.image[0]}')`,
                          }}
                        ></div>
                        <div className="overlay"></div>
                        <div className="post-content">
                          <ul className="entry-meta">
                            <li>{item.date}</li>
                            <li>
                              <a href="#">{item.author}</a>
                            </li>
                          </ul>
                          <h1 className="slide-title">
                            <a href={item.type} title="">
                              {item.title}
                            </a>
                          </h1>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          {regularPosts.map((item) => {
            // Standard Format Post
            if (item.type === "/single-standard") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-standard animate-this"
                >
                  <div className="entry-thumb">
                    <a href={item.type} className="thumb-link">
                      <img src={item.image[0]} alt={item.alt} />
                    </a>
                  </div>
                  <div className="entry-text">
                    <div className="entry-header">
                      <div className="entry-meta">
                        <span className="cat-links">{item.category}</span>
                      </div>
                      <h1 className="entry-title">
                        <a href={item.type}>{item.title}</a>
                      </h1>
                    </div>
                    <div className="entry-excerpt">{item.content}</div>
                  </div>
                </article>
              );
            }

            // Audio Format Post
            if (item.type === "/single-audio") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-audio animate-this"
                >
                  <div className="entry-thumb">
                    <a href={item.type} className="thumb-link">
                      <img src={item.image[0]} alt={item.alt} />
                    </a>
                    <div className="audio-wrap">
                      <audio
                        id="player"
                        src={item.audio}
                        style={{ width: "100%", height: "42px" }}
                        controls
                      ></audio>
                    </div>
                  </div>
                  <div className="entry-text">
                    <div className="entry-header">
                      <div className="entry-meta">
                        <span className="cat-links">{item.category}</span>
                      </div>
                      <h1 className="entry-title">
                        <a href={item.type}>{item.title}</a>
                      </h1>
                    </div>
                    <div className="entry-excerpt">{item.content}</div>
                  </div>
                </article>
              );
            }

            // Quote Post
            if (item.type === "quote") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-quote animate-this"
                >
                  <div className="entry-thumb">
                    <blockquote>
                      <p>{item.content}</p>
                      <cite>{item.author}</cite>
                    </blockquote>
                  </div>
                </article>
              );
            }

            // Gallery Format Post
            if (item.type === "/single-gallery") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-gallery group animate-this"
                >
                  <div className="entry-thumb">
                    <div className="post-slider flexslider">
                      <ul className="slides">
                        {item.image.map((img, idx) => (
                          <li key={idx}>
                            <img src={img} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="entry-text">
                    <div className="entry-header">
                      <div className="entry-meta">
                        <span className="cat-links">{item.category}</span>
                      </div>
                      <h1 className="entry-title">
                        <a href={item.type}>{item.title}</a>
                      </h1>
                    </div>
                    <div className="entry-excerpt">{item.content}</div>
                  </div>
                </article>
              );
            }

            // Link Post
            if (item.type === "link") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-link animate-this"
                >
                  <div className="entry-thumb">
                    <div className="link-wrap">
                      <p>{item.content}</p>
                      <cite>
                        <a target="_blank" href={item.alt}>
                          {item.alt}
                        </a>
                      </cite>
                    </div>
                  </div>
                </article>
              );
            }

            // Video Format Post
            if (item.type === "/single-video") {
              return (
                <article
                  key={item.no}
                  className="brick entry format-video animate-this"
                >
                  <div className="entry-thumb video-image">
                    <a href={item.audio} data-lity>
                      <img src={item.image[0]} alt={item.alt} />
                    </a>
                  </div>
                  <div className="entry-text">
                    <div className="entry-header">
                      <div className="entry-meta">
                        <span className="cat-links">{item.category}</span>
                      </div>
                      <h1 className="entry-title">
                        <a href={item.type}>{item.title}</a>
                      </h1>
                    </div>
                    <div className="entry-excerpt">{item.content}</div>
                  </div>
                </article>
              );
            }

            return null;
          })}
        </div>
      </div>

      <div className="row">
        <nav className="pagination">
          <span className="page-numbers prev inactive">Prev</span>
          <span className="page-numbers current">1</span>
          <a href="#" className="page-numbers">
            2
          </a>
          <a href="#" className="page-numbers">
            3
          </a>
          <a href="#" className="page-numbers">
            4
          </a>
          <a href="#" className="page-numbers">
            5
          </a>
          <a href="#" className="page-numbers">
            6
          </a>
          <a href="#" className="page-numbers">
            7
          </a>
          <a href="#" className="page-numbers">
            8
          </a>
          <a href="#" className="page-numbers">
            9
          </a>
          <a href="#" className="page-numbers next">
            Next
          </a>
        </nav>
      </div>
    </section>
  );
}
