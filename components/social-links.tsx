import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { Button } from "./ui/button";

export const SocialLinks = () => {
  return (
    <div className="mx-auto max-w-4xl md:pt-8">
      <ul className="flex items-center gap-4">
        <li>
          <Button variant="ghost" size="icon-lg">
            <FaLinkedinIn className="size-6" />
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon-lg">
            <TfiEmail className="size-6" />
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon-lg">
            <FaGithub className="size-6" />
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="icon-lg">
            <SlSocialInstagram className="size-6" />
          </Button>
        </li>
      </ul>
    </div>
  );
};
