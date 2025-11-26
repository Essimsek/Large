// i don't use it anymore. TipTap is used in components/PortableEditor.tsx instead.

import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "next-sanity";
import { urlForImage } from "@/sanity/lib/image";
import { CodeBlock } from '@/components/CodeBlock';

export const components: PortableTextComponents = {
  types: {
    // image
    image: ({ value }) =>
      value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto my-8"
          src={urlForImage(value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={value.alt || ""}
          width={600}
          height={400}
        />
      ) : null,

  codeBlock: ({ value }) => <CodeBlock value={value} />,
    },

    block: {
    // normal text
    normal: ({ children }) => <p className="my-4">{children}</p>,

    h1: ({ children }) => <h1 className="text-4xl font-bold my-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-5">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-4">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-semibold my-3">{children}</h4>,
  },

  list: {
    // ul
    bullet: ({ children }) => <ul className="list-disc list-inside ml-6 my-4">{children}</ul>,
  },

  marks: {
    // Strong decorator
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,

    // Emphasis decorator
    em: ({ children }) => <em className="italic">{children}</em>,

    // Link annotation
    link: ({ value, children }) => {
      const href = value?.href || "";
      return (
        <Link href={href} target="_blank" rel="" className="text-blue-600 hover:underline">
          {children}
        </Link>
      );
    },
    // inline code
    code: ({ children }) => (
      <code className="rounded bg-gray-200 px-1.5 py-0.5 text-[13px] font-mono text-gray-800">
        {children}
      </code>
    ),
  },
};
