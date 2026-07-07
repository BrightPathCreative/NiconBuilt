import { Fragment, type ReactNode } from "react";

/**
 * Renders a limited set of inline Markdown — **bold**, *italic*, and
 * [text](url) links — as React nodes. Blog copy is trusted, pre-written
 * content (not user input), so no HTML escaping/sanitization is needed here.
 */
export function renderInline(text: string): ReactNode {
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const [whole, bold, italic, linkText, linkHref] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else if (italic !== undefined) {
      nodes.push(<em key={key++}>{italic}</em>);
    } else if (linkText !== undefined && linkHref !== undefined) {
      const isExternal = /^https?:\/\//.test(linkHref);
      nodes.push(
        <a
          key={key++}
          href={linkHref}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {linkText}
        </a>
      );
    } else {
      nodes.push(whole);
    }

    lastIndex = match.index + whole.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <Fragment>{nodes}</Fragment>;
}
