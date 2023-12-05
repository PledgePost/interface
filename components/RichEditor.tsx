/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4D5CdhA
 */
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "react-quill/dist/quill.bubble.css";
import { Textarea } from "./ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Badge } from "./ui/badge";
import Image from "next/image";

// TODO: display image in markdown
export default function RichEditor({
  value,
  setValue,
  title,
  image,
  setTitle,
  handleImage,
  handleSubmit,
}: any) {
  return (
    <div className="w-full mx-4 md:w-3/4 bg-white shadow-lg rounded-lg overflow-hidden md:px-16 md:py-12">
      <div className="items-center p-4 flex flex-col gap-4">
        <div>
          <div
            className="flex items-center justify-center w-full"
            onChange={(e) => handleImage(e)}
          >
            {image ? (
              <Image src={image} alt="cover image" width={800} height={400} />
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
        <>
          <input
            value={title}
            type="text"
            placeholder="Title here..."
            className="w-full font-bold text-4xl border-none outline-none bg-transparent text-[#1a202c]"
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      </div>
      <div>
        <Tabs defaultValue="edit" className="w-full">
          <div className="flex flex-row justify-center">
            <TabsList>
              <TabsTrigger value="edit">Edit Draft</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="edit" className="p-4">
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
