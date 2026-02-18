import defaultAvatar from "@/assets/defaultAvatar.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const UserAvatar = ({ src, alt, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      <AvatarImage src={src || defaultAvatar.src} alt={alt || "Avatar"} />
      <AvatarFallback>{alt}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
