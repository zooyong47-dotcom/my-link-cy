"use client";

import React from "react";
import { SocialLink } from "@/types/mylink";
import { Button } from "@/components/ui/button";
import {
  Mail,
  BookOpen,
  MessageSquare,
  Globe,
  AtSign,
} from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
  DiscordIcon,
} from "@/components/icons";

interface SocialIconsBarProps {
  socials: SocialLink[];
}

export function SocialIconsBar({ socials }: SocialIconsBarProps) {
  const activeSocials = socials.filter((s) => s.enabled);

  if (activeSocials.length === 0) return null;

  const renderIcon = (platform: SocialLink["platform"]) => {
    switch (platform) {
      case "github":
        return <GithubIcon className="w-5 h-5" />;
      case "youtube":
        return <YoutubeIcon className="w-5 h-5" />;
      case "twitter":
        return <TwitterIcon className="w-5 h-5" />;
      case "instagram":
        return <InstagramIcon className="w-5 h-5" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5" />;
      case "discord":
        return <DiscordIcon className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "blog":
        return <BookOpen className="w-5 h-5" />;
      case "threads":
        return <AtSign className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 my-4 flex-wrap">
      {activeSocials.map((social) => (
        <Button
          key={social.id}
          asChild
          variant="neo"
          size="icon"
          title={social.platform}
          className="rounded-xl w-10 h-10 sm:w-11 sm:h-11 p-0"
        >
          <a
            href={social.url}
            target={social.url.startsWith("http") ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {renderIcon(social.platform)}
          </a>
        </Button>
      ))}
    </div>
  );
}
