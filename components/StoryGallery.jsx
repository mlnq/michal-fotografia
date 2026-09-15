"use client";

import "react-photo-album/rows.css";
import { RowsPhotoAlbum } from "react-photo-album";

export default function StoryGallery({ bloki }) {
  return (
    <div className="historia-galeria">
      {bloki.map((blok, i) =>
        blok.typ === "zdjecia" ? (
          <RowsPhotoAlbum
            key={i}
            photos={blok.zdjecia}
            spacing={8}
            padding={0}
            targetRowHeight={420}
          />
        ) : (
          <p key={i} className="historia-podpis">
            {blok.tekst}
          </p>
        )
      )}
    </div>
  );
}
