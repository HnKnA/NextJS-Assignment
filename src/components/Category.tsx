"use client";

import Link from "next/link";
import { useEffect } from "react";
import { MasonrySectionProps } from "@/app/api/post/route";

export default function Category({
  data,
  currentPage,
  totalPages,
}: MasonrySectionProps) {
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
    <>
      {/* Page header */}
      <section id="page-header">
        <div className="row current-cat">
          <div className="col-full">
            <h1>Category: Photography</h1>
          </div>
        </div>
      </section>

      <section id="bricks" className="with-top-sep">
        <div className="row masonry">
          <div className="bricks-wrapper">
            <div className="grid-sizer"></div>

            {/* Regular Posts */}
            {data.map((item) => {
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

        {/* Pagination */}
        <div className="row">
          <nav className="pagination">
            {currentPage > 1 ? (
              <Link
                href={`/category?page=${currentPage - 1}`}
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
                href={`/category?page=${i + 1}`}
                className={`page-numbers ${
                  currentPage === i + 1 ? "current" : ""
                }`}
              >
                {i + 1}
              </Link>
            ))}

            {currentPage < totalPages ? (
              <Link
                href={`/category?page=${currentPage + 1}`}
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
    </>
  );
}
