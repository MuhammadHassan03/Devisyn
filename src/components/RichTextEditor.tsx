import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { 
  FaBold, 
  FaItalic, 
  FaUnderline, 
  FaStrikethrough, 
  FaListOl, 
  FaListUl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaImage,
  FaLink,
  FaUndo,
  FaRedo,
  FaHeading,
  FaQuoteLeft,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useState, useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const [selectedImage, setSelectedImage] = useState<{ src: string; element: HTMLElement } | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          editor.chain().focus().setImage({ 
            src: data.url,
            alt: file.name,
            title: file.name,
            class: 'max-w-full h-auto rounded-lg cursor-pointer'
          }).run();
        } else {
          toast.error('Failed to upload image');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    };

    input.click();
  };

  const handleImageClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'IMG') {
      setSelectedImage({
        src: target.getAttribute('src') || '',
        element: target
      });
    }
  };

  const handleCropComplete = (crop: Crop) => {
    if (!imageRef.current || !selectedImage) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width!;
    canvas.height = crop.height!;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(
        imageRef.current,
        crop.x! * scaleX,
        crop.y! * scaleY,
        crop.width! * scaleX,
        crop.height! * scaleY,
        0,
        0,
        crop.width!,
        crop.height!
      );

      canvas.toBlob((blob) => {
        if (!blob) return;
        const formData = new FormData();
        formData.append('file', blob, 'cropped-image.png');

        fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            selectedImage.element.setAttribute('src', data.url);
            setSelectedImage(null);
          })
          .catch((error) => {
            console.error('Error uploading cropped image:', error);
            toast.error('Failed to upload cropped image');
          });
      }, 'image/png');
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 p-2 bg-[#1A1A1A] border-b border-white/10">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('heading', { level: 1 }) ? 'bg-white/10' : ''}`}
        >
          <FaHeading size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('bold') ? 'bg-white/10' : ''}`}
        >
          <FaBold size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('italic') ? 'bg-white/10' : ''}`}
        >
          <FaItalic size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('underline') ? 'bg-white/10' : ''}`}
        >
          <FaUnderline size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('strike') ? 'bg-white/10' : ''}`}
        >
          <FaStrikethrough size={20} />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('bulletList') ? 'bg-white/10' : ''}`}
        >
          <FaListUl size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('orderedList') ? 'bg-white/10' : ''}`}
        >
          <FaListOl size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive('blockquote') ? 'bg-white/10' : ''}`}
        >
          <FaQuoteLeft size={20} />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive({ textAlign: 'left' }) ? 'bg-white/10' : ''}`}
        >
          <FaAlignLeft size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive({ textAlign: 'center' }) ? 'bg-white/10' : ''}`}
        >
          <FaAlignCenter size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded hover:bg-white/5 ${editor.isActive({ textAlign: 'right' }) ? 'bg-white/10' : ''}`}
        >
          <FaAlignRight size={20} />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button
          onClick={addImage}
          className="p-2 rounded hover:bg-white/5"
        >
          <FaImage size={20} />
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className="p-2 rounded hover:bg-white/5"
        >
          <FaLink size={20} />
        </button>
        <div className="w-px h-6 bg-white/10 mx-2" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-white/5"
        >
          <FaUndo size={20} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-white/5"
        >
          <FaRedo size={20} />
        </button>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-2xl w-full">
            <ReactCrop
              crop={crop}
              onChange={(c: Crop) => setCrop(c)}
              onComplete={handleCropComplete}
            >
              <img
                ref={imageRef}
                src={selectedImage.src}
                alt="Crop"
                className="max-w-full h-auto"
              />
            </ReactCrop>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCropComplete(crop)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg cursor-pointer',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-white/10 rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  );
} 