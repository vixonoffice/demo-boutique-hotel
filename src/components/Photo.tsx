import Image, { type ImageProps } from "next/image";
import { photos, type PhotoKey } from "@/lib/media";

type Props = Omit<ImageProps, "src" | "alt" | "quality"> & { name: PhotoKey; alt: string };

/** next/image over the statically imported, content-hashed photos (immutable cache, avif/webp). */
export default function Photo({ name, alt, ...rest }: Props) {
  return <Image src={photos[name]} alt={alt} quality={70} {...rest} />;
}
