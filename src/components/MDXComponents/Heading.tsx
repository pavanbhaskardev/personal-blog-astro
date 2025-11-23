import React from "react";

function generateId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const Heading = ({
  children,
  as = "h3",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
}) => {
  let textContent = "";
  const Element = as;

  // If children is a React element, extract the text from its props
  if (React.isValidElement(children)) {
    // Check if props has value, which is likely the string you need
    if (children.props?.value) {
      textContent = children.props.value.toString();
    }
  }

  const id = generateId(textContent);

  return (
    <Element id={id} className="group hover:!text-text/80">
      <a href={`#${id}`} className="not-prose flex items-center gap-2">
        {children}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="invisible size-6 group-hover:visible"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
          ></path>
        </svg>
      </a>
    </Element>
  );
};

export default Heading;
