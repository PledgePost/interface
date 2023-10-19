/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4D5CdhA
 */
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Textarea } from "./ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "./ui/badge";

export default function RichEditor({
  value,
  setValue,
  title,
  setTitle,
  handleSubmit,
}: any) {
  return (
    <div className="w-full mx-4 md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden md:px-16 md:py-12">
      <div className="items-center p-4">
        <input
          value={title}
          type="text"
          placeholder="Title here..."
          className="w-full font-bold text-4xl border-none outline-none bg-transparent text-[#1a202c]"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {/* <ReactQuill
          className="w-full h-full text-gray-600 dark:text-gray-200 "
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Write something awesome..."
        /> */}
        <Tabs defaultValue="edit" className="w-full">
          <div className="flex flex-row justify-center">
            <TabsList>
              <TabsTrigger value="edit">Edit Draft</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="edit">
            <Textarea
              className="w-full md:h-[500px] text-gray-600 dark:text-gray-200 "
              placeholder="# Write something awesome..."
              value={value}
              onChange={(e) => setValue(e)}
            />
          </TabsContent>
          <TabsContent value="preview">
            <ReactMarkdown
              className="markdown md:h-[500px] overflow-auto"
              remarkPlugins={[remarkGfm]}
              components={{ pre: Pre }}
            >
              {value}
            </ReactMarkdown>
          </TabsContent>
        </Tabs>
        <div className="flex justify-between p-4">
          <Button className="bg-gray-200 hover:bg-gray-400 text-black">
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
export const Pre = ({ children, ...props }: any) => {
  if (!children || typeof children !== "object") {
    return <code {...props}>{children}</code>;
  }
  const childType = "type" in children ? children.type : "";
  if (childType !== "code") {
    return <code {...props}>{children}</code>;
  }

  const childProps = "props" in children ? children.props : {};
  const { className, children: code } = childProps;
  const classList = className ? className.split(":") : [];
  const language = classList[0]?.replace("language-", "");
  const fileName = classList[1];
  return (
    <>
      {fileName && (
        <Badge variant="secondary" className="rounded-md p-2 ">
          <span>{fileName}</span>
        </Badge>
      )}
      <SyntaxHighlighter language={language} style={docco}>
        {String(code).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </>
  );
};
