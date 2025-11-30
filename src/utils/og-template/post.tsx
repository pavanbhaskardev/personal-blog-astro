import satori from "satori";
import type { CollectionEntry } from "astro:content";
import path from "path";
import fs from "fs";

export default async (post: CollectionEntry<"blog">) => {
  // Read the fonts from the local filesystem instead of fetching
  const penpointFontPath = path.resolve("./public/fonts/Penpoint.otf");

  const penpointFontBuffer = fs.readFileSync(penpointFontPath);

  const svg = await satori(
    <div
      style={{
        background: "#f5f5f4",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          border: "4px solid #0c0a09",
          background: "#d9770680",
          opacity: "0.9",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2.5rem",
          width: "88%",
          height: "80%",
        }}
      />

      <div
        style={{
          border: "4px solid #0c0a09",
          background: "#f5f5f4",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          width: "88%",
          height: "80%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "20px",
            width: "90%",
            height: "90%",
          }}
        >
          <p
            style={{
              fontSize: 84,
              fontWeight: "bold",
              maxHeight: "84%",
              overflow: "hidden",
              fontFamily: "Virgil",
            }}
          >
            {post.data.title}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "Virgil",
              width: "100%",
              marginBottom: "8px",
              fontSize: 28,
            }}
          >
            <span>
              by{" "}
              <span
                style={{
                  color: "transparent",
                }}
              >
                "
              </span>
              <span style={{ overflow: "hidden", fontWeight: "bold" }}>
                Pavan Bhaskar
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: [
        {
          name: "Penpoint",
          data: penpointFontBuffer,
          style: "normal",
        },
      ],
    }
  );

  return svg;
};
