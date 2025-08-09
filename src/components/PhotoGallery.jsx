import { useState, useRef } from "preact/hooks";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";


export default function PhotoGallery({ images }) {
  const [index, setIndex] = useState(-1);
  const thumbnailsRef = useRef(null);

  const slides = images.map(({ src, alt, width, height }) => ({
    src,
    alt,
    width,
    height,
  }));

  return (
    <>
      <div ref={thumbnailsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            onClick={() => setIndex(i)}
            style={{ cursor: "pointer", width: "100%", height: "auto", objectFit: "cover" }}
          />
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        animation={{ zoom: 500 }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          thumbnail: ({ slide, rect, render, imageFit }) => (
            <img
              src={slide.src}
              alt={slide.alt}
              style={{
                position: "absolute",
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
                objectFit: imageFit,
              }}
            />
          ),
        }}
      />
    </>
  );
}
