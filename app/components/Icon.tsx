import Image, { ImageProps } from "next/image";

type IconProps = {
  iconPath: string;
} & Omit<ImageProps, "src" | "alt">;

const Icon = ({ iconPath, ...rest }: IconProps) => {
  return <Image src={iconPath} alt="icon" {...rest} />;
};

export default Icon;
