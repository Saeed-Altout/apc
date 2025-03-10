import * as React from "react";

interface HeadingProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  children?: React.ReactNode;
}

function Heading({
  className,
  title,
  description,
  children,
  ...props
}: HeadingProps) {
  return (
    <div
      className="flex items-center justify-between gap-4 flex-wrap"
      {...props}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export { Heading };
