import React, { createContext, useContext, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from './Button';

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue>({
  open: false,
  setOpen: () => {},
});

export function Sheet({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

export function SheetTrigger({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const { setOpen } = useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => setOpen(true),
    });
  }
  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

export function SheetClose({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: React.ReactNode;
}) {
  const { setOpen } = useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        child.props.onClick?.(e);
        setOpen(false);
      },
    });
  }
  return (
    <button type="button" onClick={() => setOpen(false)}>
      {children}
    </button>
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useContext(SheetContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0"
        onClick={() => setOpen(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'fixed inset-y-0 right-0 z-50 h-full w-3/4 gap-4 border-l bg-background p-6 shadow-lg transition ease-in-out sm:max-w-sm',
          className
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn('text-lg font-semibold text-foreground', className)} {...props} />;
}
