import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps {
  children: string;
  className?: string;
}

/**
 * 外部由来の Markdown / プレーンテキストを安全にレンダリングする。
 * MDX と違い JSX を評価しないため、任意のテキストでも壊れない。
 * GFM（テーブル・打ち消し線・タスクリスト）に対応。
 */
export function Markdown({ children, className = "" }: MarkdownProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
