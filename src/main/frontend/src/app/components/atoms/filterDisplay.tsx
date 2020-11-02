import Chip, { ChipProps } from '@material-ui/core/Chip';
import * as React from 'react';

type Props2 = Pick<
  ChipProps,
  'className' | 'size' | 'icon' | 'label' | 'color' | 'variant' | 'onDelete'
>;

/**
 * This function returns the icon of the filter.
 */
export function FilterDisplay(props: Props2) {
  const { className, size, icon, label, color, variant, onDelete } = props;
  return (
    <Chip
      size={size}
      color={color}
      icon={icon}
      label={label}
      onDelete={onDelete}
      className={className}
      variant={variant}
    />
  );
}
