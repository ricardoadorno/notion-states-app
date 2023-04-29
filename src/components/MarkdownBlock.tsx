import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";

export default function MarkdownBlock() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      DraggableItem,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],

    content: `<div>
    <h1>Hello World!</h1>
    <h3>Let's write some nice <span style='color: red'>text</span>!</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur placeat eius itaque minus quia error eaque dicta! Hic, optio dignissimos!</p>
    </div>
    <p>This is a boring paragraph.</p>
    <div data-type="draggable-item">
      <p>Followed by a fancy draggable item.</p>
    </div>
    <div data-type="draggable-item">
      <p>And another draggable item.</p>      
    </div>
    `,
  });

  const [showMenuDisplay, setShowMenuDisplay] = useState(false);

  return (
    <div className="text-editor__container">
      <h2 className="title">Text Editor</h2>

      <div>
        {editor && <BubbleMenuDisplay editor={editor} />}
        {editor && showMenuDisplay && (
          <MenuDisplay
            editor={editor}
            setShowMenuDisplay={setShowMenuDisplay}
          />
        )}
        <EditorContent
          editor={editor}
          onKeyDown={(e) => {
            if (e.key === "/") {
              e.preventDefault();
              setShowMenuDisplay(true);
            }
          }}
        />
      </div>
    </div>
  );
}

function MenuDisplay({ editor, setShowMenuDisplay }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="floating-menu">
      <div className="bubble-menu__node-list">
        <div
          onClick={() => {
            editor.chain().focus().setParagraph().run();
            setShowMenuDisplay(false);
          }}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          text
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          bullet list
        </div>
        <div
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          ordered list
        </div>
        <div
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          blockquote
        </div>
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          h1
        </div>
        <div
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          h2
        </div>
        <div onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </div>
      </div>
    </div>
  );
}

function BubbleMenuDisplay({ editor }) {
  if (!editor) {
    return null;
  }

  const [showNodesMenu, setShowNodesMenu] = useState(false);

  return (
    <BubbleMenu
      className="bubble-menu"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <div
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`bubble-menu__button ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
      >
        Bold
      </div>
      <div
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`bubble-menu__button ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
      >
        Italic
      </div>
      <div
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`bubble-menu__button ${
          editor.isActive("underline") ? "is-active" : ""
        }`}
      >
        Underline
      </div>
      <div
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`bubble-menu__button ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
      >
        Strike
      </div>
      <div
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#5b21b6" }).run()
        }
        className={`bubble-menu__button ${
          editor.isActive("highlight") ? "is-active" : ""
        }`}
      >
        Highlight
      </div>

      <select
        onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
        className="bubble-menu__select"
      >
        <option value="white">White</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>

      {/* NODES */}
      <div
        onClick={() => setShowNodesMenu(!showNodesMenu)}
        className="bubble-menu__button"
      >
        Nodes
        {showNodesMenu && (
          <div className="bubble-menu__node-list">
            <div
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={editor.isActive("paragraph") ? "is-active" : ""}
            >
              text
            </div>
            <div
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              bullet list
            </div>
            <div
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              ordered list
            </div>
            <div
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              blockquote
            </div>
            <div
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              h1
            </div>
            <div
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              h2
            </div>
          </div>
        )}
      </div>
    </BubbleMenu>
  );
}

import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

const DraggableItem = Node.create({
  name: "draggableItem",

  group: "block",

  content: "block+",

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-item"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-item" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DragHandler);
  },
});

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

function DragHandler(props) {
  return (
    <NodeViewWrapper class="draggable-item">
      <div
        className="drag-handle"
        contenteditable="false"
        draggable="true"
        data-drag-handle
        {...props}
      />

      <NodeViewContent class="content" />
    </NodeViewWrapper>
  );
}
