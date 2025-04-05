import { VariantProps, cva } from 'class-variance-authority';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Text as RNtext } from 'react-native';
import { useLocale } from '~/context/LocaleContext';
import { cn } from '~/utils/helper';

cssInterop(RNtext, { className: 'style' });

const textVariants = cva('text-foreground', {
  variants: {
    placement: {
      en: 'text-left',
      ar: 'text-right',
      'text-center': 'text-center',
      'text-right': 'text-right',
      'text-left': 'text-left',
    },
    variant: {
      largeTitle: 'text-4xl',
      title1: 'text-2xl',
      title2: 'text-[22px] leading-7',
      title3: 'text-xl',
      heading: 'text-[17px] leading-6 font-semibold',
      body: 'text-[17px] leading-6',
      callout: 'text-base',
      subhead: 'text-[15px] leading-6',
      footnote: 'text-[13px] leading-5',
      caption1: 'text-xs',
      caption2: 'text-[11px] leading-4',
    },
    color: {
      primary: 'text-primary',
      black: 'text-black',
      white: 'text-white',
      gray: 'text-gray-500',
      secondary: 'text-secondary-foreground/90',
      tertiary: 'text-muted-foreground/90',
      quarternary: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'callout',
    color: 'black',
  },
});

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  variant,
  color,
  placement,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNtext> & VariantProps<typeof textVariants>) {
  const textClassName = React.useContext(TextClassContext);
  return (
    <RNtext
      allowFontScaling={false}
      className={cn(
        textVariants({ variant, color, placement }),
        textClassName,
        className
        // locale ? (locale === 'ar' ? 'text-right' : 'text-left') : 'text-center'
      )}
      {...props}
    />
  );
}

export { Text, TextClassContext, textVariants };
