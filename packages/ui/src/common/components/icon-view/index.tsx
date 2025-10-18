"use client";

import { Card } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import Icon from "@workspace/ui/icons/icons";
import { cn, IconName } from "@workspace/ui/lib/utils";
import * as React from "react";
import { motion } from "framer-motion";

type IconGalleryProps = {
  names: IconName[];
};

export default function IconGallery({ names }: IconGalleryProps) {
  const [query, setQuery] = React.useState("");
  const [copied, setCopied] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return names;
    return names.filter((n: any) => n.toLowerCase().includes(q));
  }, [names, query]);

  const handleCopy = async (name: string) => {
    const usage = `<Icon name="${name}" />`;
    try {
      await navigator.clipboard.writeText(usage);
      setCopied(name);
      window.setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = usage;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(name);
      window.setTimeout(() => setCopied((c) => (c === name ? null : c)), 1200);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-pretty text-2xl font-semibold">Icon Library</h1>
        <div className="w-full md:w-80">
          <Input
            placeholder="Search icons by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <p className="mb-4 text-sm text-muted-foreground">
        Add icons to the registry file and they will automatically appear here.
        Click any card to copy the JSX selector.
      </p>

      <section
        aria-label="Icon grid"
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {filtered.map((name: any) => (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log("hover started!")}
            key={name}
            onClick={() => handleCopy(name)}
            className={cn(
              "group relative text-left cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            )}
            title="Click to copy usage"
          >
            <Card
              className={cn(
                "flex h-28 w-full flex-col items-center justify-center gap-2 p-3 transition-colors bg-primary",
                "hover:bg-[var(--light-primary)]"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md text-foreground">
                <Icon name={name} className="h-8 w-8" />
              </div>
              <span className="text-center text-xs font-medium text-foreground/80">
                {name}
              </span>
              <span className="text-[10px] text-muted-foreground">
                Copy selector
              </span>
            </Card>

            {/* Copied badge */}
            <span
              className={cn(
                "pointer-events-none absolute right-2 top-2 rounded-md bg-secondary px-2 py-1 text-[10px] font-medium text-secondary-foreground opacity-0 transition-opacity",
                copied === name && "opacity-100"
              )}
              aria-hidden={copied !== name}
            >
              Copied!
            </span>
          </motion.button>
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="mt-10 text-center text-sm text-muted-foreground">
          No icons match “{query}”.
        </div>
      )}
    </div>
  );
}
