import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface ImageUploadProps {
  onImagesSelected: (urls: string[]) => void;
  maxImages?: number;
  existingImages?: string[];
}

export default function ImageUpload({
  onImagesSelected,
  maxImages = 5,
  existingImages = [],
}: ImageUploadProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>(existingImages);
  const [isUploading, setIsUploading] = useState(false);
  const uploadImage = trpc.storage.uploadImage.useMutation();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (selectedImages.length + files.length > maxImages) {
      toast.error(`Máximo de ${maxImages} imagens permitidas`);
      return;
    }

    setIsUploading(true);

    try {
      const newUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Apenas arquivos de imagem são permitidos");
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Arquivo muito grande (máximo 5MB)");
          continue;
        }

        // Read file and upload
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const base64Data = (event.target?.result as string).split(',')[1];
            const result = await uploadImage.mutateAsync({
              filename: file.name,
              base64Data,
              mimeType: file.type,
            });
            newUrls.push(result.url);

            if (newUrls.length === Object.keys(files).length) {
              const updatedImages = [...selectedImages, ...newUrls];
              setSelectedImages(updatedImages);
              onImagesSelected(updatedImages);
              toast.success("Imagens enviadas com sucesso");
            }
          } catch (error) {
            toast.error("Erro ao enviar imagem");
            console.error(error);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      toast.error("Erro ao processar imagens");
      console.error(error);
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updated);
    onImagesSelected(updated);
  };

  return (
    <div>
      <label className="block text-sm font-semibold mb-3">Imagens do Produto</label>

      {/* Upload Area */}
      <div className="mb-4">
        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading || selectedImages.length >= maxImages}
            className="hidden"
          />
          {isUploading ? (
            <Loader2 className="w-8 h-8 mx-auto mb-2 text-gray-400 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          )}
          <p className="text-sm text-gray-600">
            {isUploading ? "Enviando imagens..." : "Clique para selecionar imagens ou arraste aqui"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {selectedImages.length}/{maxImages} imagens
          </p>
        </label>
      </div>

      {/* Image Preview Grid */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {selectedImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Preview ${index + 1}`}
                className="w-full h-24 object-cover rounded border border-gray-200"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mt-3">
        Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB por imagem.
      </p>
    </div>
  );
}
