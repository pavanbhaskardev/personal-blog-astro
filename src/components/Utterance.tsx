import { useRef, useEffect } from "react";

const Utterance = ({ pathname }: { pathname: string }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.getElementById("utterances-script");

    if (!existingScript) {
      const parent = parentRef.current;

      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      script.setAttribute("repo", "pavanbhaskardev/personal-blog-astro"); // Replace with your repo
      script.setAttribute("issue-term", pathname);
      script.setAttribute("theme", "github-light");
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;
      script.id = "utterances-script"; // Add an ID to identify the script

      if (parent) {
        parent.appendChild(script);
      }
    }
  }, [parentRef, pathname]);

  return <div ref={parentRef} className="mt-20" />;
};

export default Utterance;
