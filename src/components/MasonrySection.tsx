"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MasonrySectionProps } from "@/app/api/post/route";

export default function MasonrySection() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<MasonrySectionProps["data"]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 7;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/post?page=${currentPage}&page_size=${pageSize}`,
          { cache: "no-store" }
        );
        const result = await response.json();
        setData(result.data);
        setTotalPages(result.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const featuredPosts = data.filter((item) => item.feature);
  const regularPosts = data.filter((item) => !item.feature);

  useEffect(() => {
    const $ = window.jQuery;
    if ($ && $.fn.flexslider) {
      $("#featured-post-slider").flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: true,
        slideshow: true,
      });
      $(".post-slider").flexslider({
        animation: "slide",
        controlNav: true,
        directionNav: false,
        slideshow: true,
        start: function (slider: any) {
          if (typeof slider.container === "object") {
            slider.container.on("click", function (e: any) {
              if (!slider.animating) {
                slider.flexAnimate(slider.getTarget("next"));
              }
            });
          }

          $(".bricks-wrapper").masonry("layout");
        },
      });
    }

    if ($ && $.fn.mediaelementplayer) {
      $("audio").mediaelementplayer({
        features: ["playpause", "progress", "tracks", "volume"],
      });
    }
  }, [data, currentPage]);

  return (
    <section id="bricks">
      <div className="row masonry">
        <div className="bricks-wrapper">
          <div className="grid-sizer"></div>

          {/* Featured Posts Slider - Only on the first page */}
          {currentPage === 1 && featuredPosts.length > 0 && (
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
          )}

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
                        preload="auto"
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

      {/* Pagination */}
      <div className="row">
        <nav className="pagination">
          {currentPage > 1 ? (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="page-numbers prev"
            >
              Prev
            </Link>
          ) : (
            <span className="page-numbers prev inactive">Prev</span>
          )}

          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/?page=${i + 1}`}
              className={`page-numbers ${
                currentPage === i + 1 ? "current" : ""
              }`}
            >
              {i + 1}
            </Link>
          ))}

          {currentPage < totalPages ? (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="page-numbers next"
            >
              Next
            </Link>
          ) : (
            <span className="page-numbers next inactive">Next</span>
          )}
        </nav>
      </div>
    </section>
  );
}
