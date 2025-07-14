import { ImageProps } from "next/image";

type IconProps = {
  iconPath: string;
} & Omit<ImageProps, "src" | "alt">;

const Icon = ({ iconPath, ...rest }: IconProps) => {
  return <img src={iconPath} alt="icon" {...rest} />;
};

export default Icon;
