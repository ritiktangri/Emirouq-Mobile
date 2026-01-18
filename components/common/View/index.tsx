// View.tsx
import { VariantProps, cva } from 'class-variance-authority';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { View as RNView, ViewProps } from 'react-native';

import { cn } from '~/utils/helper';

cssInterop(RNView, { className: 'style' });

const viewVariants = cva('bg-transparent', {
  variants: {
    direction: {
      en: 'flex-row items-center gap-2',
      ar: 'flex-row-reverse items-center gap-2',
      row: 'flex-row items-center gap-2',
      column: 'flex-col items-center gap-2',
      'row-reverse': 'flex-row-reverse items-center gap-2',
      'column-reverse': 'flex-col-reverse items-center gap-2',
    },
    variant: {
      primary: 'bg-primary-foreground',
      secondary: 'bg-secondary-foreground',
      tertiary: 'bg-muted-foreground',
      card: 'bg-card',
      outline: 'border border-primary',
    },
    color: {
      primary: 'bg-primary',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      accent: 'bg-accent',
      destructive: 'bg-destructive',
      primaryText: 'text-primary',
      secondaryText: 'text-secondary',
      mutedText: 'text-muted',
      accentText: 'text-accent',
      destructiveText: 'text-destructive',
    },
    rounded: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
      '2xl': 'shadow-2xl',
    },
  },
  defaultVariants: {
    variant: undefined,
    color: undefined,
    rounded: 'none',
    shadow: undefined,
  },
});

const View = React.forwardRef<
  RNView,
  ViewProps &
  VariantProps<typeof viewVariants> & {
    direction?: 'en' | 'ar' | 'row' | 'column' | 'row-reverse' | 'column-reverse';
  }
>(({ className, variant, color, rounded, shadow, direction, ...props }, ref) => {
  return (
    <RNView
      ref={ref}
      className={cn(viewVariants({ variant, color, rounded, shadow, direction }), className)}
      {...props}
    />
  );
});
View.displayName = 'View';

export { View, viewVariants };
